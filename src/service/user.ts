import { Swap } from '@/types/swap';
import {
  ActivateUserResponse,
  ForgotPasswordResponse,
  User,
} from '@/types/user';
import api from '@/utils/apiClient';

export const fetchUser = async (): Promise<User> => {
  const res = await api.get(`${import.meta.env.VITE_API_URL}/users/me/`);
  return res.data;
};

export const fetchUserByUsername = async (username: string): Promise<User> => {
  const res = await api.get(
    `${import.meta.env.VITE_API_URL}/users/profile/${username}/`
  );
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

export const fetchReceivedSwapsByUser = async (
  userId: number
): Promise<Swap[]> => {
  const res = await api.get(
    `${import.meta.env.VITE_API_URL}/users/${userId}/requested-exchanges/`
  );
  return res.data;
};

export const fetchSentSwapsByUser = async (userId: number): Promise<Swap[]> => {
  const res = await api.get(
    `${import.meta.env.VITE_API_URL}/users/${userId}/requester-exchanges/`
  );
  return res.data;
};

export const forgotPassword = async (
  email: string
): Promise<ForgotPasswordResponse> => {
  const res = await api.post(
    `${import.meta.env.VITE_API_URL}/users/forgot-password/`,
    { email }
  );
  return res.data;
};

export const resetPassword = async (
  uuid: string,
  token: string,
  password: string
): Promise<ForgotPasswordResponse> => {
  const res = await api.post(
    `${import.meta.env.VITE_API_URL}/users/reset-password/${uuid}/${token}/`,
    { password }
  );
  return res.data;
};

export const validateUser = async (
  uuid: string,
  token: string
): Promise<ActivateUserResponse> => {
  const res = await api.post(
    `${import.meta.env.VITE_API_URL}/users/activate/${uuid}/${token}/`
  );
  return res.data;
};

export const fetchCompletedSwapsByUser = async (
  userId: number
): Promise<Swap[]> => {
  const res = await api.get(
    `${import.meta.env.VITE_API_URL}/users/${userId}/completed-exchanges/`
  );
  return res.data;
};

export const searchUser = async (search: string): Promise<User[]> => {
  const res = await api.get(
    `${import.meta.env.VITE_API_URL}/users/search/?q=${search}`
  );
  return res.data;
};
