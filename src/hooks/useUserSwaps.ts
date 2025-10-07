import {
  fetchCompletedSwapsByUser,
  fetchReceivedSwapsByUser,
  fetchSentSwapsByUser,
} from '@/service/user';
import { useQuery } from '@tanstack/react-query';

export function useUserSwaps(userId: number | undefined) {
  const commonOptions = {
    refetchOnWindowFocus: true,
    retry: false,
    staleTime: 0,
    refetchInterval: 60 * 1000,
  };

  const receivedSwaps = useQuery({
    queryKey: ['received-swaps', userId],
    queryFn: () => fetchReceivedSwapsByUser(userId!),
    enabled: !!userId,
    ...commonOptions,
  });

  const sentSwaps = useQuery({
    queryKey: ['sent-swaps', userId],
    queryFn: () => fetchSentSwapsByUser(userId!),
    enabled: !!userId,
    ...commonOptions,
  });

  const completedSwaps = useQuery({
    queryKey: ['completed-swaps', userId],
    queryFn: () => fetchCompletedSwapsByUser(userId!),
    enabled: !!userId,
    ...commonOptions,
  });

  return {
    receivedSwaps: receivedSwaps.data ?? [],
    sentSwaps: sentSwaps.data ?? [],
    completedSwaps: completedSwaps.data ?? [],
  };
}
