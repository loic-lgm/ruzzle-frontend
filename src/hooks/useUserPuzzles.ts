import { fetchPuzzlesByUser } from '@/service/puzzle';
import { useQuery } from '@tanstack/react-query';

export const useUserPuzzles = () => {
  return useQuery({
    queryKey: ['userPuzzles'],
    queryFn: fetchPuzzlesByUser,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
