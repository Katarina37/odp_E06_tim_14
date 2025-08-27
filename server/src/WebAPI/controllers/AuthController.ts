import { Request, Response, Router } from "express";
import { IAuthService } from "../../Domain/services/auth/IAuthService";
import { validacijaPodatakaAuth } from "../validators/auth/RegisterValidator";
import jwt from "jsonwebtoken"

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

      const result = await this.authService.prijava(username, lozinka);
      if (result.user_id !== 0) {
        
        const token = jwt.sign(
          { 
            user_id: result.user_id, 
            username: result.username, 
            uloga: result.uloga,
          }, process.env.JWT_SECRET ?? "", { expiresIn: '6h' });

        res.status(200).json({success: true, message: 'Uspješna prijava', data: token});
        return;
      } else {
        res.status(401).json({success: false, message: 'Neispravno korisnicko ime ili lozinka.'});
        return;
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: err});
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

      const result = await this.authService.registracija(username, uloga, lozinka);
    
      if (result.user_id !== 0) {
        
        const token = jwt.sign(
          { 
            user_id: result.user_id, 
            username: result.username, 
            uloga: result.uloga,
          }, process.env.JWT_SECRET ?? "", { expiresIn: '6h' });


        res.status(201).json({success: true, message: 'Uspešna registracija', data: token});
      } else {
        res.status(401).json({success: false, message: 'Registracija nije uspjela. Korisnicko ime vec postoji.'});
      }
    } catch (error) {
      res.status(500).json({success: false, message: error});
    }
  
  }
  

  public getRouter() : Router {
    return this.router;
  }
}


