export interface Puzzle {
  id: string;
  title: string;
  image: string;
  pieceCount: number;
  category: string;
  brand: string;
  city?: string;
}

export interface FilterTypes {
  categories: string[];
  pieceCount: string[];
  brands: string[];
  cities?: string[];
}

export type PieceCount = {
  id: number;
  name: string;
};
