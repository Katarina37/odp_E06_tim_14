import { Request, Response, Router } from "express";
import { IContentService } from "../../Domain/services/contents/IContentService";
import { ContentDto } from "../../Domain/DTOs/contents/ContentDto";


export class ContentController {
    private router: Router;
    private contentService: IContentService;

    constructor(contentService: IContentService) {
        this.router = Router();
        this.contentService = contentService;
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get("/content", this.contents.bind(this));
        this.router.get("/content/:content_id", this.getById.bind(this));
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

    public getRouter(): Router {
        return this.router;
    }
} 



