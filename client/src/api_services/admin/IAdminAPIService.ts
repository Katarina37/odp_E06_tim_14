import type { ContentDto } from "../../models/contents/ContentDto";
import type { EpizodaDto } from "../../models/episodes/EpisodeDto";

export interface CreateContentRequest {
    content:{
        naziv: string;
        tip: string;
        opis: string;
        datum_izlaska: string;
        cover_slika?: string;
        zanr?: string;
    };
    trivia?: string[];
    epizode?: EpizodaDto[];
}

export interface IAdminAPIService {
    
    createContent(contentData: CreateContentRequest, token: string): Promise<ContentDto>;

    updateContent(content_id: number, contentData: CreateContentRequest, token: string): Promise<ContentDto>;

    deleteContent(content_id: number, token: string): Promise<boolean>;
}