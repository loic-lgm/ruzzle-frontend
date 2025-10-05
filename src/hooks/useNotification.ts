import { fetchNotifications } from '@/service/notification';
import { useQuery } from '@tanstack/react-query';

export const useNotification = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    refetchOnWindowFocus: true,
    retry: false,
    staleTime: 0,
    refetchInterval: 60 * 1000,
  });
};
