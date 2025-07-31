import { create } from 'zustand';

type SwapModalStore = {
  isOpen: boolean;
  open: (tab?: 'login' | 'signup') => void;
  close: () => void;
};

export const useSwapModalStore = create<SwapModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
