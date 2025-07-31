import { Puzzle } from '@/types/puzzle';
import { SwapPuzzleData } from '@/types/swap';
import api from '@/utils/apiClient';

export const swapPuzzle = async (data: SwapPuzzleData): Promise<Puzzle> => {
  const response = await api.post(
    `${import.meta.env.VITE_API_URL}/exchanges/`,
    data
  );
  return response.data;
};
