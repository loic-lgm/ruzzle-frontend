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
  rating: number;
}

export interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}
