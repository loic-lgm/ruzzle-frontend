import { fetchUserByUsername } from '@/service/user';
import { useQuery } from '@tanstack/react-query';

export const usePublicUser = (username: string) => {
  return useQuery({
    queryKey: ['public-user', username],
    queryFn: () => fetchUserByUsername(username!),
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
