import { Ocjena } from "../../models/Ocjena";

export interface IOcjeneRepository {

    /**
     * @param content_id
     * @param user_id
     * @param ocjena 
     * @returns
     */
    dodajOcjenu(content_id:number, user_id: number, ocjena:number): Promise<Ocjena>;

    /**
     * @param content_id
     * @param user_id
     * @returns
     */
    getUserOcjena(content_id:number, user_id: number ): Promise<Ocjena | null>;
}