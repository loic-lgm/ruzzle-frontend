import { User } from '@/types/user';

export type Message = {
  id: number;
  conversation: number;
  user: User;
  content: string;
  created: string;
  is_read: boolean;
};
