import { Clinic } from "@/domain/entities/Clinic";

/**
 * Mock clinic data
 * Future: This will be replaced with API calls
 */
export const mockClinics: Clinic[] = [
  {
    id: "clinic-1",
    name: "City Medical Center",
    address: "123 Health Street, Medical District, City 12345",
    phone: "+1 (555) 123-4567",
    email: "info@citymedical.com",
    description: "A leading healthcare facility providing comprehensive medical services",
    operatingHours: {
      open: "09:00",
      close: "18:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    },
  },
  {
    id: "clinic-2",
    name: "Wellness Care Clinic",
    address: "456 Wellness Avenue, Health Zone, City 12345",
    phone: "+1 (555) 234-5678",
    email: "contact@wellnesscare.com",
    description: "Your trusted partner in health and wellness",
    operatingHours: {
      open: "08:00",
      close: "20:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
  },
  {
    id: "clinic-3",
    name: "Family Health Hub",
    address: "789 Family Road, Community Center, City 12345",
    phone: "+1 (555) 345-6789",
    email: "hello@familyhealth.com",
    description: "Comprehensive family healthcare services",
    operatingHours: {
      open: "07:00",
      close: "19:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    },
  },
];

