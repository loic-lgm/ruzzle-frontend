import { create } from 'zustand';
import { UserStore } from '@/types/user';

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useUserStore;
