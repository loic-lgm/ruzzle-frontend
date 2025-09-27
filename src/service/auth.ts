import api from '@/utils/apiClient';
import {
  LoginData,
  LoginResponse,
  SignupData,
  SignupResponse,
} from '@/types/auth';
import { ActivateUserResponse, ForgotPasswordResponse } from '@/types/auth';
import { User } from '@/types/user';

export const fetchUser = async (): Promise<User> => {
  const res = await api.get(`${import.meta.env.VITE_API_URL}/auth/me/`);
  return res.data;
};

export const loginFn = async (data: LoginData): Promise<LoginResponse> => {
  const response = await api.post(
    `${import.meta.env.VITE_API_URL}/auth/login/`,
    data
  );
  return response.data;
};

export const logoutFn = async (): Promise<LoginResponse> => {
  const response = await api.post(
    `${import.meta.env.VITE_API_URL}/auth/logout/`
  );
  return response.data;
};

export const signupFn = async (data: SignupData): Promise<SignupResponse> => {
  const response = await api.post(
    `${import.meta.env.VITE_API_URL}/auth/register/`,
    data
  );
  return response.data;
};

export const forgotPassword = async (
  email: string
): Promise<ForgotPasswordResponse> => {
  const res = await api.post(
    `${import.meta.env.VITE_API_URL}/auth/forgot-password/`,
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
    `${import.meta.env.VITE_API_URL}/auth/reset-password/${uuid}/${token}/`,
    { password }
  );
  return res.data;
};

export const validateUser = async (
  uuid: string,
  token: string
): Promise<ActivateUserResponse> => {
  const res = await api.post(
    `${import.meta.env.VITE_API_URL}/auth/activate/${uuid}/${token}/`
  );
  return res.data;
};
