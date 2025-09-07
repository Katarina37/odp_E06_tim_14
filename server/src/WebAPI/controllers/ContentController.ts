import { Request, Response, Router } from "express";
import { IContentService } from "../../Domain/services/contents/IContentService";
import { ContentDto } from "../../Domain/DTOs/contents/ContentDto";
import { ContentFilterParameters } from "../../Domain/types/ContentFilterParameters";
import { IOcjenaService } from "../../Domain/services/ratings/IOcjenaService";
import { validateContent } from "../../MiddleWares/validation/ContentValidation";
import { authenticate } from "../../MiddleWares/authentification/AuthMiddleware";
import { authorize } from "../../MiddleWares/authorization/AuthorizeMiddleware";
import { Content } from "../../Domain/models/Content";
import { Epizoda } from "../../Domain/models/Epizoda";

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
        this.router.post("/admin/content", authenticate, authorize("administrator"), validateContent, this.createContent.bind(this));
        this.router.put("/admin/content/:content_id", authenticate, authorize("administrator"), validateContent, this.updateContent.bind(this));

        this.router.delete("/admin/content/:content_id", authenticate, authorize("administrator"), this.deleteContent.bind(this));

        this.router.get("/content", this.contents.bind(this));
        this.router.get("/content/:content_id", this.getById.bind(this));
        this.router.get("/content/:content_id/userrate", this.getUserRate.bind(this));
        this.router.get("/content/korisnik/filter", this.filterContent.bind(this));
    }

     private async createContent(req: Request, res: Response): Promise<void>{
            try{
                const {content, trivia, epizode} = req.body;
                if(!content.naziv || !content.tip || !content.opis){
                    res.status(400).json({success: false, message: "Naziv, tip i opis su obavezni"});
                    return;
                }
    
                const newContent = new Content(
                    0,
                    content.naziv,
                    content.tip,
                    content.opis,
                    new Date(content.datum_izlaska),
                    content.cover_slika || "",
                    content.zanr || ""
                );
    
                const triviaList: string[] = trivia || [];
    
                const epizodeList: Epizoda[] = (epizode || []).map((ep: any) => new Epizoda(0, 0, ep.sezona, ep.broj_epizode, ep.naziv_epizode, ep.opis_epizode, ep.cover_slika || ""));
    
                const createdContent = await this.contentService.createContent(newContent, triviaList, epizodeList);
    
                res.status(201).json({
                    success: true,
                    message: "Sadrzaj uspjesno kreiran",
                    content: createdContent
                });
            }catch(error){
                console.error(error);
                res.status(500).json({success: false, message: "Greska pri kreiranju sadrzaja"});
            }
        }
    
        private async updateContent(req: Request, res: Response): Promise<void>{
            try{
                const content_id = parseInt(req.params.content_id, 10);
                const {content, trivia, epizode} = req.body;
    
                if(!content_id){
                    res.status(400).json({success:false, message: "ID sadrzaja je obavezan"});
                    return;
                }
    
                const updatedContent = new Content(
                    content_id,
                    content.naziv,
                    content.tip,
                    content.opis,
                    new Date(content.datum_izlaska),
                    content.cover_slika || "",
                    content.zanr || ""
                );
    
                const triviaList: string[] = trivia || [];
                const epizodeList: Epizoda[] = (epizode || []).map((ep:any) => new Epizoda(0, content_id, ep.sezona, ep.broj_epizode, ep.naziv_epizode, ep.opis_epizode, ep.cover_slika || ""));
    
                const result = await this.contentService.updateContent(updatedContent, triviaList, epizodeList);
    
                res.status(200).json({
                    success:true,
                    message:"Sadrzaj uspjesno azuriran",
                    content:result
                });
            }catch(error){
                console.error(error);
                res.status(500).json({success:false, message:"Greska pri azuriranju sadrzaja"});
            }
        }
    
        private async deleteContent(req: Request, res: Response): Promise<void>{
            try{
                const content_id = parseInt(req.params.content_id, 10);
    
                if(!content_id){
                    res.status(400).json({success:false, message:"ID sadrzaja je obavezan"});
                    return;
                }
    
                const success = await this.contentService.deleteContent(content_id);
    
                if(success){
                    res.status(200).json({success:true, message:"Sadrzaj uspjesno obrisan"});
                }else{
                    res.status(404).json({success:false, message:"Sadrzaj nije pronadjen"});
                }
            }catch(error){
                console.error(error);
                res.status(500).json({success:false, message:"Greska pri brisanju sadrzaja"});
            }
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

            if(!content || content.content_id === 0){
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



