import { City } from '@/types/city';
import { Puzzle } from '@/types/puzzle';

export interface User {
  id: number;
  username: string;
  email: string;
  city?: City;
  first_name?: string | null;
  image?: string;
  last_name?: string | null;
  created_at?: string;
  puzzles?: Puzzle[];
}

export interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export interface ActivateUserResponse {
  message?: string;
  error?: string;
}

export interface ForgotPasswordResponse {
  message?: string;
  error?: string;
}
