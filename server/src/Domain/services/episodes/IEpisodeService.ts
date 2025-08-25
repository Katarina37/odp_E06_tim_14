import { EpizodaDto } from "../../DTOs/episodes/EpizodaDto";

export interface IEpisodeService {
    /**
     * @param contend_id
     * @returns
     */
    getAllEpisodes(contend_id: number): Promise<EpizodaDto[]>;

    /**
     * @param episode_id
     * @param content_id
     * @returns
     */
    getEpisodeById(episode_id: number, contend_id: number): Promise<EpizodaDto>;
}

