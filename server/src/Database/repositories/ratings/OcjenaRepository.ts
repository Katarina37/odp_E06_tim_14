import { IOcjenaRepository } from "../../../Domain/repositories/ratings/IOcjenaRepository";
import { Ocjena } from "../../../Domain/models/Ocjena";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import db from "../../connection/DbConnectionPool";


export class OcjenaRepository implements IOcjenaRepository {
    async create(ocjena: Ocjena): Promise<Ocjena> {
        try {
            const query =
            `INSERT INTO ocjena (content_id, user_id, ocjena)
            VALUES (?, ?, ?)
            `;

            const [result] = await db.execute<ResultSetHeader>(query, [
                ocjena.content_id,
                ocjena.user_id,
                ocjena.ocjena,
            ]);

            if(result.insertId){
                return new Ocjena(result.insertId, ocjena.content_id, ocjena.user_id, ocjena.ocjena);
            }

            return new Ocjena();
        } catch {
            return new Ocjena();
        }
    }

    async getByContentAndUser(content_id: number, user_id: number): Promise<Ocjena | null> {
        try {
            const query =
            `SELECT *
            FROM ocjena
            WHERE content_id = ? AND user_id = ?
            `;

            const [rows] = await db.execute<RowDataPacket[]>(query, [content_id, user_id]);

            if(rows.length > 0) {
                const row = rows[0];
                return new Ocjena(row.rating_id, row.content_id, row.user_id, row.ocjena);
            }

            return null;
        } catch {
            return null;
        }
    }

    async updateOcjena(ocjena: Ocjena): Promise<Ocjena> {
        try {
            const query = 
            `UPDATE ocjena
            SET ocjena = ?
            WHERE content_id = ? AND user_id = ?
            `;

            const [result] = await db.execute<ResultSetHeader>(query, [
                ocjena.ocjena,
                ocjena.content_id,
                ocjena.user_id
            ]);

            if(result.affectedRows > 0) {
                return ocjena;
            }

            return new Ocjena();
        } catch {
            return new Ocjena();
        }
    }

    async getAverage(content_id: number): Promise<number | null> {
    try {
        const query = `
            SELECT AVG(ocjena) as avgOcjena
            FROM ocjena
            WHERE content_id = ?
        `;

        const [rows] = await db.execute<RowDataPacket[]>(query, [content_id]);

        if (rows.length > 0 && rows[0].avgOcjena !== null) {
            return Number(rows[0].avgOcjena);
        }

        return null;
    } catch (err) {
        console.error(err);
        return null;
    }
}

}