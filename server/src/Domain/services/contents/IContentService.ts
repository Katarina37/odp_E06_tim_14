import { ContentDto } from "../../DTOs/contents/ContentDto";
import { Content } from "../../models/Content";
import { Epizoda } from "../../models/Epizoda";
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

    /**
     * 
     * @param content 
     * @param triviaList 
     * @param epizode 
     */
    createContent(content: Content, triviaList: string[], epizode: Epizoda[]): Promise<Content>;

    /**
     * 
     * @param content 
     * @param triviaList 
     * @param epizode 
     */
    updateContent(content: Content, triviaList: string[], epizode: Epizoda[]): Promise<Content>;
    
    /**
     * 
     * @param content_id 
     */
    deleteContent(content_id: number): Promise<boolean>;
}

