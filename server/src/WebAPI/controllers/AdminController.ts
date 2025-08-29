import { Request, Response, Router } from "express";
import { Content } from "../../Domain/models/Content";
import { Epizoda } from "../../Domain/models/Epizoda";
import { ContentService } from "../../Services/contents/ContentService";
import { authenticate } from "../../MiddleWares/authentification/AuthMiddleware";
import { authorize } from "../../MiddleWares/authorization/AuthorizeMiddleware";
import { validateContent } from "../../Middlewares/validation/ContentValidation";

export class AdminController{
    private router: Router;
    private contentService: ContentService;

    constructor(contentService: ContentService){
        this.router = Router();
        this.contentService = contentService;
        this.initializeRoutes();
    }

    private initializeRoutes(): void{
        this.router.post("/admin/content", authenticate, authorize("administrator"), validateContent, this.createContent.bind(this));

        this.router.put("/admin/content/:content_id", authenticate, authorize("administrator"), validateContent, this.updateContent.bind(this));

        this.router.delete("/admin/content/:content_id", authenticate, authorize("administrator"), this.deleteContent.bind(this));
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

    public getRouter(): Router{
        return this.router;
    }

}