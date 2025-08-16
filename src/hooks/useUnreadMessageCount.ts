import { unreadMessageCount } from '@/service/message';
import { useQuery } from '@tanstack/react-query';

export const useUnreadMessageCount = () => {
  return useQuery({
    queryKey: ['unread-count'],
    queryFn: unreadMessageCount,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
