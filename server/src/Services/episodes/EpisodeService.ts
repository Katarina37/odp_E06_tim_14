import { EpizodaDto } from "../../Domain/DTOs/episodes/EpizodaDto";
import { Epizoda } from "../../Domain/models/Epizoda";
import { IEpisodeRepository } from "../../Domain/repositories/episodes/IEpisodeRepository";
import { IEpisodeService } from "../../Domain/services/episodes/IEpisodeService";


export class EpisodeService implements IEpisodeService {
    public constructor(private episodeRepository: IEpisodeRepository) {}

    async getAllEpisodes(contend_id: number): Promise<EpizodaDto[]> {
       try {
        const episodes: Epizoda[] = await this.episodeRepository.getAll(contend_id);
        const episodesDto: EpizodaDto[] = episodes.map(
            (ep) => new EpizodaDto(ep.episode_id, ep.content_id, ep.sezona, ep.broj_epizode, ep.naziv_epizode, ep.opis_epizode, ep.cover_slika)
        );
        return episodesDto;
       } catch (err) {
        console.log(err);
        return [];
       }
    }

    async getEpisodeById(episode_id: number, content_id: number): Promise<EpizodaDto> {
        try {
            const episode: Epizoda = await this.episodeRepository.getById(episode_id, content_id);
            const episodeDto: EpizodaDto = new EpizodaDto(episode.episode_id, episode.content_id, episode.sezona, episode.broj_epizode, episode.naziv_epizode, episode.opis_epizode, episode.cover_slika);

            return episodeDto;
        } catch (err) {
            console.log(err);
            return new EpizodaDto();
        }
    }
}
