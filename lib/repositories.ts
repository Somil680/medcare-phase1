import { AuthRepository } from "@/domain/repositories/AuthRepository";
import { ClinicRepository } from "@/domain/repositories/ClinicRepository";
import { AppointmentRepository } from "@/domain/repositories/AppointmentRepository";
import { TokenRepository } from "@/domain/repositories/TokenRepository";

import { MockAuthRepository } from "@/infrastructure/mock/MockAuthRepository";
import { MockClinicRepository } from "@/infrastructure/mock/MockClinicRepository";
import { MockAppointmentRepository } from "@/infrastructure/mock/MockAppointmentRepository";
import { MockTokenRepository } from "@/infrastructure/mock/MockTokenRepository";

import { SupabaseAuthRepository } from "@/infrastructure/supabase/SupabaseAuthRepository";
import { SupabaseClinicRepository } from "@/infrastructure/supabase/SupabaseClinicRepository";
import { SupabaseAppointmentRepository } from "@/infrastructure/supabase/SupabaseAppointmentRepository";
import { SupabaseTokenRepository } from "@/infrastructure/supabase/SupabaseTokenRepository";

/**
 * Repository factory
 * Centralized place to get repository instances
 * 
 * Automatically uses Supabase if environment variables are set,
 * otherwise falls back to mock implementations
 */
class RepositoryFactory {
  private static useSupabase(): boolean {
    return !!(
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }

  private static authRepository: AuthRepository | null = null;
  private static clinicRepository: ClinicRepository | null = null;
  private static appointmentRepository: AppointmentRepository | null = null;
  private static tokenRepository: TokenRepository | null = null;

  static getAuthRepository(): AuthRepository {
    if (!this.authRepository) {
      this.authRepository = this.useSupabase()
        ? new SupabaseAuthRepository()
        : new MockAuthRepository();
    }
    return this.authRepository;
  }

  static getClinicRepository(): ClinicRepository {
    if (!this.clinicRepository) {
      this.clinicRepository = this.useSupabase()
        ? new SupabaseClinicRepository()
        : new MockClinicRepository();
    }
    return this.clinicRepository;
  }

  static getAppointmentRepository(): AppointmentRepository {
    if (!this.appointmentRepository) {
      this.appointmentRepository = this.useSupabase()
        ? new SupabaseAppointmentRepository()
        : new MockAppointmentRepository();
    }
    return this.appointmentRepository;
  }

  static getTokenRepository(): TokenRepository {
    if (!this.tokenRepository) {
      this.tokenRepository = this.useSupabase()
        ? new SupabaseTokenRepository()
        : new MockTokenRepository();
    }
    return this.tokenRepository;
  }
}

export default RepositoryFactory;

