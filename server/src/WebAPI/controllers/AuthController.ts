import { Request, Response, Router } from 'express';
import { IAuthService } from '../../Domain/services/auth/IAuthService';
import { validacijaPodatakaAuth } from '../validators/auth/RegisterValidator';
import jwt from "jsonwebtoken";

export class AuthController {
  private router: Router;
  private authService: IAuthService;

  constructor(authService: IAuthService) {
    this.router = Router();
    this.authService = authService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/auth/login', this.prijava.bind(this));
    this.router.post('/auth/register', this.registracija.bind(this));
  }

  private async prijava(req: Request, res: Response): Promise<void> {
    try {
      const { username, lozinka } = req.body;
      const rezultat = validacijaPodatakaAuth(username, lozinka);
      if (!rezultat.uspjesno) {
        res.status(400).json({ success: false, message: rezultat.poruka });
        return;
      }

      const user = await this.authService.prijava(username, lozinka);

      if (user.user_id !== 0) {
        const token = jwt.sign(
          { user_id: user.user_id, username: user.username, uloga: user.uloga },
          process.env.JWT_SECRET ?? "",
          { expiresIn: '6h' }
        );

        /*res.status(200).json({ success: true, message: 'Uspešna prijava', data: token });*/
        res.status(200).json({
          success: true,
          message: 'Uspešna prijava',
          token,
          user: {
            user_id: user.user_id,
            username: user.username,
            uloga: user.uloga,
          },
        });
        return;
      } else {
        res.status(401).json({ success: false, message: 'Neispravno korisničko ime ili lozinka' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  private async registracija(req: Request, res: Response): Promise<void> {
    try {
      const { username, lozinka, uloga } = req.body;
      const rezultat = validacijaPodatakaAuth(username, lozinka);
      if (!rezultat.uspjesno) {
        res.status(400).json({ success: false, message: rezultat.poruka });
        return;
      }

      const user = await this.authService.registracija(username, uloga, lozinka);

      if (user.user_id !== 0) {
        const token = jwt.sign(
          { user_id: user.user_id, username: user.username, uloga: user.uloga },
          process.env.JWT_SECRET ?? "",
          { expiresIn: '6h' }
        );

        /*res.status(201).json({ success: true, message: 'Uspešna registracija', data: token });*/
        res.status(201).json({
          success:true,
          message: "Uspešna registracija",
          token,
          user:{
            user_id: user.user_id,
            username: user.username,
            uloga: user.uloga
          }
        });
        
      } else {
        res.status(401).json({ success: false, message: 'Registracija nije uspela. Korisničko ime već postoji.' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}
