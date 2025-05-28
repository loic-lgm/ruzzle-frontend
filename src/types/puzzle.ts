import { Category } from '@/types/category';

export interface Puzzle {
  id: string;
  title: string;
  image: string;
  piece_count: number;
  category: Category;
  brand: string;
  city?: string;
}

export type Puzzles = [Puzzle];

export interface FilterTypes {
  category: string;
  pieceCount: string;
  brand: string;
  city: string;
}

export type PieceCount = {
  id: number;
  name: string;
};
