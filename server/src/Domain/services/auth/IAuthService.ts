import { UserLoginDto } from "../../DTOs/auth/UserLoginDto";

export interface IAuthService {
    /**
     * Prijavljuje korisnika sa datim korisničkim imenom i lozinkom.
     * @param username - Korisničko ime korisnika.
     * @param lozinka - Lozinka korisnika.
     * @returns Podatke o korisniku ako je prijava uspešna, ili prazan objekat ako nije.
     */
  prijava(username: string, lozinka: string): Promise<UserLoginDto>;

  /**
   * Registruje novog korisnika sa datim korisničkim imenom i lozinkom.
   * @param username - Korisničko ime korisnika.
   * @param uloga -- Uloga korisnika
   * @param lozinka - Lozinka korisnika.
   * @returns Podatke o korisniku ako je registracija uspešna, ili prazan objekat ako nije.
  */
  registracija(username: string, uloga: string, lozinka: string): Promise<UserLoginDto>;
}
