import { fetchConversations } from '@/service/conversation';
import { useQuery } from '@tanstack/react-query';

export const useConversations = () => {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: fetchConversations,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 0,
  });
};
