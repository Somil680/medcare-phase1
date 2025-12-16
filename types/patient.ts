/**
 * Patient details for appointment booking
 */
export interface PatientDetails {
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  phoneNumber: string;
  email?: string;
  address?: string;
  medicalHistory?: string;
}

