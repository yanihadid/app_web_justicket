import { AuthAPI } from "../../adapters/api/AuthAPI";
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const AuthService = {
  register: async (name: string, email: string, password: string, role: string = "Admin") => {
    return await AuthAPI.signup({ name, email, password, role, provider: 'local' });
  },  

  login: async (email: string, password: string) => {
    return await AuthAPI.signin({ email, password });
  },

  logout: async () => {
    return await AuthAPI.logout();
  },

  getProfile: async () => {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Token manquant");

    const response = await axios.get(`${API_BASE_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
};
