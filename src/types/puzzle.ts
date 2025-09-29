import { Brand } from '@/types/brand';
import { Category } from '@/types/category';
import { User } from '@/types/user';

export interface Puzzle {
  id: string;
  title: string;
  image: string;
  piece_count: number;
  category: Category;
  brand: Brand;
  owner: User;
  condition?: string;
  created?: string;
  hashid?: string;
  status?: string;
  height?: number | null;
  width?: number | null;
}

export type Puzzles = Puzzle[];

export interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Puzzle[];
}

export interface FilterTypes {
  category: string;
  pieceCount: string;
  brand: string;
  city: string;
  condition?: string;
  page?: number;
}

export type PieceCount = {
  id: number;
  name: string;
};

export type Condition = {
  id: string;
  name: string;
};

export type PublishOrEditPuzzleData = {
  category_id: number;
  brand_id: number;
  piece_count: number;
  condition: string;
  image?: File | null;
  owner: number;
  height?: number | null;
  width?: number | null;
};

export type PublishPuzzleResponse = {
  puzzle: Puzzle;
};
