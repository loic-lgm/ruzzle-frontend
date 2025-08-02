import { User } from '@/types/user';
import api from '@/utils/apiClient';

export const fetchUser = async (): Promise<User> => {
  const res = await api.get(`${import.meta.env.VITE_API_URL}/users/me/`);
  return res.data;
};

export const updateUser = async ({
  userId,
  payload,
}: {
  userId: number;
  payload: Partial<User>;
}): Promise<User> => {
  const res = await api.put(
    `${import.meta.env.VITE_API_URL}/users/${userId}/`,
    payload
  );
  return res.data;
};
