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

    public getRouter(): Router {
        return this.router;
    }
} 



