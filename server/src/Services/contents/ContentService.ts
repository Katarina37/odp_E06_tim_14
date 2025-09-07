import { ContentDto } from "../../Domain/DTOs/contents/ContentDto";
import { Content } from "../../Domain/models/Content";
import { IContentRepository } from "../../Domain/repositories/contents/IContentRepository";
import { IContentService } from "../../Domain/services/contents/IContentService";
import { ContentFilterParameters } from "../../Domain/types/ContentFilterParameters";
import { ITriviaRepository } from "../../Domain/repositories/trivia/ITriviaRepository";
import { IEpisodeRepository } from "../../Domain/repositories/episodes/IEpisodeRepository";
import { IOcjenaRepository } from "../../Domain/repositories/ratings/IOcjenaRepository";
import { Epizoda } from "../../Domain/models/Epizoda";
import { Trivia } from "../../Domain/models/Trivia";

export class ContentService implements IContentService {
    public constructor(
        private contentRepository: IContentRepository,
        private triviaRepository: ITriviaRepository,
        private episodeRepository: IEpisodeRepository,
        private ocjenaRepository: IOcjenaRepository
    ) {}

    async getAllContent(): Promise<ContentDto[]> {
        try {
            const contents: Content[] = await this.contentRepository.getAll();
            const contentsDto: ContentDto[] = [];

            for (const content of contents) {
                const prosjecnaOcjena = await this.ocjenaRepository.getAverage(content.content_id);
                const trivije = await this.triviaRepository.getByContentId(content.content_id);

                contentsDto.push(
                    new ContentDto(
                        content.content_id,
                        content.naziv,
                        content.tip,
                        content.opis,
                        content.datum_izlaska,
                        content.cover_slika,
                        content.zanr,
                        prosjecnaOcjena ?? 0,
                        trivije.map(t => t.opis)
                    )
                );
            }

            return contentsDto;
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    async getContentById(content_id: number): Promise<ContentDto> {
        try {
            const content: Content = await this.contentRepository.getById(content_id);
            if (!content || !content.content_id) return new ContentDto();

            const prosjecnaOcjena = await this.ocjenaRepository.getAverage(content.content_id);
            const trivije = await this.triviaRepository.getByContentId(content.content_id);

            return new ContentDto(
                content.content_id,
                content.naziv,
                content.tip,
                content.opis,
                content.datum_izlaska,
                content.cover_slika,
                content.zanr,
                prosjecnaOcjena ?? 0,
                trivije.map(t => t.opis)
            );
        } catch (err) {
            console.error(err);
            return new ContentDto();
        }
    }

    async getFilter(params: ContentFilterParameters): Promise<ContentDto[]> {
        try {
            const contents: Content[] = await this.contentRepository.getFilter(params);
            const contentsDto: ContentDto[] = [];

            for (const content of contents) {
                const prosjecnaOcjena = await this.ocjenaRepository.getAverage(content.content_id);
                const trivije = await this.triviaRepository.getByContentId(content.content_id);

                contentsDto.push(
                    new ContentDto(
                        content.content_id,
                        content.naziv,
                        content.tip,
                        content.opis,
                        content.datum_izlaska,
                        content.cover_slika,
                        content.zanr,
                        prosjecnaOcjena ?? 0,
                        trivije.map(t => t.opis)
                    )
                );
            }

            return contentsDto;
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    async createContent(content: Content, triviaList: string[], epizode: Epizoda[]): Promise<Content> {
        try {
            const newContent = await this.contentRepository.create(content);

            if (!newContent.content_id) {
                return new Content();
            }

            for (const triviaOpis of triviaList) {
                await this.triviaRepository.create(new Trivia(0, newContent.content_id, triviaOpis));
            }

            if (content.tip === 'serija') {
                for (const epizoda of epizode) {
                    epizoda.content_id = newContent.content_id;
                    await this.episodeRepository.create(epizoda);
                }
            }

            return newContent;
        } catch (err) {
            console.error(err);
            return new Content();
        }
    }

    async updateContent(content: Content, triviaList: string[], epizode: Epizoda[]): Promise<Content> {
        try {
            const updatedContent = await this.contentRepository.update(content);
            if (!updatedContent.content_id) {
                return new Content();
            }

           
            await this.triviaRepository.deleteForContent(content.content_id);
            await this.episodeRepository.deleteForContent(content.content_id);

            
            for (const triviaOpis of triviaList) {
                await this.triviaRepository.create(new Trivia(0, content.content_id, triviaOpis));
            }

           
            if (content.tip === 'serija') {
                for (const epizoda of epizode) {
                    epizoda.content_id = content.content_id;
                    await this.episodeRepository.create(epizoda);
                }
            }

            return updatedContent;
        } catch (err) {
            console.error(err);
           return new Content();
        }
    }

    
    async deleteContent(content_id: number): Promise<boolean> {
        try {
            await this.triviaRepository.deleteForContent(content_id);
            await this.episodeRepository.deleteForContent(content_id);

            return await this.contentRepository.delete(content_id);
        } catch (err) {
            console.error(err);
            return false;
        }
    }
}
