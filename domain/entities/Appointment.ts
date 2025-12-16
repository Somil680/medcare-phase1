/**
 * Appointment entity
 * Represents a patient's appointment with a doctor
 */
export interface Appointment {
  id: string;
  userId: string;
  doctorId: string;
  clinicId: string;
  date: string; // ISO date string
  timeSlot: {
    startTime: string;
    endTime: string;
  };
  tokenNumber: number;
  status: AppointmentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum AppointmentStatus {
  UPCOMING = "upcoming",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

