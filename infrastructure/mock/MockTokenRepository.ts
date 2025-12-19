import { TokenRepository } from "@/domain/repositories/TokenRepository";
import { Token } from "@/domain/entities/Token";
import { mockTokenState } from "@/mock-data/tokens";

/**
 * Mock token repository
 * Simulates real-time token updates using setInterval
 * 
 * Future: Replace with WebSocket, Server-Sent Events, or polling API
 */
export class MockTokenRepository implements TokenRepository {
  private subscriptions: Map<string, NodeJS.Timeout> = new Map();
  private callbacks: Map<string, Set<(token: Token) => void>> = new Map();
  private tokenState: Record<string, Token> = { ...mockTokenState };

  private getKey(doctorId: string, clinicId: string): string {
    return `${doctorId}-${clinicId}`;
  }

  async getCurrentToken(doctorId: string, clinicId: string): Promise<Token> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    const key = this.getKey(doctorId, clinicId);
    const token = this.tokenState[key];

    if (!token) {
      // Create default token state if not exists
      const newToken: Token = {
        doctorId,
        clinicId,
        currentToken: 0,
        totalTokens: 0,
        lastUpdated: new Date(),
      };
      this.tokenState[key] = newToken;
      return newToken;
    }

    return { ...token };
  }

  /**
   * Increment total tokens when a new appointment is created
   * This ensures the next token number is correctly calculated
   */
  async incrementTotalTokens(doctorId: string, clinicId: string): Promise<void> {
    const key = this.getKey(doctorId, clinicId);
    const token = this.tokenState[key];

    if (token) {
      token.totalTokens += 1;
      token.lastUpdated = new Date();

      // Notify all subscribers
      const callbacks = this.callbacks.get(key);
      if (callbacks) {
        const updatedToken = { ...token };
        callbacks.forEach((cb) => cb(updatedToken));
      }
    } else {
      // Create new token state if it doesn't exist
      this.tokenState[key] = {
        doctorId,
        clinicId,
        currentToken: 0,
        totalTokens: 1,
        lastUpdated: new Date(),
      };
    }
  }

  subscribeToTokenUpdates(
    doctorId: string,
    clinicId: string,
    callback: (token: Token) => void
  ): () => void {
    const key = this.getKey(doctorId, clinicId);

    // Initialize callbacks set if not exists
    if (!this.callbacks.has(key)) {
      this.callbacks.set(key, new Set());
    }

    this.callbacks.get(key)!.add(callback);

    // Start interval if not already running
    if (!this.subscriptions.has(key)) {
      const interval = setInterval(() => {
        this.updateToken(doctorId, clinicId);
      }, 3000); // Update every 3 seconds

      this.subscriptions.set(key, interval);
    }

    // Return unsubscribe function
    return () => {
      const callbacks = this.callbacks.get(key);
      if (callbacks) {
        callbacks.delete(callback);

        // Stop interval if no more callbacks
        if (callbacks.size === 0) {
          const interval = this.subscriptions.get(key);
          if (interval) {
            clearInterval(interval);
            this.subscriptions.delete(key);
          }
        }
      }
    };
  }

  private updateToken(doctorId: string, clinicId: string): void {
    const key = this.getKey(doctorId, clinicId);
    const token = this.tokenState[key];

    if (!token) return;

    // Simulate token progression
    // Randomly increment current token (but not beyond total)
    if (token.currentToken < token.totalTokens && Math.random() > 0.7) {
      token.currentToken = Math.min(
        token.currentToken + 1,
        token.totalTokens
      );
      token.lastUpdated = new Date();
    }

    // Notify all subscribers
    const callbacks = this.callbacks.get(key);
    if (callbacks) {
      const updatedToken = { ...token };
      callbacks.forEach((cb) => cb(updatedToken));
    }
  }

  /**
   * Increment total tokens when a new appointment is created
   */
  async incrementTotalTokens(doctorId: string, clinicId: string): Promise<void> {
    const key = this.getKey(doctorId, clinicId);
    const token = this.tokenState[key];

    if (token) {
      token.totalTokens += 1;
      token.lastUpdated = new Date();

      // Notify all subscribers
      const callbacks = this.callbacks.get(key);
      if (callbacks) {
        const updatedToken = { ...token };
        callbacks.forEach((cb) => cb(updatedToken));
      }
    } else {
      // Create new token state if it doesn't exist
      this.tokenState[key] = {
        doctorId,
        clinicId,
        currentToken: 0,
        totalTokens: 1,
        lastUpdated: new Date(),
      };
    }
  }
}

