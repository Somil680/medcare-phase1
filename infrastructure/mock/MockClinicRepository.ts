import { ClinicRepository } from "@/domain/repositories/ClinicRepository";
import { Clinic } from "@/domain/entities/Clinic";
import { Doctor } from "@/domain/entities/Doctor";
import { mockClinics } from "@/mock-data/clinics";
import { mockDoctors } from "@/mock-data/doctors";

/**
 * Mock clinic repository
 * Returns mock clinic and doctor data
 * 
 * Future: Replace with real API calls
 */
export class MockClinicRepository implements ClinicRepository {
  async getAllClinics(): Promise<Clinic[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return [...mockClinics];
  }

  async getClinicById(id: string): Promise<Clinic | null> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    return mockClinics.find((c) => c.id === id) || null;
  }

  async getDoctorsByClinic(clinicId: string): Promise<Doctor[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 400));

    return mockDoctors.filter((d) => d.clinicId === clinicId);
  }

  async getDoctorById(doctorId: string): Promise<Doctor | null> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    return mockDoctors.find((d) => d.id === doctorId) || null;
  }
}

