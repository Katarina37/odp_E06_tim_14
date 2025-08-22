import type { AuthResponse } from "../../types/auth/AuthResponse";

/**
 * Interfejs za Auth API servis.
 */
export interface IAuthAPIService {
  prijava(username: string, lozinka: string): Promise<AuthResponse>;
  registracija(username: string, lozinka: string, uloga: string): Promise<AuthResponse>;
}