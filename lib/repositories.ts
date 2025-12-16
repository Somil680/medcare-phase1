import { AuthRepository } from "@/domain/repositories/AuthRepository";
import { ClinicRepository } from "@/domain/repositories/ClinicRepository";
import { AppointmentRepository } from "@/domain/repositories/AppointmentRepository";
import { TokenRepository } from "@/domain/repositories/TokenRepository";

import { MockAuthRepository } from "@/infrastructure/mock/MockAuthRepository";
import { MockClinicRepository } from "@/infrastructure/mock/MockClinicRepository";
import { MockAppointmentRepository } from "@/infrastructure/mock/MockAppointmentRepository";
import { MockTokenRepository } from "@/infrastructure/mock/MockTokenRepository";

/**
 * Repository factory
 * Centralized place to get repository instances
 * 
 * Future: Replace mock implementations with real backend implementations
 */
class RepositoryFactory {
  private static authRepository: AuthRepository | null = null;
  private static clinicRepository: ClinicRepository | null = null;
  private static appointmentRepository: AppointmentRepository | null = null;
  private static tokenRepository: TokenRepository | null = null;

  static getAuthRepository(): AuthRepository {
    if (!this.authRepository) {
      this.authRepository = new MockAuthRepository();
    }
    return this.authRepository;
  }

  static getClinicRepository(): ClinicRepository {
    if (!this.clinicRepository) {
      this.clinicRepository = new MockClinicRepository();
    }
    return this.clinicRepository;
  }

  static getAppointmentRepository(): AppointmentRepository {
    if (!this.appointmentRepository) {
      this.appointmentRepository = new MockAppointmentRepository();
    }
    return this.appointmentRepository;
  }

  static getTokenRepository(): TokenRepository {
    if (!this.tokenRepository) {
      this.tokenRepository = new MockTokenRepository();
    }
    return this.tokenRepository;
  }
}

export default RepositoryFactory;

