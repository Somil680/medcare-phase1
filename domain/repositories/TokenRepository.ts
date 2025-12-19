import { Token } from "../entities/Token";

/**
 * Token repository interface
 * Abstract layer for token tracking operations
 * 
 * Future: This will be replaced with real-time backend
 * (WebSocket, Server-Sent Events, Polling API, etc.)
 */
export interface TokenRepository {
  getCurrentToken(doctorId: string, clinicId: string): Promise<Token>;
  subscribeToTokenUpdates(
    doctorId: string,
    clinicId: string,
    callback: (token: Token) => void
  ): () => void; // Returns unsubscribe function
  incrementTotalTokens?(doctorId: string, clinicId: string): Promise<void>; // Optional method for incrementing tokens
}

