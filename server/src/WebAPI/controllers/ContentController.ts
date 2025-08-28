import { Request, Response, Router } from "express";
import { IContentService } from "../../Domain/services/contents/IContentService";
import { ContentDto } from "../../Domain/DTOs/contents/ContentDto";
import { ContentFilterParameters } from "../../Domain/types/ContentFilterParameters";
import { IOcjenaService } from "../../Domain/services/ratings/IOcjenaService";

export class ContentController {
    private router: Router;
    private contentService: IContentService;
    private ocjenaService: IOcjenaService;

    constructor(contentService: IContentService, ocjenaService: IOcjenaService) {
        this.router = Router();
        this.contentService = contentService;
        this.ocjenaService = ocjenaService;
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get("/content", this.contents.bind(this));
        this.router.get("/content/:content_id", this.getById.bind(this));
        this.router.get("/content/:content_id/userrate", this.getUserRate.bind(this));
        this.router.get("/content/korisnik/filter", this.filterContent.bind(this));
    }

    private async contents(req: Request, res: Response): Promise<void> {
        try {
            const contentPodaci: ContentDto[] =
             await this.contentService.getAllContent();

            res.status(200).json(contentPodaci);
            return;
        } catch (error) {
            res.status(500).json( { success: false, message: error});
        }
        
    }

    private async getById(req: Request, res: Response): Promise<void> {
        try {
            const content_id = parseInt(req.params.content_id, 10);

            const content: ContentDto = 
             await this.contentService.getContentById(content_id);

            if(!content){
                res.status(404).json({ success: false, message: "Sadrzaj nije dostupan "});
            } 

            res.status(200).json(content);
            return;
        } catch (err) {
            res.status(500).json({ success: false, message: err});
        }
    }

    private async getUserRate(req: Request, res: Response): Promise<void> {
        try {
            if(!req.user){
                res.status(401).json({message: "Korisnik nije prijavljen"});
                return;
            }

            const content_id = parseInt(req.params.content_id, 10);
            const user_id = req.user!.user_id;

            const result = await this.ocjenaService.getByContentAndUser(content_id, user_id);

            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ success: false, message: err});
        }
    }

    private async filterContent(req: Request, res: Response): Promise<void> {
        try {
            const params: ContentFilterParameters = {
                tip: req.query.tip as string | undefined,
                naziv: req.query.naziv as string | undefined,
                sortBy: req.query.sortBy as "naziv" | "prosjecna_ocjena" | undefined,
                sortOrder: req.query.sortOrder as "asc" | "desc" | undefined,
            };

            const contents = await this.contentService.getFilter(params);

            if(!contents) {
                res.status(404).json({ success: false, message: "Nijedan sadrzaj ne odgovara datim parametrima"});
            }

            res.status(200).json(contents);
            return;
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: err});
        }
    }



    public getRouter(): Router {
        return this.router;
    }
} 



