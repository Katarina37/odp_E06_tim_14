import type { ContentDto } from "../../models/contents/ContentDto";

export interface IContentAPIService {
    getAllContent(): Promise<ContentDto[]>;
    getContentById(content_id: number): Promise<ContentDto>;
}