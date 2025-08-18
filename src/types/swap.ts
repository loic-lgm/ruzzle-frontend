import { Puzzle } from '@/types/puzzle';
import { User } from '@/types/user';

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
  requester: User;
  created: string;
  conversation_id: number
};

export type SwapRow = {
  id: number;
  user: {
    avatar: string;
    username: string;
  };
  puzzle: {
    image: string;
    pieceCount: number;
  };
  forPuzzle: {
    image: string;
    pieceCount: number;
  };
  date: string;
  status: string;
  conversationId: number;
};

export type SwapType = 'sent' | 'received' | 'completed';

export type SwapStatus = 'pending' | 'accepted' | 'denied';
