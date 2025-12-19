import { TokenRepository } from "@/domain/repositories/TokenRepository";
import { Token } from "@/domain/entities/Token";
import { getSupabaseClient } from "@/lib/supabase/client";

/**
 * Supabase token repository
 * Handles real-time token tracking using Supabase Realtime
 */
export class SupabaseTokenRepository implements TokenRepository {
  private subscriptions: Map<string, any> = new Map();

  private getKey(doctorId: string, clinicId: string): string {
    return `${doctorId}-${clinicId}`;
  }

  async getCurrentToken(doctorId: string, clinicId: string): Promise<Token> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("tokens")
      .select("*")
      .eq("doctor_id", doctorId)
      .eq("clinic_id", clinicId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // Token doesn't exist, create default
        return {
          doctorId,
          clinicId,
          currentToken: 0,
          totalTokens: 0,
          lastUpdated: new Date(),
        };
      }
      throw new Error(error.message || "Failed to load token");
    }

    return {
      doctorId: data.doctor_id,
      clinicId: data.clinic_id,
      currentToken: data.current_token || 0,
      totalTokens: data.total_tokens || 0,
      lastUpdated: new Date(data.last_updated),
    };
  }

  subscribeToTokenUpdates(
    doctorId: string,
    clinicId: string,
    callback: (token: Token) => void
  ): () => void {
    const key = this.getKey(doctorId, clinicId);
    const supabase = getSupabaseClient();

    // Subscribe to real-time updates
    const channel = supabase
      .channel(`tokens:${key}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tokens",
          filter: `doctor_id=eq.${doctorId}`,
        },
        async (payload) => {
          if (payload.new && payload.new.clinic_id === clinicId) {
            const token: Token = {
              doctorId: payload.new.doctor_id,
              clinicId: payload.new.clinic_id,
              currentToken: payload.new.current_token || 0,
              totalTokens: payload.new.total_tokens || 0,
              lastUpdated: new Date(payload.new.last_updated),
            };
            callback(token);
          }
        }
      )
      .subscribe();

    this.subscriptions.set(key, channel);

    // Return unsubscribe function
    return () => {
      const sub = this.subscriptions.get(key);
      if (sub) {
        supabase.removeChannel(sub);
        this.subscriptions.delete(key);
      }
    };
  }

  /**
   * Increment total tokens when a new appointment is created
   */
  async incrementTotalTokens(doctorId: string, clinicId: string): Promise<void> {
    const supabase = getSupabaseClient();
    
    // Get current token state
    const current = await this.getCurrentToken(doctorId, clinicId);
    
    // Update total tokens
    const { error } = await supabase
      .from("tokens")
      .upsert({
        doctor_id: doctorId,
        clinic_id: clinicId,
        total_tokens: current.totalTokens + 1,
        last_updated: new Date().toISOString(),
      }, {
        onConflict: "doctor_id,clinic_id",
      });

    if (error) {
      throw new Error(error.message || "Failed to update token");
    }
  }
}

