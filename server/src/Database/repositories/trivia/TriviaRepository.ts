import { ITriviaRepository } from "../../../Domain/repositories/trivia/ITriviaRepository";
import { Trivia } from "../../../Domain/models/Trivia";
import { RowDataPacket, ResultSetHeader } from "mysql2"
import db from "../../connection/DbConnectionPool"

export class TriviaRepository implements ITriviaRepository{
    async create(trivia: Trivia): Promise<Trivia>{
        try{
            const query =  `
                INSERT INTO trivia (content_id, opis)
                VALUES (?, ?)
            `;

            const [result] = await db.execute<ResultSetHeader>(query, [
                trivia.content_id,
                trivia.opis
            ]);

            if(result.insertId){
                return new Trivia(result.insertId, trivia.content_id, trivia.opis);
            }
            return new Trivia();
        }catch(err){
            console.error(err);
            return new Trivia();
        }
    }

    async getByContentId(content_id: number): Promise<Trivia[]>{
        try{
            const query = `
                SELECT * FROM trivia 
                WHERE content_id = ?
            `;

            const [rows] = await db.execute<RowDataPacket[]>(query, [content_id]);

            return rows.map(
                (row) => new Trivia(row.trivia_id, row.content_id, row.opis)
            );
        }catch(err){
            console.error(err);
            return [];
        }
    }

    async deleteForContent(content_id: number): Promise<boolean>{
        try{
            const query = `
                DELETE FROM trivia 
                WHERE content_id = ?
            `;

            const [result] = await db.execute<ResultSetHeader>(query, [content_id]);
            return result.affectedRows > 0;
        }catch(err){
            console.error(err);
            return false;
        }
    }
}
