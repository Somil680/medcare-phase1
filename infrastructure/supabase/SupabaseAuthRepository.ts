import { AuthRepository } from "@/domain/repositories/AuthRepository";
import { User } from "@/domain/entities/User";
import { getSupabaseClient } from "@/lib/supabase/client";

/**
 * Supabase authentication repository
 * Handles authentication using Supabase Auth
 */
export class SupabaseAuthRepository implements AuthRepository {
  async login(phoneOrEmail: string, password?: string): Promise<User> {
    const supabase = getSupabaseClient();

    // Try email login first
    if (phoneOrEmail.includes("@")) {
      if (!password) {
        throw new Error("Password is required for email login");
      }

      console.log("🚀 ~ SupabaseAuthRepository ~ login ~ phoneOrEmail:", phoneOrEmail , password)
      const { data, error } = await supabase.auth.signInWithPassword({
        email: phoneOrEmail,
        password: password,
      });
      console.log("🚀 ~ SupabaseAuthRepository ~ login ~ data:", data)

      if (error) {
        throw new Error(error.message || "Login failed");
      }

      if (!data.user) {
        throw new Error("User not found");
      }

      // Get user profile from users table (if it exists)
      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (profileError || !profile) {
        // If profile doesn't exist, try to create it
        const userData = {
          id: data.user.id,
          name: data.user.user_metadata?.name || data.user.email?.split("@")[0] || "User",
          email: data.user.email || "",
          phone: data.user.phone || data.user.user_metadata?.phone || "",
        };

        // Try to create profile (ignore errors if table doesn't exist or RLS blocks it)
        await supabase.from("users").upsert(userData, {
          onConflict: "id",
        });

        return {
          ...userData,
          createdAt: new Date(data.user.created_at),
        };
      }

      return this.mapToUser(profile);
    } else {
      // Phone login (OTP)
      const { data, error } = await supabase.auth.signInWithOtp({
        phone: phoneOrEmail,
      });

      if (error) {
        throw new Error(error.message || "Failed to send OTP");
      }

      // For OTP, we need to wait for verification
      // This is a simplified version - in production, handle OTP verification flow
      throw new Error("OTP verification required. Please check your phone.");
    }
  }

  async logout(): Promise<void> {
    const supabase = getSupabaseClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message || "Logout failed");
    }
  }

  async getCurrentUser(): Promise<User | null> {
    const supabase = getSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    // Get user profile from users table
    const { data: profile, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error || !profile) {
      // If profile doesn't exist, return basic user from auth
      return {
        id: user.id,
        name: user.user_metadata?.name || user.email?.split("@")[0] || "User",
        email: user.email || "",
        phone: user.phone || "",
        createdAt: new Date(user.created_at),
      };
    }

    return this.mapToUser(profile);
  }

  async isAuthenticated(): Promise<boolean> {
    const supabase = getSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user !== null;
  }

  private mapToUser(profile: any): User {
    return {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      avatar: profile.avatar,
      createdAt: new Date(profile.created_at),
    };
  }
}

