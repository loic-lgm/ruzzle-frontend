import { User } from '@/types/user';
import api from '@/utils/apiClient';

export const fetchUser = async (): Promise<User> => {
  const res = await api.get(`${import.meta.env.VITE_API_URL}/users/ne`);
  return res.data;
};
