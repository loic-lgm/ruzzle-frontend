import api from '@/utils/apiClient';

export const markMessageAsRead = async (id: number) => {
  await api.patch(`${import.meta.env.VITE_API_URL}/messages/${id}/`, {
    is_read: true,
  });
};

export const unreadMessageCount = async () => {
  const response = await api.get(
    `${import.meta.env.VITE_API_URL}/messages/unread_count/`
  );
  return response.data;
};
