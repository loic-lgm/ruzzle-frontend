import { City } from '@/types/city';

export interface User {
  id: number;
  username: string;
  email: string;
  city?: City;
  first_name?: string;
  image?: string;
  last_name?: string;
}

export interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}
