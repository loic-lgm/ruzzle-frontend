import { create } from 'zustand';

type ModalStore = {
  isOpen: boolean;
  open: (tab?: 'login' | 'signup') => void;
  close: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
