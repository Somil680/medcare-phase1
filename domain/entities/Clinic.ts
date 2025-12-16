/**
 * Clinic entity
 * Represents a medical clinic
 */
export interface Clinic {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  image?: string;
  description?: string;
  operatingHours: {
    open: string;
    close: string;
    days: string[];
  };
}

