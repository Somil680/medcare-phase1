/**
 * Token entity
 * Represents the current token state for a doctor/clinic
 */
export interface Token {
  doctorId: string;
  clinicId: string;
  currentToken: number;
  totalTokens: number;
  lastUpdated: Date;
}

