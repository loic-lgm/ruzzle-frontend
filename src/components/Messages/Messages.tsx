import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { Send } from 'lucide-react';
import { useConversations } from '@/hooks/useConversations';

const Messages = () => {
  const [activeConversation, setActiveConversation] = useState<number | null>(
    null
  );
  // const [newMessage, setNewMessage] = useState('');
  const { data: conversations = [] } = useConversations();

  // const handleSendMessage = () => {
  //   if (!newMessage.trim()) return;

  //   setNewMessage('');
  // };

  // const formatTime = (timestamp: string) => {
  //   const date = new Date(timestamp);
  //   return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  // };

  // const formatDate = (timestamp: string) => {
  //   const date = new Date(timestamp);
  //   return date.toLocaleDateString();
  // };

  return (
    <div className="flex flex-col md:flex-row gap-4 h-[600px]">
      <div className="w-full md:w-1/3 h-60 md:h-full overflow-y-auto border rounded-lg">
        <div className="p-3 border-b">
          <h3 className="font-medium">Conversations</h3>
        </div>
        <div className="divide-y">
          {conversations.length > 0 &&
            conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setActiveConversation(conv.id)}
                className={`p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50 ${
                  activeConversation === conv.id ? 'bg-gray-100' : ''
                }`}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={'toto'} alt={'toto'} />
                  <AvatarFallback>
                    {/* {conv.user.name.substring(0, 2)} */}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    {/* <p className="font-medium truncate">{conv.participants.username}</p> */}
                    <p className="font-medium truncate">TOTO</p>
                    <span className="text-xs text-gray-500">
                      {/* {formatDate(conv.timestamp)} */}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {conv.last_message.content}
                  </p>
                </div>
                {/* {conv.unread && <Badge className="bg-emerald-500">New</Badge>} */}
              </div>
            ))}
        </div>
      </div>

      {/* {conversation ? (
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
      )} */}
    </div>
  );
};

export default Messages;
