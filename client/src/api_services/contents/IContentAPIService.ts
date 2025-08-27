import type { ContentDto } from "../../models/contents/ContentDto";
import type { ContentFilterParameters } from "../../types/contents/ContentFilterParameters";


export interface IContentAPIService {
    getAllContent(): Promise<ContentDto[]>;
    getContentById(content_id: number): Promise<ContentDto>;
    getContentByFilter(params: ContentFilterParameters): Promise<ContentDto[]>;
}