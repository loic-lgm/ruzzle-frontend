import { fetchPuzzlesByUser } from '@/service/puzzle';
import { useQuery } from '@tanstack/react-query';

export const useUserPuzzles = () => {
  return useQuery({
    queryKey: ['userPuzzles'],
    queryFn: fetchPuzzlesByUser,
    refetchOnWindowFocus: true,
    retry: false,
    staleTime: 0,
  });
};
