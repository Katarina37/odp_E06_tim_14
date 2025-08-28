import type { OcjenaDto } from "../../models/ratings/OcjenaDto";

export interface IOcjenaAPIService {
    addOcjena(content_id: number, ocjena: number, token: string): Promise<OcjenaDto>;
    updateOcjena(content_id: number, ocjena: number, token: string): Promise<OcjenaDto>;
    getUserRate(content_id: number, token: string): Promise<OcjenaDto | null>
}
