import { UserLoginDto } from "../../Domain/DTOs/auth/UserLoginDto";
import { User } from "../../Domain/models/User";
import { IUserRepository } from "../../Domain/repositories/users/IUserRepository";
import { IAuthService } from "../../Domain/services/auth/IAuthService";
import bcrypt from "bcryptjs";

export class AuthService implements IAuthService {
  private readonly saltRounds: number = parseInt(process.env.SALT_ROUNDS || "10", 10);

  public constructor(private userRepository: IUserRepository) {}

  async prijava(username: string, lozinka: string): Promise<UserLoginDto> {
    const user = await this.userRepository.getByUsername(username);

    if (user.user_id !== 0 && await bcrypt.compare(lozinka, user.lozinka)) {
      return new UserLoginDto(user.user_id, user.username, user.uloga);
    }
    console.log("Nađen user:", user);
    console.log("Sifra: ", user.lozinka);

    return new UserLoginDto(); // Neispravno korisničko ime ili lozinka
  }

  async registracija(username: string, uloga: string, lozinka: string): Promise<UserLoginDto> {
    const existingUser = await this.userRepository.getByUsername(username);
    
    if (existingUser.user_id !== 0) {
      return new UserLoginDto(); // Korisnik već postoji
    }

    // Hash-ujemo lozinku pre čuvanja
    const hashedPassword = await bcrypt.hash(lozinka, this.saltRounds);

    const newUser = await this.userRepository.create(
      new User(0, username, uloga, hashedPassword)
    );

    if (newUser.user_id !== 0) {
      return new UserLoginDto(newUser.user_id, newUser.username, newUser.uloga);
    }

    return new UserLoginDto(); // Registracija nije uspela
  }
}



