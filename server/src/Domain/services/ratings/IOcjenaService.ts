import { OcjenaDto } from "../../DTOs/ratings/OcjenaDto";

export interface IOcjenaService {
    /**
         * @param content_id
         * @param user_id
         * @param ocjena
         */
        addOcjena(content_id:number, user_id: number, ocjena: number): Promise<OcjenaDto>;
    
        /**
         * @param content_id
         * @param user_id
         */
        getByContentAndUser(content_id: number, user_id: number) : Promise<OcjenaDto | null>;
    
        /**
         * @param content_id
         * @param user_id
         * @param ocjena
         */
        updateOcjena(content_id:number, user_id:number, ocjena: number): Promise<OcjenaDto>;
}