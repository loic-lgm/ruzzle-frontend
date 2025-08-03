import { useQueryClient } from '@tanstack/react-query';

export const useSwapsRefresh = () => {
  const queryClient = useQueryClient();

  const refreshSwaps = (type: 'sent' | 'received', userId: number) => {
    const key =
      type === 'sent' ? ['sent-swaps', userId] : ['received-swaps', userId];
    queryClient.invalidateQueries({ queryKey: key });
  };

  return { refreshSwaps };
};
