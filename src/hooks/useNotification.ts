import { fetchNotifications } from '@/service/notification';
import { useQuery } from '@tanstack/react-query';

export const useNotification = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
  });
};
