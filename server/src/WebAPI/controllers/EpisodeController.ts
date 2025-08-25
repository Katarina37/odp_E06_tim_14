import { Request, Response, Router } from "express";
import { IEpisodeService } from "../../Domain/services/episodes/IEpisodeService";
import { EpizodaDto } from "../../Domain/DTOs/episodes/EpizodaDto";

export class EpisodeController {
    private router: Router;
    private episodeService: IEpisodeService;

    constructor(episodeService: IEpisodeService) {
        this.router = Router();
        this.episodeService = episodeService;
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get("/content/:content_id/episodes", this.getAll.bind(this));
        this.router.get("/content/:content_id/episodes/:episode_id", this.getEpisode.bind(this));
    }

    private async getAll(req: Request, res: Response): Promise<void> {
        try {
            const content_id = parseInt(req.params.content_id, 10);
            const epPodaci: EpizodaDto[] = await this.episodeService.getAllEpisodes(content_id)
           
            res.status(200).json(epPodaci);
            return;
        } catch (error) {
            res.status(500).json({ success: false, message: error});
        }
    }

    private async getEpisode(req: Request, res: Response): Promise<void> {
        try {
            const content_id = parseInt(req.params.content_id, 10);
            const episode_id = parseInt(req.params.episode_id, 10);

            const episode: EpizodaDto = await this.episodeService.getEpisodeById(episode_id, content_id);

            if(!episode){
                res.status(404).json({ success: false, message: "Sadrzaj nije pronadjen"});
            }

            res.status(200).json(episode);
        } catch (error) {
            res.status(500).json({ success: false, message: error});
        }
    }

    public getRouter(): Router {
        return this.router;
    }
}
