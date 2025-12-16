import { Clinic } from "../entities/Clinic";
import { Doctor } from "../entities/Doctor";

/**
 * Clinic repository interface
 * Abstract layer for clinic and doctor data operations
 * 
 * Future: This will be replaced with real backend API
 */
export interface ClinicRepository {
  getAllClinics(): Promise<Clinic[]>;
  getClinicById(id: string): Promise<Clinic | null>;
  getDoctorsByClinic(clinicId: string): Promise<Doctor[]>;
  getDoctorById(doctorId: string): Promise<Doctor | null>;
}

