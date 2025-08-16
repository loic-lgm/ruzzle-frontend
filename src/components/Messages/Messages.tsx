import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useConversations } from '@/hooks/useConversations';
import { Badge } from '@/components/ui/badge';
import { User } from '@/types/user';
import { Conversation } from '@/types/conversation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { markMessageAsRead } from '@/service/message';

const Messages = ({ user }: { user: User }) => {
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const { data: conversations = [] } = useConversations();
  const conversationsWithOther = conversations.map((conv) => {
    const otherParticipant = conv.participants.find((p) => p.id !== user.id)!;
    return {
      ...conv,
      otherParticipant,
    };
  });

  const queryClient = useQueryClient();

  const { mutate: markAsRead } = useMutation({
    mutationFn: (id: number) => markMessageAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    setNewMessage('');
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (created: string) => {
    const date = new Date(created);
    return date.toLocaleDateString();
  };

  const handleClickConversation = (conversation: Conversation) => {
    setActiveConversation(conversation);
    markAsRead(conversation.last_message.id);
  };

  /**
   * TODO
   * Afficher l'avatar l'autre user de la conversation OK!
   * Récupérer l'username de l'autre user OK!
   * Afficher la date du dernier message OK!
   * Si le message n'est pas lu, afficher le badge new  OK!
   * Ouvrir la concersation sur le coté avec tous les messages OK!
   * Quand on click sur une conversation, passer le dernier message à is_read=True OK!
   * Sur la pge profile mettre à jour le nombre de message non lu
   * Poster un message
   */

  return (
    <div className="flex flex-col md:flex-row gap-4 h-[600px]">
      <div className="w-full md:w-1/3 h-60 md:h-full overflow-y-auto border rounded-lg">
        <div className="p-3 border-b">
          <h3 className="font-medium">Conversations</h3>
        </div>
        <div className="divide-y">
          {conversationsWithOther.length > 0 &&
            conversationsWithOther.map((conv) => (
              <div
                key={conv.id}
                onClick={() => handleClickConversation(conv)}
                className={`p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50 ${
                  activeConversation === conv ? 'bg-gray-100' : ''
                }`}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={conv.otherParticipant!.image}
                    alt={conv.otherParticipant!.image}
                  />
                  <AvatarFallback>
                    {conv.otherParticipant!.username.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-medium truncate">
                      {conv.otherParticipant!.username}
                    </p>
                    <span className="text-xs text-gray-500">
                      {formatDate(conv.last_message.created)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {conv.last_message.content}
                  </p>
                </div>
                {!conv.last_message.is_read && (
                  <Badge className="bg-emerald-500">New</Badge>
                )}
              </div>
            ))}
        </div>
      </div>

      {activeConversation ? (
        <div className="flex-1 flex flex-col border rounded-lg overflow-hidden">
          <div className="p-4 border-b flex items-center gap-3 bg-white">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={activeConversation.otherParticipant!.image}
                alt={activeConversation.otherParticipant!.username}
              />
              <AvatarFallback>
                {activeConversation.otherParticipant!.username.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">
                {activeConversation.otherParticipant!.username}
              </p>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              {activeConversation.messages.map((message) => {
                const sender = message.user.id === user.id ? 'you' : 'other';
                return (
                  <div
                    key={message.id}
                    className={`flex ${
                      sender === 'you' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-lg ${
                        sender === 'you'
                          ? 'bg-green-500 text-white'
                          : 'bg-white border'
                      }`}
                    >
                      <p>{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          sender === 'you' ? 'text-green-100' : 'text-gray-500'
                        }`}
                      >
                        {formatTime(message.created)}
                      </p>
                    </div>
                  </div>
                );
              })}
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
