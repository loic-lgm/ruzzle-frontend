import { search } from '@/service/search';
import { useQuery } from '@tanstack/react-query';

export const useSearch = (searchTerm: string) => {
  return useQuery({
    queryKey: ['search', searchTerm],
    queryFn: () => search(searchTerm),
    enabled: searchTerm.length > 0,
  });
};
