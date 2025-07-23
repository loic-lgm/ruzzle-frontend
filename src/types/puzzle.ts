import { Category } from '@/types/category';
import { User } from '@/types/user';

export interface Puzzle {
  id: string;
  title: string;
  image: string;
  piece_count: number;
  category: Category;
  brand: string;
  owner: User;
}

export type Puzzles = [Puzzle];

export interface FilterTypes {
  category: string;
  pieceCount: string;
  brand: string;
  city: string;
  condition?: string;
}

export type PieceCount = {
  id: number;
  name: string;
};

export type Condition = {
  id: string;
  name: string;
};
