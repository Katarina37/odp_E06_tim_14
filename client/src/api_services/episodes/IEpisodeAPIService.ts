import type { EpizodaDto } from "../../models/episodes/EpisodeDto";

export interface IEpisodeAPIService {
    getAllEpisodes(content_id: number): Promise<EpizodaDto[]>;
    getEpisodeById(episode_id: number, content_id: number): Promise<EpizodaDto>;
}



