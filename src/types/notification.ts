import { User } from '@/types/user';

export type NotificationType = {
  id: number;
  user: User;
  sender_username: string;
  notif_type: string;
  is_read: boolean;
  created_at: string;
};
