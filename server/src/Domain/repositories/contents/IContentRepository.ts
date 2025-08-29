import { Content } from "../../models/Content";
import { ContentFilterParameters } from "../../types/ContentFilterParameters";
export interface IContentRepository {

    /**
     * @param content_id
     * @returns
     */
    getById(content_id: number): Promise<Content>;
    
    /**
     * @param params
     * @returns 
     */
    getFilter(param: ContentFilterParameters): Promise<Content[]>;

    /**
     * @returns
     */
    getAll(): Promise<Content[]>;

    create(content: Content): Promise<Content>;
    update(content: Content): Promise<Content>;
    delete(content_id: number): Promise<boolean>;
}