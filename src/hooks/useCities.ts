import { fetchCities } from '@/service/city';
import { useQuery } from '@tanstack/react-query';

export const useCities = (query: string) => {
  return useQuery({
    queryKey: ['cities', query],
    queryFn: () => fetchCities(query),
    enabled: query.length > 0,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
