import { create } from 'zustand';

export interface User {
  id: string;
  email: string;
  createdAt?: string; 
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  login: (token, user) => {
    localStorage.setItem('token', token);
    set({ user, isLoading: false });
  },
  
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, isLoading: false });
  },
  
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
}));