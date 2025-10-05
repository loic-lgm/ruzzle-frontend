import { fetchRandomPuzzles } from '@/service/puzzle';
import { useQuery } from '@tanstack/react-query';

export const useRandomPuzzles = () => {
  return useQuery({
    queryKey: ['random-puzzles'],
    queryFn: fetchRandomPuzzles,
    refetchOnWindowFocus: true,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
