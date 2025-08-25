
/**
 * Rezultat autentifikacije (prijave/registracije).
 */
export interface AuthResponse {
  success: boolean;
  message: string;
  data?: string;
}