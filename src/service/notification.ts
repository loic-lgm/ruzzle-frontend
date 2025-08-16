import { NotificationType } from '@/types/notification';
import api from '@/utils/apiClient';

export const fetchNotifications = async (): Promise<NotificationType[]> => {
  const response = await api.get(
    `${import.meta.env.VITE_API_URL}/notifications/`
  );
  return response.data;
};

export const markNotificationAsRead = async (id: number) => {
  await api.patch(`${import.meta.env.VITE_API_URL}/notifications/${id}/`, {
    is_read: true,
  });
};
