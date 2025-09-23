import { validateUser } from '@/service/user';
import { useQuery } from '@tanstack/react-query';

export const useValidation = (uuid: string, token: string) => {
  return useQuery({
    queryKey: ['validation'],
    queryFn: () => validateUser(uuid, token),
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
