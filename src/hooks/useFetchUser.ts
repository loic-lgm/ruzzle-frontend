import { useEffect } from 'react';
import { fetchUser } from '@/service/user';
import useUserStore from '@/stores/useUserStore';
import { useQuery } from '@tanstack/react-query';

export const useFetchUser = () => {
  const setUser = useUserStore((state) => state.setUser);

  const query = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.data) {
      setUser(query.data);
    } else if (query.isError) {
      setUser(null);
    }
  }, [query.data, query.isError, setUser]);

  return query;
};
