import { FilterTypes, Puzzles } from '@/types/puzzle';
import api from '@/utils/apiClient';

export const fetchPuzzles = async (
  filters: Partial<FilterTypes> = {}
): Promise<Puzzles> => {
  const searchParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
      searchParams.append(key, value);
  });
  const response = await api.get(`${import.meta.env.VITE_API_URL}/puzzles/?${searchParams}`);
  return response.data;
};
