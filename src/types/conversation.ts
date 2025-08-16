import { Message } from '@/types/message';
import { User } from '@/types/user';

export type Conversation = {
  id: number;
  participants: User[];
  messages: Message[];
  updated_at: string;
  last_message: Message;
};
