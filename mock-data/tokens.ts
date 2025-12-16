import { Token } from "@/domain/entities/Token";

/**
 * Mock token state data
 * Future: This will be replaced with real-time backend
 */
export const mockTokenState: Record<string, Token> = {
  "doctor-1-clinic-1": {
    doctorId: "doctor-1",
    clinicId: "clinic-1",
    currentToken: 3,
    totalTokens: 10,
    lastUpdated: new Date(),
  },
  "doctor-2-clinic-1": {
    doctorId: "doctor-2",
    clinicId: "clinic-1",
    currentToken: 1,
    totalTokens: 8,
    lastUpdated: new Date(),
  },
  "doctor-3-clinic-2": {
    doctorId: "doctor-3",
    clinicId: "clinic-2",
    currentToken: 2,
    totalTokens: 6,
    lastUpdated: new Date(),
  },
  "doctor-4-clinic-2": {
    doctorId: "doctor-4",
    clinicId: "clinic-2",
    currentToken: 4,
    totalTokens: 12,
    lastUpdated: new Date(),
  },
  "doctor-5-clinic-3": {
    doctorId: "doctor-5",
    clinicId: "clinic-3",
    currentToken: 1,
    totalTokens: 5,
    lastUpdated: new Date(),
  },
  "doctor-6-clinic-3": {
    doctorId: "doctor-6",
    clinicId: "clinic-3",
    currentToken: 3,
    totalTokens: 9,
    lastUpdated: new Date(),
  },
};

