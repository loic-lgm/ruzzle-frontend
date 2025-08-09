import { fetchCities } from '@/service/city';
import { useQuery } from '@tanstack/react-query';

export const useCities = () => {
  return useQuery({
    queryKey: ['cities'],
    queryFn: fetchCities,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
