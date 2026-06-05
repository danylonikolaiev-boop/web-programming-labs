import api from './axios';
import type { User } from '../store/authStore';

export interface AuthData {
  email: string;
  password: string;
}

export const authApi = {
  register: async (data: AuthData) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
  
  login: async (data: AuthData) => {
    const response = await api.post<{ access_token: string }>('/auth/login', data);
    return response.data;
  },
  
  getMe: async () => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  }
};