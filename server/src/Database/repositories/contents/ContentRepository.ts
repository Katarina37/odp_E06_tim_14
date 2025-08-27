import { IContentRepository } from "../../../Domain/repositories/contents/IContentRepository";
import { Content } from "../../../Domain/models/Content";
import { RowDataPacket } from "mysql2";
import db from "../../connection/DbConnectionPool";
import { ContentFilterParameters } from "../../../Domain/types/ContentFilterParameters";

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

    async getFilter(params: ContentFilterParameters): Promise<Content[]> {
    try {
        let query = `
            SELECT c.content_id, c.naziv, c.tip, c.opis, c.datum_izlaska, 
                   c.cover_slika, c.zanr, ROUND(AVG(o.ocjena), 2) AS prosjecna_ocjena,
            (
                SELECT CONCAT('[', GROUP_CONCAT(JSON_QUOTE(opis)), ']')
                FROM (SELECT DISTINCT opis FROM trivia t2 WHERE t2.content_id = c.content_id) AS t_dist
            ) AS trivia_opis
            FROM content c
            LEFT JOIN ocjena o ON o.content_id = c.content_id
        `;

        const conditions: string[] = [];
        const values: (string | number)[] = [];

        if (params.tip) {
            conditions.push("c.tip = ?");
            values.push(params.tip);
        }

        if (params.naziv) {
            conditions.push("c.naziv LIKE ?");
            values.push(`%${params.naziv}%`);
        }


        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }

        query += " GROUP BY c.content_id, c.naziv, c.tip, c.opis, c.datum_izlaska, c.cover_slika, c.zanr";

        if (params.sortBy) {
            const allowedSortColumns = ['naziv', 'tip', 'datum_izlaska', 'zanr', 'prosjecna_ocjena'];
            const sortColumn = allowedSortColumns.includes(params.sortBy) ? params.sortBy : 'naziv';
            
            const order = params.sortOrder?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
            query += ` ORDER BY ${sortColumn} ${order}`;
        }
        
        const [rows] = await db.execute<RowDataPacket[]>(query, values);

        return rows.map((row: any) => 
            new Content(
                row.content_id,
                row.naziv,
                row.tip,
                row.opis,
                row.datum_izlaska,
                row.cover_slika,
                row.zanr,
                row.prosjecna_ocjena,
                row.trivia_opis ? JSON.parse(row.trivia_opis) : []
            )
        );

    } catch (err) {
        console.error('Error in getFilter:', err);
        return [];
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