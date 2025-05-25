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
  category: string;
  pieceCount: string;
  brand: string;
  city: string;
}

export type PieceCount = {
  id: number;
  name: string;
};
