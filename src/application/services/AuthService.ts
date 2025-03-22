import { AuthAPI } from "../../adapters/api/AuthAPI";

export const AuthService = {
  register: async (name: string, email: string, password: string) => {
    return await AuthAPI.signup({ name, email, password });
  },

  login: async (email: string, password: string) => {
    return await AuthAPI.signin({ email, password });
  },

  logout: async () => {
    return await AuthAPI.logout();
  }
};
