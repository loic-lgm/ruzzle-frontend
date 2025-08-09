import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send } from 'lucide-react';

const mockConversations = [
  {
    id: 'c1',
    user: {
      id: 'u2',
      name: 'Emma Wilson',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Emma',
    },
    lastMessage: "Hi, I'm interested in exchanging puzzles!",
    timestamp: '2023-07-15T14:30:00',
    unread: true,
    messages: [
      {
        id: 'm1',
        sender: 'them',
        text: "Hi, I'm interested in exchanging puzzles!",
        timestamp: '2023-07-15T14:30:00',
      },
      {
        id: 'm2',
        sender: 'them',
        text: 'I saw you have the Mountain Sunrise puzzle. Would you be interested in trading for my Ocean Waves?',
        timestamp: '2023-07-15T14:32:00',
      },
    ],
  },
  {
    id: 'c2',
    user: {
      id: 'u3',
      name: 'Michael Brown',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Michael',
    },
    lastMessage: 'Thanks for accepting my exchange request!',
    timestamp: '2023-07-14T09:15:00',
    unread: true,
    messages: [
      {
        id: 'm3',
        sender: 'them',
        text: 'Hello, would you be interested in exchanging puzzles?',
        timestamp: '2023-07-14T09:10:00',
      },
      {
        id: 'm4',
        sender: 'you',
        text: "Yes, I'd be happy to exchange puzzles!",
        timestamp: '2023-07-14T09:12:00',
      },
      {
        id: 'm5',
        sender: 'them',
        text: 'Thanks for accepting my exchange request!',
        timestamp: '2023-07-14T09:15:00',
      },
    ],
  },
  {
    id: 'c3',
    user: {
      id: 'u4',
      name: 'Sarah Johnson',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah',
    },
    lastMessage: 'When would be a good time to exchange?',
    timestamp: '2023-07-13T16:45:00',
    unread: true,
    messages: [
      {
        id: 'm6',
        sender: 'you',
        text: "Hi Sarah, I'm interested in your Autumn Leaves puzzle",
        timestamp: '2023-07-13T16:40:00',
      },
      {
        id: 'm7',
        sender: 'them',
        text: "Hi there! Yes, I'd be happy to exchange it",
        timestamp: '2023-07-13T16:42:00',
      },
      {
        id: 'm8',
        sender: 'them',
        text: 'When would be a good time to exchange?',
        timestamp: '2023-07-13T16:45:00',
      },
    ],
  },
];

const Messages: React.FC = () => {
  const [activeConversation, setActiveConversation] = useState<string | null>(
    null
  );
  const [newMessage, setNewMessage] = useState('');

  const conversation = activeConversation
    ? mockConversations.find((c) => c.id === activeConversation)
    : null;

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    setNewMessage('');
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 h-[600px]">
      <div className="w-full md:w-1/3 h-60 md:h-full overflow-y-auto border rounded-lg">
        <div className="p-3 border-b">
          <h3 className="font-medium">Conversations</h3>
        </div>
        <div className="divide-y">
          {mockConversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setActiveConversation(conv.id)}
              className={`p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50 ${
                activeConversation === conv.id ? 'bg-gray-100' : ''
              }`}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={conv.user.avatar} alt={conv.user.name} />
                <AvatarFallback>
                  {conv.user.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="font-medium truncate">{conv.user.name}</p>
                  <span className="text-xs text-gray-500">
                    {formatDate(conv.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {conv.lastMessage}
                </p>
              </div>
              {conv.unread && <Badge className="bg-emerald-500">New</Badge>}
            </div>
          ))}
        </div>
      </div>

      {conversation ? (
        <div className="flex-1 flex flex-col border rounded-lg overflow-hidden">
          <div className="p-4 border-b flex items-center gap-3 bg-white">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={conversation.user.avatar}
                alt={conversation.user.name}
              />
              <AvatarFallback>
                {conversation.user.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{conversation.user.name}</p>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              {conversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'you' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-lg ${
                      message.sender === 'you'
                        ? 'bg-green-500 text-white'
                        : 'bg-white border'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === 'you'
                          ? 'text-green-100'
                          : 'text-gray-500'
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 border-t bg-white">
            <div className="flex gap-2">
              <Input
                placeholder="Écrivez votre message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-green-500 hover:bg-green-500/90"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center border rounded-lg">
          <div className="text-center p-6">
            <p className="text-gray-500">
              Sélectionner une conversation pour voir les messages.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
