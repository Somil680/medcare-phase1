/**
 * User entity
 * Represents a patient/user in the system
 */
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  createdAt: Date;
}

