import { fetchPuzzle } from '@/service/puzzle';
import { useQuery } from '@tanstack/react-query';

export const usePuzzle = (hashid: string) => {
  return useQuery({
    queryKey: ['puzzle', hashid],
    queryFn: () => fetchPuzzle(hashid),
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
