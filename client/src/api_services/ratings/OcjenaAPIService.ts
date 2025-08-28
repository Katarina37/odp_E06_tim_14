import axios from "axios";
import type { IOcjenaAPIService } from "./IOcjenaAPIService";
import type { OcjenaDto } from "../../models/ratings/OcjenaDto";


const API_URL: string = import.meta.env.VITE_API_URL + "ocjena";

export const ocjenaApi : IOcjenaAPIService = {
    async addOcjena(content_id: number, ocjena: number, token: string): Promise<OcjenaDto> {
        try {
            const res = await axios.post(API_URL, {content_id, ocjena}, { headers: {Authorization: `Bearer ${token}`}});

            return res.data;
        } catch (err) {
            console.error(err);
            throw new Error("Ocjena nije dostupna");
        }
    },

    async updateOcjena(content_id: number, ocjena: number, token: string): Promise<OcjenaDto> {
        try {
            const res = await axios.put(API_URL, {content_id, ocjena}, { headers: {Authorization: `Bearer ${token}`}});
            
            return res.data;
        } catch (err){
            console.error(err);
            throw new Error("Greska prilikom unosa ocjene");
        }
    },

        async getUserRate(content_id: number, token: string): Promise<OcjenaDto | null> {
        try {
            const res = await axios.get<OcjenaDto | null>(`${API_URL}/${content_id}/userrate`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            return res.data;
        } catch (err) {
            console.error(err);
            return null;
        }
    },
}



