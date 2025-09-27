import { User } from '@/types/user';

export type LoginData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};

export type SignupData = {
  email: string;
  username: string;
  password: string;
  city_id: string;
  image: string;
  first_name: string;
  last_name: string;
};

export type SignupResponse = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  image: string;
  city: string;
};

export interface ActivateUserResponse {
  message?: string;
  error?: string;
}

export interface ForgotPasswordResponse {
  message?: string;
  error?: string;
}
