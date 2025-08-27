import { ContentDto } from "../../Domain/DTOs/contents/ContentDto";
import { Content } from "../../Domain/models/Content";
import { IContentRepository } from "../../Domain/repositories/contents/IContentRepository";
import { IContentService } from "../../Domain/services/contents/IContentService";
import { ContentFilterParameters } from "../../Domain/types/ContentFilterParameters";

export class ContentService implements IContentService {
    public constructor(private contentRepository: IContentRepository) {}

    async getAllContent(): Promise<ContentDto[]> {
        try {
            const contents: Content[] = await this.contentRepository.getAll();
            const contentsDto: ContentDto[] = contents.map(
            (content) => new ContentDto(content.content_id, content.naziv, content.tip, content.opis, content.datum_izlaska, content.cover_slika, content.zanr, content.prosjecna_ocjena, content.trivia_opis)
            );

            return contentsDto;
        } catch (err) {
            console.log(err);
            return [];
        }
    }


    async getContentById(content_id: number): Promise<ContentDto> {
        try {
            const content: Content = await this.contentRepository.getById(content_id);
            const contentDto: ContentDto = new ContentDto(content.content_id, content.naziv, content.tip, content.opis, content.datum_izlaska, content.cover_slika, content.zanr, content.prosjecna_ocjena, content.trivia_opis);

            return contentDto;
        } catch (err) {
            console.error(err);
            return new ContentDto();
        }
    }

    async getFilter(params: ContentFilterParameters): Promise<ContentDto[]> {
        try {
            const contents: Content[] = await this.contentRepository.getFilter(params);
            const contentsDto: ContentDto[] = contents.map(
            (content) => new ContentDto(content.content_id, content.naziv, content.tip, content.opis, content.datum_izlaska, content.cover_slika, content.zanr, content.prosjecna_ocjena, content.trivia_opis)
            );

            return contentsDto;
        } catch (err){
            console.error(err);
            return [];
        }
    }

}