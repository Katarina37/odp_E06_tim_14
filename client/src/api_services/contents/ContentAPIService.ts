import axios from "axios";
import type { ContentDto } from "../../models/contents/ContentDto";
import type { IContentAPIService } from "./IContentAPIService";



const API_URL: string = import.meta.env.VITE_API_URL + "content";

export const contentApi: IContentAPIService = {
    async getAllContent(): Promise<ContentDto[]> {
        try {
            const res = await axios.get<ContentDto[]>(`${API_URL}`);

            return res.data;
        } catch (err){
            console.log(err);
            return [];
        }
    },
};