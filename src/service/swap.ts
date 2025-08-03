import { Puzzle } from '@/types/puzzle';
import { SwapPuzzleData, SwapStatus } from '@/types/swap';
import api from '@/utils/apiClient';

export const swapPuzzle = async (data: SwapPuzzleData): Promise<Puzzle> => {
  const response = await api.post(
    `${import.meta.env.VITE_API_URL}/exchanges/`,
    data
  );
  return response.data;
};

export const updateSwap = async ({
  payload,
  exchangeId,
}: {
  payload: SwapStatus;
  exchangeId: number;
}): Promise<Puzzle> => {
  const response = await api.patch(
    `${import.meta.env.VITE_API_URL}/exchanges/${exchangeId}/`,
    { status: payload }
  );
  return response.data;
};
