import { AuthRepository } from "@/domain/repositories/AuthRepository";
import { User } from "@/domain/entities/User";
import { mockUsers } from "@/mock-data/users";

/**
 * Mock authentication repository
 * Simulates authentication with fake login/logout
 * 
 * Future: Replace with real auth provider (Firebase, Supabase, etc.)
 */
export class MockAuthRepository implements AuthRepository {
  private currentUser: User | null = null;
  private storageKey = "medcare_mock_user";

  constructor() {
    // Restore user from localStorage on init (for page refresh)
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        try {
          this.currentUser = JSON.parse(stored);
        } catch {
          // Ignore parse errors
        }
      }
    }
  }

  async login(phoneOrEmail: string, password?: string): Promise<User> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Find user by phone or email
    const user = mockUsers.find(
      (u) => u.email === phoneOrEmail || u.phone === phoneOrEmail
    );

    if (!user) {
      throw new Error("Invalid credentials");
    }

    this.currentUser = user;

    // Persist to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(this.storageKey, JSON.stringify(user));
    }

    return user;
  }

  async logout(): Promise<void> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    this.currentUser = null;

    // Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.storageKey);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    return this.currentUser;
  }

  async isAuthenticated(): Promise<boolean> {
    return this.currentUser !== null;
  }
}

