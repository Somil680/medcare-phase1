import { Doctor } from "@/domain/entities/Doctor";

/**
 * Mock doctor data
 * Future: This will be replaced with API calls
 */
export const mockDoctors: Doctor[] = [
  {
    id: "doctor-1",
    clinicId: "clinic-1",
    name: "Dr. Sarah Johnson",
    specialization: "Cardiology",
    qualification: "MD, FACC",
    experience: 15,
    bio: "Expert in cardiovascular diseases with 15 years of experience",
    roomNumber: "101",
    consultationFee: 500,
    availableSlots: generateSlots("clinic-1", "doctor-1"),
  },
  {
    id: "doctor-2",
    clinicId: "clinic-1",
    name: "Dr. Michael Chen",
    specialization: "Pediatrics",
    qualification: "MD, DCH",
    experience: 12,
    bio: "Specialized in child healthcare and development",
    roomNumber: "102",
    consultationFee: 400,
    availableSlots: generateSlots("clinic-1", "doctor-2"),
  },
  {
    id: "doctor-3",
    clinicId: "clinic-2",
    name: "Dr. Emily Rodriguez",
    specialization: "Dermatology",
    qualification: "MD, FAAD",
    experience: 10,
    bio: "Expert in skin care and dermatological conditions",
    roomNumber: "201",
    consultationFee: 450,
    availableSlots: generateSlots("clinic-2", "doctor-3"),
  },
  {
    id: "doctor-4",
    clinicId: "clinic-2",
    name: "Dr. James Wilson",
    specialization: "Orthopedics",
    qualification: "MD, MS",
    experience: 18,
    bio: "Specialized in bone and joint disorders",
    roomNumber: "202",
    consultationFee: 600,
    availableSlots: generateSlots("clinic-2", "doctor-4"),
  },
  {
    id: "doctor-5",
    clinicId: "clinic-3",
    name: "Dr. Priya Sharma",
    specialization: "General Medicine",
    qualification: "MD",
    experience: 8,
    bio: "Comprehensive primary care physician",
    roomNumber: "301",
    consultationFee: 350,
    availableSlots: generateSlots("clinic-3", "doctor-5"),
  },
  {
    id: "doctor-6",
    clinicId: "clinic-3",
    name: "Dr. Robert Taylor",
    specialization: "Neurology",
    qualification: "MD, DM",
    experience: 20,
    bio: "Expert in neurological disorders and treatments",
    roomNumber: "302",
    consultationFee: 700,
    availableSlots: generateSlots("clinic-3", "doctor-6"),
  },
];

/**
 * Generate mock time slots for the next 7 days
 */
function generateSlots(clinicId: string, doctorId: string) {
  const slots = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateStr = date.toISOString().split("T")[0];
    
    // Generate slots from 9 AM to 5 PM, every hour
    for (let hour = 9; hour < 17; hour++) {
      const startTime = `${hour.toString().padStart(2, "0")}:00`;
      const endTime = `${(hour + 1).toString().padStart(2, "0")}:00`;
      
      // Randomly make some slots unavailable
      const available = Math.random() > 0.3;
      
      slots.push({
        date: dateStr,
        startTime,
        endTime,
        available,
      });
    }
  }
  
  return slots;
}

