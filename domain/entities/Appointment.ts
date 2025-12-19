/**
 * Appointment entity
 * Represents a patient's appointment with a doctor
 */
export interface Appointment {
  id: string;
  userId: string;
  doctorId: string;
  /**
   * Appointment date (YYYY-MM-DD)
   * For token-based appointments this is the visit date.
   */
  date: string;
  timeSlot: {
    startTime: string;
    endTime: string;
  };
  tokenNumber: number;
  status: AppointmentStatus;
  /**
   * Optional patient-facing fields
   * These are primarily used by Supabase-backed implementation.
   */
  patientName?: string;
  patientPhone?: string;
  patientAge?: number;
  patientGender?: "male" | "female" | "other";
  patientNotes?: string;
  doctorNotes?: string;
  /**
   * How the appointment is managed on the doctor side.
   * Defaults to 'token' for this app.
   */
  appointmentMode?: "token" | "scheduled" | "hybrid";
  /**
   * Optional token label, e.g. T-12
   */
  tokenLabel?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum AppointmentStatus {
  UPCOMING = "booked",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

