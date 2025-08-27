import { ContentDto } from "../../DTOs/contents/ContentDto";
import { ContentFilterParameters } from "../../types/ContentFilterParameters";

export interface IContentService {
    /**
     * @returns
     */
    getAllContent(): Promise<ContentDto[]>;


    /**
     * @param params
     */
    getFilter(params: ContentFilterParameters): Promise<ContentDto[]>;
    /**
     * @param content_id
     * @returns
     */
    getContentById(content_id: number): Promise<ContentDto>;

}

