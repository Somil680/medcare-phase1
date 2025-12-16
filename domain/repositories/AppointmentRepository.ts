import { Appointment, AppointmentStatus } from "../entities/Appointment";

/**
 * Appointment repository interface
 * Abstract layer for appointment operations
 * 
 * Future: This will be replaced with real backend API
 */
export interface AppointmentRepository {
  createAppointment(appointment: Omit<Appointment, "id" | "createdAt" | "updatedAt">): Promise<Appointment>;
  getAppointmentById(id: string): Promise<Appointment | null>;
  getAppointmentsByUser(userId: string): Promise<Appointment[]>;
  updateAppointmentStatus(id: string, status: AppointmentStatus): Promise<Appointment>;
  cancelAppointment(id: string): Promise<void>;
}

