import { create } from 'zustand';

type AuthModalStore = {
  isOpen: boolean;
  activeTab: 'login' | 'signup';
  open: (tab?: 'login' | 'signup') => void;
  close: () => void;
  switchTab: (tab: 'login' | 'signup') => void;
};

export const useAuthModalStore = create<AuthModalStore>((set) => ({
  isOpen: false,
  activeTab: 'login',
  open: (tab) => set({ isOpen: true, activeTab: tab || 'login' }),
  close: () => set({ isOpen: false }),
  switchTab: (tab) => set({ activeTab: tab }),
}));
