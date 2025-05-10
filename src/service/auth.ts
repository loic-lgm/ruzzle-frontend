import axios from 'axios';
import { LoginData, LoginResponse } from '@/types/auth';

export const loginFn = async (data: LoginData): Promise<LoginResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/users/login/`,
    data
  );
  return response.data;
};
