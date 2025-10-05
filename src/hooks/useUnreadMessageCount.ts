import { unreadMessageCount } from '@/service/message';
import { useQuery } from '@tanstack/react-query';

export const useUnreadMessageCount = () => {
  return useQuery({
    queryKey: ['unread-count'],
    queryFn: unreadMessageCount,
    refetchOnWindowFocus: true,
    retry: false,
    staleTime: 0,
    refetchInterval: 60 * 1000,
  });
};
