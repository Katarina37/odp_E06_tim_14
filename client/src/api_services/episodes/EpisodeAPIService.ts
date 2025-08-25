import axios from "axios";
import type { IEpisodeAPIService } from "./IEpisodeAPIService";
import type { EpizodaDto } from "../../models/episodes/EpisodeDto";

const API_URL: string = import.meta.env.VITE_API_URL + "content";

export const episodeApi : IEpisodeAPIService = {
    async getAllEpisodes(content_id: number): Promise<EpizodaDto[]> {
        try {
            const res = await axios.get<EpizodaDto[]>(`${API_URL}/${content_id}/episodes`);

            return res.data;
        } catch (err) {
            console.error(err);
            return [];
        }
    },

    async getEpisodeById(episode_id: number, content_id: number): Promise<EpizodaDto> {
        try {
            const res = await axios.get<EpizodaDto>(`${API_URL}/${content_id}/episodes/${episode_id}`);

            return res.data;
        } catch (err) {
            console.error(err);
            throw new Error("Sadrzaj nije pronadjen");
        }
    },
}