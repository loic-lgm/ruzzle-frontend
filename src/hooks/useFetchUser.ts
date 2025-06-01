import { fetchUser } from '@/service/user';
import useUserStore from '@/stores/useUserStore';
import { useQuery } from '@tanstack/react-query';

export const useFetchUser = () => {
  const setUser = useUserStore((state) => state.setUser);

  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const user = await fetchUser();
        setUser(user);
        return user;
      } catch (error) {
        setUser(null);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
    retryOnMount: false,
  });
};
