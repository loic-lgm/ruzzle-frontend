import { useEffect, useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User } from '@/types/user';
import { Conversation } from '@/types/conversation';
import { Button } from '@/components/ui/button';
import { CheckCircle, Send, XCircle } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { markMessageAsRead, sendMessageFn } from '@/service/message';
import { AxiosError } from 'axios';
import MessageExchange from '@/components/MessageExchange/MessageExchange';
import { useNavigate } from 'react-router';
import { formatDate, formatTime } from '@/utils/timeFormat';
import RateBlock from '@/components/RateBlock';
import { Textarea } from '@/components/ui/textarea';

interface MessagesType {
  user: User;
  conversations: Conversation[];
  activeConversationFromNotif: Conversation | null;
}

const Messages = ({
  user,
  conversations,
  activeConversationFromNotif,
}: MessagesType) => {
  const [newMessage, setNewMessage] = useState('');
  const [disableConversation, setDisableConversation] =
    useState<boolean>(false);
  const [activeConversationId, setActiveConversationId] = useState<
    number | null
  >(null);

  const conversationsWithOther = conversations.map((conv: Conversation) => {
    const otherParticipant = conv.participants.find((p) => p.id !== user.id)!;
    const sortedMessages = [...conv.messages].sort(
      (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()
    );
    return {
      ...conv,
      otherParticipant,
      messages: sortedMessages,
    };
  });

  const activeConversation = activeConversationId
    ? conversationsWithOther.find((c) => c.id === activeConversationId) || null
    : null;

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [activeConversation?.messages]);

  useEffect(() => {
    if (activeConversationFromNotif?.id) {
      setActiveConversationId(activeConversationFromNotif.id);
      const conv = conversationsWithOther.find(
        (c) => c.id === activeConversationFromNotif.id
      );
      if (conv && conv.last_message.user.id !== user.id) {
        markAsRead(conv.last_message.id);
      }
    }
  }, [activeConversationFromNotif?.id]);

  const { mutate: markAsRead } = useMutation({
    mutationFn: (id: number) => markMessageAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      queryClient.invalidateQueries({ queryKey: ['unread-count'] });
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const sendMessage = useMutation({
    mutationFn: sendMessageFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ error: string }>;
      console.log(axiosError);
    },
  });

  const handleSendMessage = () => {
    if (
      !activeConversation ||
      activeConversation.exchange.status === 'denied' ||
      activeConversation.exchange.status === 'accepted'
    ) {
      return;
    }
    const trimmed = newMessage.trim();
    if (trimmed.length === 0 || trimmed.length > 500) return;

    sendMessage.mutate({
      conversation: activeConversation.id,
      content: trimmed,
    });
    setNewMessage('');
  };

  const handleClickConversation = (conversation: Conversation) => {
    setActiveConversationId(conversation.id);
    if (conversation.last_message.user.id !== user.id) {
      markAsRead(conversation.last_message.id);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full md:h-[600px]">
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
                  activeConversation?.id === conv.id ? 'bg-gray-200' : ''
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
                {!conv.last_message.is_read &&
                  conv.last_message.user.id !== user.id && (
                    <Badge className="bg-emerald-500">New</Badge>
                  )}
                {conv.exchange && conv.exchange.status === 'accepted' && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                {conv.exchange && conv.exchange.status === 'denied' && (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
            ))}
        </div>
      </div>

      {activeConversation ? (
        <div className="md:flex-1 flex flex-col border rounded-lg overflow-hidden h-full">
          <div
            className="p-4 border-b flex items-center gap-3 bg-white cursor-pointer"
            onClick={() =>
              navigate(
                `/profil/${activeConversation.otherParticipant!.username}`
              )
            }
          >
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={activeConversation.otherParticipant?.image}
                alt={activeConversation.otherParticipant?.username}
              />
              <AvatarFallback>
                {activeConversation.otherParticipant?.username.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">
                {activeConversation.otherParticipant?.username}
              </p>
            </div>
          </div>

          <MessageExchange
            swap={activeConversation.exchange}
            isRequester={activeConversation.exchange.requester.id === user.id}
            setDisableConversation={setDisableConversation}
            disableConversation={disableConversation}
          />

          <div
            className="flex-1 p-4 overflow-y-auto bg-gray-50 min-h-[300px] md:min-h-0"
            ref={messagesContainerRef}
          >
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

            {activeConversation?.exchange?.status === 'accepted' &&
              activeConversation.otherParticipant && (
                <RateBlock
                  swapId={activeConversation.exchange.id}
                  reviewedId={activeConversation.otherParticipant.id}
                  hasVoted={activeConversation.exchange.has_voted}
                  ratingGiven={activeConversation.exchange.rating_given}
                />
              )}
          </div>

          {activeConversation.exchange.status === 'accepted' ||
          activeConversation.exchange.status === 'denied' ||
          disableConversation ? (
            <div className="p-3 border-t bg-gray-50">
              <div className="text-center p-2">
                <p className="text-sm text-gray-600">
                  {activeConversation.exchange.status === 'accepted'
                    ? "Cette conversation est archivée car l'échange est terminé"
                    : "Cette conversation est archivée car l'échange a été refusé"}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-3 border-t bg-white">
              <div className="flex gap-2 items-center">
                <Textarea
                  placeholder="Discutez..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === 'Enter' && !e.shiftKey && handleSendMessage()
                  }
                  rows={1}
                  className="resize-none overflow-hidden max-h-40 pr-10"
                  style={{ minHeight: '40px' }}
                />

                <div className="text-xs text-gray-500 mt-1 text-right flex items-center">
                  {newMessage.length}/500
                </div>
                <Button
                  onClick={handleSendMessage}
                  className="bg-green-500 hover:bg-green-500/90"
                  disabled={
                    newMessage.trim().length === 0 || newMessage.length > 500
                  }
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          )}
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
