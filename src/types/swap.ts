import { Puzzle } from '@/types/puzzle';

export type SwapPuzzleData = {
  message: string;
  puzzle_asked_id: number;
  puzzle_proposed_id: number;
};

export type Swap = {
  id: number;
  puzzle_asked: Puzzle;
  puzzle_proposed: Puzzle;
  message: string;
  status: string;
};
