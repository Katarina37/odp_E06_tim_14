import { IEpisodeRepository } from "../../../Domain/repositories/episodes/IEpisodeRepository";
import { Epizoda } from "../../../Domain/models/Epizoda";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../../connection/DbConnectionPool";


export class EpisodeRepository implements IEpisodeRepository {

    async getById(episode_id: number, content_id: number): Promise<Epizoda> {
        try {
            const query = 
            `SELECT *
            FROM epizode 
            WHERE episode_id = ? 
            `;

            const [rows] = await db.execute<RowDataPacket[]>(query, [episode_id, content_id]);

            if(rows.length > 0) {
                const row = rows[0];

                return new Epizoda(row.episode_id, row.content_id, row.sezona, row.broj_epizode, row.naziv_epizode, row.opis_epizode, row.cover_slika);
            }

            return new Epizoda();
        } catch (err) {
            console.log(err);
            return new Epizoda();
        }
    }

    async getAll(content_id: number): Promise<Epizoda[]> {
        try {
            const query = 
            `SELECT *
            FROM epizode 
            WHERE content_id = ?
            ORDER BY sezona, broj_epizode
            `;

            const [rows] = await db.execute<RowDataPacket[]>(query, [content_id]);

            return rows.map(
                (row) => new Epizoda(row.episode_id, row.content_id, row.sezona, row.broj_epizode, row.naziv_epizode, row.opis_epizode, row.cover_slika)
            );
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async create(epizoda: Epizoda): Promise<Epizoda>{
        try{
            const query = `
                INSERT INTO epizode (content_id, sezona, broj_epizode, naziv_epizode, opis_epizode, cover_slika)
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            const [result] = await db.execute<ResultSetHeader>(query, [
                epizoda.content_id,
                epizoda.sezona,
                epizoda.broj_epizode,
                epizoda.naziv_epizode,
                epizoda.opis_epizode,
                epizoda.cover_slika
            ]);

            if(result.insertId){
                return new Epizoda(
                    result.insertId,
                    epizoda.content_id,
                    epizoda.sezona,
                    epizoda.broj_epizode,
                    epizoda.naziv_epizode,
                    epizoda.opis_epizode,
                    epizoda.cover_slika
                );
            }
            return new Epizoda();
        }catch(err){
            console.error(err);
            return new Epizoda();
        }
    }

    async deleteForContent(content_id: number): Promise<boolean>{
        try{
            const query = `
                DELETE FROM epizode 
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
