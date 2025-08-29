import { Epizoda } from "../../models/Epizoda";

export interface IEpisodeRepository {

    /**
     * @param content_id
     * @returns
     */
    getAll(content_id: number): Promise<Epizoda[]>;

    /**
     * @param episode_id
     * @param content_id
     * @returns
     */
    getById(episode_id: number, content_id: number): Promise<Epizoda>;

    create(epizoda: Epizoda): Promise<Epizoda>;
    deleteForContent(content_id: number): Promise<boolean>;

}