import api from '@/utils/apiClient';
import { LoginData, LoginResponse } from '@/types/auth';

export const loginFn = async (data: LoginData): Promise<LoginResponse> => {
  const response = await api.post(
    `${import.meta.env.VITE_API_URL}/users/login/`,
    data
  );
  return response.data;
};
