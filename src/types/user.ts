import { Puzzle } from '@/types/puzzle';

export interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string | null;
  image?: string;
  last_name?: string | null;
  created_at?: string;
  puzzles?: Puzzle[];
  latitude: number;
  longitude: number;
  city_name: string;
  postal_code: string;
  rating: number;
}

export interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}
