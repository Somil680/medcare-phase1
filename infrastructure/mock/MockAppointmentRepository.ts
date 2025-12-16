import { AppointmentRepository } from "@/domain/repositories/AppointmentRepository";
import { Appointment, AppointmentStatus } from "@/domain/entities/Appointment";
import { mockAppointments } from "@/mock-data/appointments";

/**
 * Mock appointment repository
 * Manages appointments in memory
 * 
 * Future: Replace with real API calls
 */
export class MockAppointmentRepository implements AppointmentRepository {
  private appointments: Appointment[] = [...mockAppointments];
  private storageKey = "medcare_mock_appointments";

  constructor() {
    // Restore from localStorage on init
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          this.appointments = parsed.map((a: any) => ({
            ...a,
            createdAt: new Date(a.createdAt),
            updatedAt: new Date(a.updatedAt),
          }));
        } catch {
          // Ignore parse errors
        }
      }
    }
  }

  private saveToStorage() {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.storageKey, JSON.stringify(this.appointments));
    }
  }

  async createAppointment(
    appointment: Omit<Appointment, "id" | "createdAt" | "updatedAt">
  ): Promise<Appointment> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newAppointment: Appointment = {
      ...appointment,
      id: `appt-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.appointments.push(newAppointment);
    this.saveToStorage();

    return newAppointment;
  }

  async getAppointmentById(id: string): Promise<Appointment | null> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    return this.appointments.find((a) => a.id === id) || null;
  }

  async getAppointmentsByUser(userId: string): Promise<Appointment[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 400));

    return this.appointments
      .filter((a) => a.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async updateAppointmentStatus(
    id: string,
    status: AppointmentStatus
  ): Promise<Appointment> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const appointment = this.appointments.find((a) => a.id === id);
    if (!appointment) {
      throw new Error("Appointment not found");
    }

    appointment.status = status;
    appointment.updatedAt = new Date();
    this.saveToStorage();

    return appointment;
  }

  async cancelAppointment(id: string): Promise<void> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const appointment = this.appointments.find((a) => a.id === id);
    if (!appointment) {
      throw new Error("Appointment not found");
    }

    appointment.status = AppointmentStatus.CANCELLED;
    appointment.updatedAt = new Date();
    this.saveToStorage();
  }
}

