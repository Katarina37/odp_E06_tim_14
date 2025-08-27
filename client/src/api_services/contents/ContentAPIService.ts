import axios from "axios";
import type { ContentDto } from "../../models/contents/ContentDto";
import type { IContentAPIService } from "./IContentAPIService";
import type { ContentFilterParameters } from "../../types/contents/ContentFilterParameters";


const API_URL: string = import.meta.env.VITE_API_URL + "content";

export const contentApi: IContentAPIService = {
    async getAllContent(): Promise<ContentDto[]> {
        try {
            const res = await axios.get<ContentDto[]>(`${API_URL}`);

            return res.data;
        } catch (err){
            console.error(err);
            return [];
        }
    },

    async getContentById(content_id: number): Promise<ContentDto> {
        try {
            const res = await axios.get<ContentDto>(`${API_URL}/${content_id}`);

            return res.data;
        } catch (err) {
            console.error(err);
            throw new Error("Sadrzaj nije pronadjen");
        }
    },

    async getContentByFilter(params: ContentFilterParameters): Promise<ContentDto[]> {
        try {
            const res = await axios.get<ContentDto[]>(`${API_URL}/korisnik/filter`, {
                params,
            });

            return res.data;
        } catch (err) {
            console.error(err);
            return[];
        }
    },
};