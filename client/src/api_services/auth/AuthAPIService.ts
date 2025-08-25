import axios from "axios";
import type { IAuthAPIService } from "./IAuthAPIService";
import type { AuthResponse } from "../../types/auth/AuthResponse";

const API_URL: string = import.meta.env.VITE_API_URL + "auth";

export const authApi: IAuthAPIService = {
  async prijava(username:string, lozinka: string): Promise<AuthResponse> {
    try {
      const res = await axios.post<AuthResponse>(`${API_URL}/login`, {username, lozinka});
      return res.data;
    } catch (error) {
      let message = "Greska prilikom prijave";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      return {
        success: false,
        message,
        data: undefined,
      };

    }
  },

  async registracija(username:string, uloga: string, lozinka: string): Promise<AuthResponse> {
    try {
      const res = await axios.post<AuthResponse>(`${API_URL}/register`, {username, uloga, lozinka});

      return res.data;
    } catch (error) {
      let message = "Грешка приликом пријаве.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      return {
        success: false,
        message,
        data: undefined,
      };

    }
  }
};
