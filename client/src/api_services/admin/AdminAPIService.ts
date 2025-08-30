import axios from "axios";
import type { IAdminAPIService, CreateContentRequest } from "./IAdminAPIService";
import type { ContentDto } from "../../models/contents/ContentDto";

const API_URL: string = import.meta.env.VITE_API_URL + "admin/content";

export const adminApi: IAdminAPIService = {
    async createContent(contentData: CreateContentRequest, token:string): Promise<ContentDto>{
        try{
            const res = await axios.post<ContentDto>(API_URL, contentData, { headers: { Authorization: `Bearer ${token}`}
            });
            return res.data;
        }catch(err){
            console.error(err);
            throw new Error("Greska pri kreiranju sadrzaja");
        }
    },

    async updateContent(content_id: number, contentData: CreateContentRequest, token: string): Promise<ContentDto>{
        try{
            const res = await axios.put<ContentDto>(`${API_URL}/${content_id}`, contentData, {
                headers: { Authorization: `Bearer ${token}`}
            });
            return res.data;
        }catch(err){
            console.error(err);
            throw new Error("Greska pri azuriranju sadrzaja");
        }
    },

    async deleteContent(content_id: number, token:string): Promise<boolean>{
        try{
            await axios.delete(`${API_URL}/${content_id}`, {
                headers: { Authorization: `Bearer ${token}`}
            });
            return true;
        }catch(err){
            console.error(err);
            throw new Error("Greska pri brisanju sadrzaja");
        }
    }
};