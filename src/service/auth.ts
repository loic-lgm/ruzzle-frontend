import api from '@/utils/apiClient';
import { LoginData, LoginResponse, SignupData, SignupResponse } from '@/types/auth';

export const loginFn = async (data: LoginData): Promise<LoginResponse> => {
  const response = await api.post(
    `${import.meta.env.VITE_API_URL}/users/login/`,
    data
  );
  return response.data;
};


export const signupFn = async (data: SignupData): Promise<SignupResponse> => {
  const response = await api.post(
    `${import.meta.env.VITE_API_URL}/users/register/`,
    data
  );
  return response.data;
}