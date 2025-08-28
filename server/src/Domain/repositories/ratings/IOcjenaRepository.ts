import { Ocjena } from "../../models/Ocjena";

export interface IOcjenaRepository {

    /**
     * @param ocjena
     */
    create(ocjena: Ocjena): Promise<Ocjena>;

    /**
     * @param content_id
     * @param user_id
     */
    getByContentAndUser(content_id: number, user_id: number) : Promise<Ocjena | null>;

    /**
     * @param ocjena
     */
    updateOcjena(ocjena: Ocjena): Promise<Ocjena>;
}
