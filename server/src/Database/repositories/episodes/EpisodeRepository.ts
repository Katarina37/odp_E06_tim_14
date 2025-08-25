import { IEpisodeRepository } from "../../../Domain/repositories/episodes/IEpisodeRepository";
import { Epizoda } from "../../../Domain/models/Epizoda";
import { RowDataPacket } from "mysql2";
import db from "../../connection/DbConnectionPool";


export class EpisodeRepository implements IEpisodeRepository {

    async getById(episode_id: number, content_id: number): Promise<Epizoda> {
        try {
            const query = 
            `SELECT e.episode_id, e.content_id, e.sezona, e.broj_epizode, e.naziv_epizode, e.opis_epizode, e.cover_slika
            FROM epizode e
            LEFT JOIN content c ON c.content_id = e.content_id
            WHERE episode_id = ? AND e.content_id = ?
            GROUP BY e.episode_id
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
            `SELECT e.episode_id, e.content_id, e.sezona, e.broj_epizode, e.naziv_epizode, e.opis_epizode, e.cover_slika
            FROM epizode e
            LEFT JOIN content c ON c.content_id = e.content_id
            WHERE e.content_id = ?
            GROUP BY e.episode_id
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
}
