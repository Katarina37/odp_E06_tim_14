import type { RezultatValidacije } from "../../../types/validation/ValidationResult";

export function validacijaPodatakaAuth(username?: string, lozinka?: string): RezultatValidacije {
  if (!username || !lozinka) {
    return { uspjesno: false, poruka: 'Korisničko ime i lozinka su obavezni.' };
  }

  if (username.length < 3) {
    return { uspjesno: false, poruka: 'Korisničko ime mora imati najmanje 3 karaktera.' };
  }

  if (lozinka.length < 6) {
    return { uspjesno: false, poruka: 'Lozinka mora imati najmanje 6 karaktera.' };
  }

  if (lozinka.length > 20) {
    return { uspjesno: false, poruka: 'Lozinka može imati najviše 20 karaktera.' };
  }

  return { uspjesno: true };
}