import { Conversation } from '@/types/conversation';
import api from '@/utils/apiClient';

export const fetchConversations = async (): Promise<Conversation[]> => {
  const response = await api.get(
    `${import.meta.env.VITE_API_URL}/messages/conversations/`
  );
  return response.data;
};
