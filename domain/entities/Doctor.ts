/**
 * Doctor entity
 * Represents a doctor in a clinic
 */
export interface Doctor {
  id: string;
  clinicId: string;
  name: string;
  specialization: string;
  qualification: string;
  experience: number;
  avatar?: string;
  bio?: string;
  roomNumber: string;
  consultationFee: number;
  availableSlots: TimeSlot[];
}

export interface TimeSlot {
  date: string; // ISO date string
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  available: boolean;
}

