import { User } from "../entities/User";

/**
 * Authentication repository interface
 * Abstract layer for authentication operations
 * 
 * Future: This will be replaced with real auth provider
 * (Firebase, Supabase, Custom API, etc.)
 */
export interface AuthRepository {
  login(phoneOrEmail: string, password?: string): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  isAuthenticated(): Promise<boolean>;
}

