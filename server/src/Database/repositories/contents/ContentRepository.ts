import { IContentRepository } from "../../../Domain/repositories/contents/IContentRepository";
import { Content } from "../../../Domain/models/Content";
import { RowDataPacket } from "mysql2";
import db from "../../connection/DbConnectionPool";


export class ContentRepository implements IContentRepository {
    async  getById(content_id: number): Promise<Content> {
        try {
            const query = 
            `SELECT * FROM content WHERE content_id = ?
            `;

            const [rows] = await db.execute<RowDataPacket[]>(query, [content_id]);

            if(rows.length > 0) {
                const row = rows[0];
                return new Content(row.content_id, row.naziv, row.tip, row.opis, row.datum_izlaska, row.cover_slika, row.zanr);
            }

            return new Content();
        } catch (err){
            console.log(err);
            return new Content();
        }
    }

    async  getByNaziv(naziv: string): Promise<Content> {
        try {
            const query = 
            `SELECT * FROM content WHERE naziv = ?
            `;

            const [rows] = await db.execute<RowDataPacket[]>(query, [naziv]);

            if(rows.length > 0) {
                const row = rows[0];
                return new Content(row.content_id, row.naziv, row.tip, row.opis, row.datum_izlaska, row.cover_slika, row.zanr);
            }

            return new Content();

        } catch (err) {
            console.log(err);
            return new Content();
        }
    }

    async  getByTip(tip: string): Promise<Content> {
        try {
            const query = 
            `SELECT * FROM content WHERE naziv = ?
            `;

            const [rows] = await db.execute<RowDataPacket[]>(query, [tip]);

            if(rows.length > 0) {
                const row = rows[0];
                return new Content(row.content_id, row.naziv, row.tip, row.opis, row.datum_izlaska, row.cover_slika, row.zanr);
            }

            return new Content();
        } catch (err) {
            console.log(err);
            return new Content();
        }
    }

    async getAll(): Promise<Content[]> {
        try {
            const query = 
            `SELECT * FROM content ORDER BY content_id ASC
            `;

            const [rows] = await db.execute<RowDataPacket[]>(query);

            return rows.map(
                (row) => new Content(row.content_id, row.naziv, row.tip, row.opis, row.datum_izlaska, row.cover_slika, row.zanr)
            );
        } catch (err) {
            console.log(err);
            return [];
        }
    }
}