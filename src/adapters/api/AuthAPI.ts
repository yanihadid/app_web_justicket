import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const AuthAPI = {
    signup: async (data: { name: string; email: string; password: string ; role: string; provider: string }) => {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
            ...data,
            provider: 'local'
          });
          console.log('Response complète:', response);
          return response.data;
        } catch (error) {
          console.error('Signup failed:', error);
          throw error;
        }
      },

  signin: async (data: { email: string; password: string }) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
    return response.data; 
  },

  logout: async () => {
    const response = await axios.post(`${API_BASE_URL}/auth/logout`);
    return response.data;
  }
};
