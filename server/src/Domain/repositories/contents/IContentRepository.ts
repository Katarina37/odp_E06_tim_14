import { Content } from "../../models/Content";



export interface IContentRepository {

    /**
     * @param content_id
     * @returns
     */
    getById(content_id: number): Promise<Content>;

    /**
     * @param naziv
     * @returns
     */
    getByNaziv(naziv: string): Promise<Content>;

    /**
     * @param tip
     * @returns
     */
    getByTip(tip: string): Promise<Content>;

    /**
     * @returns
     */
    getAll(): Promise<Content[]>;
}