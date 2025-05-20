export interface User {
  id: number;
  username: string;
  email: string;
  // Ajoute d'autres champs si besoin
}

export interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}