import { searchUser } from '@/service/user';
import { useQuery } from '@tanstack/react-query';

export const useSearch = (searchTerm: string) => {
  return useQuery({
    queryKey: ['search-users', searchTerm],
    queryFn: () => searchUser(searchTerm),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: searchTerm.length > 0,
    staleTime: 5 * 60 * 1000,
  });
};
