import { Appointment, AppointmentStatus } from "@/domain/entities/Appointment";

/**
 * Mock appointment data
 * Future: This will be replaced with API calls
 */
export const mockAppointments: Appointment[] = [
  {
    id: "appt-1",
    userId: "user-1",
    doctorId: "doctor-1",
    clinicId: "clinic-1",
    date: new Date().toISOString().split("T")[0],
    timeSlot: {
      startTime: "10:00",
      endTime: "11:00",
    },
    tokenNumber: 5,
    status: AppointmentStatus.UPCOMING,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "appt-2",
    userId: "user-1",
    doctorId: "doctor-3",
    clinicId: "clinic-2",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0], // Tomorrow
    timeSlot: {
      startTime: "14:00",
      endTime: "15:00",
    },
    tokenNumber: 3,
    status: AppointmentStatus.UPCOMING,
    createdAt: new Date("2024-01-21"),
    updatedAt: new Date("2024-01-21"),
  },
  {
    id: "appt-3",
    userId: "user-1",
    doctorId: "doctor-2",
    clinicId: "clinic-1",
    date: new Date(Date.now() - 86400000).toISOString().split("T")[0], // Yesterday
    timeSlot: {
      startTime: "11:00",
      endTime: "12:00",
    },
    tokenNumber: 2,
    status: AppointmentStatus.COMPLETED,
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-20"),
  },
];

