import { IOcjeneRepository } from "../../../Domain/repositories/ratings/IOcjeneRepository";
import { Ocjena } from "../../../Domain/models/Ocjena";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import db from "../../connection/DbConnectionPool";


export class OcjeneRepository implements IOcjeneRepository {

    async dodajOcjenu(content_id: number, user_id: number, ocjena: number): Promise<Ocjena> {
        try{
            const query =
             `INSERT INTO ocjena (content_id, user_id, ocjena) 
              VALUES (?, ?, ?)
            `;

            const [result] = await db.execute<ResultSetHeader>(query, [content_id, user_id, ocjena]);

            if(result.insertId){
                return new Ocjena(result.insertId, content_id, user_id, ocjena);
            }

            return new Ocjena();
        } catch {
            return new Ocjena();
        }
    }

    async getUserOcjena(content_id: number, user_id: number): Promise<Ocjena | null> {
        try {
            const query =
             `SELECT ocjena
              FROM ocjena
              WHERE content_id = ? AND user_id = ?
             `;

            const [rows] = await db.execute<RowDataPacket[]>(query, [content_id, user_id]);

            if(rows.length > 0){
                return rows[0].ocjena;
            }

            return null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
