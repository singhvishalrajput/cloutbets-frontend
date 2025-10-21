// src/store/useThemeStore.js
import { create } from 'zustand';

const useThemeStore = create((set, get) => ({
  isDarkMode: false,
  
  applyThemeVariables: (isDark) => {
    const root = document.documentElement;
    if (isDark) {
      root.style.setProperty('--bg-primary', '#111827'); // gray-900
      root.style.setProperty('--bg-secondary', '#1f2937'); // gray-800
      root.style.setProperty('--text-primary', '#f9fafb'); // gray-50
      root.style.setProperty('--text-secondary', '#d1d5db'); // gray-300
      root.style.setProperty('--border-color', '#374151'); // gray-700
      root.style.setProperty('--card-bg', 'rgba(31, 41, 55, 0.6)'); // gray-800/60
      root.style.setProperty('--nav-bg', 'rgba(17, 24, 39, 0.8)'); // gray-900/80
      root.style.setProperty('--nav-scrolled-bg', 'rgba(17, 24, 39, 0.4)'); // gray-900/40
    } else {
      root.style.setProperty('--bg-primary', '#ffffff');
      root.style.setProperty('--bg-secondary', '#f9fafb');
      root.style.setProperty('--text-primary', '#111827');
      root.style.setProperty('--text-secondary', '#6b7280');
      root.style.setProperty('--border-color', '#e5e7eb');
      root.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.6)');
      root.style.setProperty('--nav-bg', 'rgba(255, 255, 255, 0.8)');
      root.style.setProperty('--nav-scrolled-bg', 'rgba(255, 255, 255, 0.4)');
    }
  },

  toggleTheme: () => {
    const newDarkMode = !get().isDarkMode;
    set({ isDarkMode: newDarkMode });
    get().applyThemeVariables(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  },
  
  initTheme: () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    set({ isDarkMode: !!isDark });
    get().applyThemeVariables(!!isDark);
  }
}));

export default useThemeStore;