import { ContentDto } from "../../DTOs/contents/ContentDto";

export interface IContentService {
    /**
     * @returns
     */
    getAllContent(): Promise<ContentDto[]>;

    /**
     * @param naziv
     * @returns 
     */
    getContentByNaziv(naziv: string): Promise<ContentDto>;
}

