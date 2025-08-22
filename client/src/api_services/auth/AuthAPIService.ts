import type { AuthResponse } from "../../types/auth/AuthResponse";
import type { IAuthAPIService } from "./IAuthAPIService";
import axios from "axios";

const API_URL: string = import.meta.env.VITE_API_URL + "auth";

export const authApi: IAuthAPIService = {
  async prijava(username: string, lozinka: string): Promise<AuthResponse> {
    console.log("priprema requesta na ", `${API_URL}/login`);
    console.log("payload: ", {username, lozinka});
    try {
      const res = await axios.post<AuthResponse>(`${API_URL}/login`, { username, lozinka });
      const {token, user} = res.data;

      // sada res.data.data je JWT string
      /*console.log("axios odg", res);
      console.log("res data", res.data);
      console.log("token", token);*/

      return {
        success: res.data.success,
        message: res.data.message,
        token,
        user,
      };
    } catch (error) {
      let message = "Greška prilikom prijave.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      return { success: false, message, token: undefined, user: undefined };
    }
  },

  async registracija(username: string, lozinka: string, uloga: string): Promise<AuthResponse> {
    try {
      const res = await axios.post<AuthResponse>(`${API_URL}/register`, { username, lozinka, uloga });
      const {token, user} = res.data;

      return { 
        success: res.data.success, 
        message: res.data.message, 
        token,
        user,
      };
    } catch (error) {
      let message = "Greška prilikom registracije.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      return { success: false, message, token: undefined, user:undefined };
    }
  },
};
