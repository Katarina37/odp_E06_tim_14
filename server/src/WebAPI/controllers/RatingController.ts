import { Request, Response, Router } from "express";
import { IOcjenaService } from "../../Domain/services/ratings/IOcjenaService";
import { validacijaOcjene } from "../validators/rating/RatingValidation";
import { authenticate } from "../../MiddleWares/authentification/AuthMiddleware";

export class RatingController {
    private router: Router;
    private ocjenaService: IOcjenaService;

    constructor(ocjenaService: IOcjenaService){
        this.router = Router();
        this.ocjenaService = ocjenaService;
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/ocjena', authenticate,this.addOcjena.bind(this));
        this.router.put('/ocjena', authenticate,this.updateOcjena.bind(this));
        this.router.get('/ocjena/:content_id/userrate',authenticate, this.getUserOcjena.bind(this));
    }

    private async addOcjena(req: Request, res: Response): Promise<void> {
        try {
            if (!req.user) {
             res.status(401).json({ message: "Korisnik nije prijavljen" });
            return;
            }
            const user_id = req.user.user_id;

            const { content_id, ocjena} = req.body;

            const result = await this.ocjenaService.addOcjena(content_id, user_id, ocjena);

            //const uspjesno = validacijaOcjene(ocjena);

            //if(uspjesno.uspjesno){
                //res.status(200).json(result);
           // }

            res.status(401).json({ success: false, message: "Ocjena nije validna"});

            
        } catch (err) {
            res.status(500).json({ success: false, message: err});
        }
    }

    private async updateOcjena(req: Request, res: Response): Promise<void> {
        try {
            if (!req.user) {
             res.status(401).json({ message: "Korisnik nije prijavljen" });
            return;
            }
            const user_id = req.user.user_id;
            const { content_id, ocjena} = req.body;

            const result = await this.ocjenaService.updateOcjena(content_id, user_id, ocjena);

            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ success: false, message: err});
        }
    }

    private async getUserOcjena(req: Request, res: Response): Promise<void> {
        try {
            if (!req.user) {
             res.status(401).json({ message: "Korisnik nije prijavljen" });
            return;
            }
            const user_id = req.user.user_id;
            const content_id = parseInt(req.params.content_id, 10);

            const result = await this.ocjenaService.getByContentAndUser(content_id, user_id);

            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ success: false, message: err});
        }
    }

    public getRouter() : Router {
    return this.router;
    }

}
