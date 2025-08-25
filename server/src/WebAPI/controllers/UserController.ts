import { Request, Response, Router } from "express";
import { authenticate } from "../../MiddleWares/authentification/AuthMiddleware";
import { authorize } from "../../MiddleWares/authorization/AuthorizeMiddleware";
import { IUserService } from "../../Domain/services/users/IUserService";
import { UserDto } from "../../Domain/DTOs/users/UserDto";


export class UserController {
    private router: Router;
    private userService: IUserService;

    constructor(userService: IUserService){
        this.router = Router();
        this.userService = userService;
        this.initializeRoutes();
    }

    private initializeRoutes() : void {
        this.router.get("/users", authenticate, authorize("administrator"), this.korisnici.bind(this));
    }

    private async korisnici(req: Request, res: Response) : Promise<void> {
        try {
            const korisniciPodaci: UserDto[] = await this.userService.getSviKorisnici();

            res.status(200).json(korisniciPodaci);
            return;
        } catch (err) {
            res.status(500).json({ success: false, message: err});
        }
    }

    public getRouter() : Router {
    return this.router;
  }
}
