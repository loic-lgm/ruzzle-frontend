import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { markNotificationAsRead } from '@/service/notification';
import { NotificationType } from '@/types/notification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Bell, MessageSquare, Package } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

interface NotificationBellProps {
  notifications: NotificationType[];
}

const Notification = ({ notifications }: NotificationBellProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const unreadCount = notifications.filter((n) => !n.is_read).length;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: markAsRead } = useMutation({
    mutationFn: (id: number) => markNotificationAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const handleClickNotification = (notification: NotificationType) => {
    if (notification.is_read) return;
    markAsRead(notification.id);
    if (notification.notif_type == 'exchange_request') {
      navigate('/mon-espace?tab=received');
      setIsPopoverOpen(false);
    }
    if (notification.notif_type == 'new_message') {
      navigate('/mon-espace?tab=messages', {
        state: { conversationId: notification.conversation_id },
      });
      setIsPopoverOpen(false);
    }
  };
  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-green-500">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="p-3 border-b">
          <h3 className="font-medium">Notifications</h3>
        </div>
        <div className="divide-y max-h-60 overflow-y-auto">
          {notifications.length > 0 &&
            notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleClickNotification(notification)}
                className={`p-3 hover:bg-gray-50 transition-colors ${
                  !notification.is_read
                    ? 'bg-gray-100 font-semibold cursor-pointer'
                    : ''
                }`}
              >
                <div className="flex gap-3">
                  {notification.notif_type == 'exchange_request' && (
                    <Package className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                  )}
                  {notification.notif_type == 'new_message' && (
                    <MessageSquare className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
                  )}
                  <div>
                    <p className="text-xs text-gray-500">
                      {notification.sender_username}{' '}
                      {(() => {
                        if (notification.notif_type === 'exchange_request')
                          return 'souhaite échanger des puzzles avec vous.';
                        if (notification.notif_type === 'new_message')
                          return 'vous a envoyé un message.';
                        return '';
                      })()}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatDistanceToNow(new Date(notification.created_at), {
                        addSuffix: true,
                        locale: fr,
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          {notifications.length == 0 && (
            <div className="p-3 hover:bg-gray-50">
              <div className="flex gap-3">
                <div>
                  <p className="text-sm font-medium">
                    Rien à voir pour le moment.
                  </p>
                  <p className="text-xs text-gray-500">
                    Ajouter des puzzles à votre collection et demandez des
                    échanges à d&apos;autres membres !
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Notification;
