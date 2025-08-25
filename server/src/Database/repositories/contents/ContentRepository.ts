import { IContentRepository } from "../../../Domain/repositories/contents/IContentRepository";
import { Content } from "../../../Domain/models/Content";
import { RowDataPacket } from "mysql2";
import db from "../../connection/DbConnectionPool";


export class ContentRepository implements IContentRepository {
    async  getById(content_id: number): Promise<Content> {
        try {
            const query = 
            `SELECT c.content_id, c.naziv, c.tip, c.opis, c.datum_izlaska, c.cover_slika, c.zanr, ROUND(AVG(o.ocjena), 2) AS prosjecna_ocjena,
            (
            SELECT CONCAT('[', GROUP_CONCAT(JSON_QUOTE(opis)), ']')
            FROM (SELECT DISTINCT opis FROM trivia t2 WHERE t2.content_id = c.content_id) AS t_dist
            ) AS trivia_opis
            FROM content c
            LEFT JOIN ocjena o ON o.content_id = c.content_id
            WHERE c.content_id = ?
            GROUP BY c.content_id;
           `;

            const [rows] = await db.execute<RowDataPacket[]>(query, [content_id]);

            if(rows.length > 0) {
                const row = rows[0];
                const triviaArray = Array.isArray(row.trivia_opis) ? row.trivia_opis : JSON.parse(row.trivia_opis || "[]");

                return new Content(row.content_id, row.naziv, row.tip, row.opis, row.datum_izlaska, row.cover_slika, row.zanr, row.prosjecna_ocjena, triviaArray);
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
            `SELECT c.content_id, c.naziv, c.tip, c.opis, c.datum_izlaska, c.cover_slika, c.zanr, ROUND(AVG(o.ocjena), 2) AS prosjecna_ocjena,
            (
            SELECT CONCAT('[', GROUP_CONCAT(JSON_QUOTE(opis)), ']')
            FROM (SELECT DISTINCT opis FROM trivia t2 WHERE t2.content_id = c.content_id) AS t_dist
            ) AS trivia_opis
            FROM content c
            LEFT JOIN ocjena o ON o.content_id = c.content_id
            WHERE c.naziv = ?
            GROUP BY c.content_id;
           `;

            const [rows] = await db.execute<RowDataPacket[]>(query, [naziv]);

            if(rows.length > 0) {
                const row = rows[0];
                const triviaArray = Array.isArray(row.trivia_opis) ? row.trivia_opis : JSON.parse(row.trivia_opis || "[]");

                return new Content(row.content_id, row.naziv, row.tip, row.opis, row.datum_izlaska, row.cover_slika, row.zanr, row.prosjecna_ocjena, triviaArray);
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
            `SELECT c.content_id, c.naziv, c.tip, c.opis, c.datum_izlaska, c.cover_slika, c.zanr, ROUND(AVG(o.ocjena), 2) AS prosjecna_ocjena,
            (
            SELECT CONCAT('[', GROUP_CONCAT(JSON_QUOTE(opis)), ']')
            FROM (SELECT DISTINCT opis FROM trivia t2 WHERE t2.content_id = c.content_id) AS t_dist
            ) AS trivia_opis
            FROM content c
            LEFT JOIN ocjena o ON o.content_id = c.content_id
            WHERE c.tip = ?
            GROUP BY c.content_id;
           `;

            const [rows] = await db.execute<RowDataPacket[]>(query, [tip]);

            if(rows.length > 0) {
                const row = rows[0];
                const triviaArray = Array.isArray(row.trivia_opis) ? row.trivia_opis : JSON.parse(row.trivia_opis || "[]");

                return new Content(row.content_id, row.naziv, row.tip, row.opis, row.datum_izlaska, row.cover_slika, row.zanr, row.prosjecna_ocjena, triviaArray);
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
            `SELECT c.content_id, c.naziv, c.tip, c.opis, c.datum_izlaska, c.cover_slika, c.zanr, ROUND(AVG(o.ocjena), 2) AS prosjecna_ocjena,
            (
            SELECT CONCAT('[', GROUP_CONCAT(JSON_QUOTE(opis)), ']')
            FROM (SELECT DISTINCT opis FROM trivia t2 WHERE t2.content_id = c.content_id) AS t_dist
            ) AS trivia_opis
            FROM content c
            LEFT JOIN ocjena o ON o.content_id = c.content_id
            GROUP BY c.content_id;
            `;

            const [rows] = await db.execute<RowDataPacket[]>(query);

            return rows.map(
                (row) => new Content(row.content_id, row.naziv, row.tip, row.opis, row.datum_izlaska, row.cover_slika, row.zanr, row.prosjecna_ocjena, JSON.parse(row.trivia_opis || "[]"))
            );
        } catch (err) {
            console.log(err);
            return [];
        }
    }
}