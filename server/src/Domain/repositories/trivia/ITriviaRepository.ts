import { Trivia } from "../../models/Trivia";

export interface ITriviaRepository {
    create(trivia: Trivia): Promise<Trivia>;
    getByContentId(content_id: number): Promise<Trivia[]>;
    deleteForContent(content_id: number): Promise<boolean>;
}