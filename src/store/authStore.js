import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: true,
  user: null,
  loading: false,
  error: null,

  login: (userData) => {
    set({ isAuthenticated: true, user: userData, error: null });
  },

  signup: (userData) => {
    set({ isAuthenticated: true, user: userData, error: null });
  },

  logout: () => {
    set({ isAuthenticated: false, user: null });
  },

  setError: (error) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  }
}));

export default useAuthStore;