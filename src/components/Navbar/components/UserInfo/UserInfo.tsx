import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  MessageSquare,
  Package,
  User as UserIcon,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { User } from '@/types/user';
import { toast } from 'sonner';
import { logoutFn } from '@/service/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useUserStore from '@/stores/useUserStore';
import Notification from '@/components/Notification';
import { useNotification } from '@/hooks/useNotification';
import { useState } from 'react';

interface UserInfoProps {
  user: User;
}

const UserInfo = ({ user }: UserInfoProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const setUser = useUserStore((state) => state.setUser);
  const { data: notifications = [] } = useNotification();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = useMutation({
    mutationFn: logoutFn,
    onSuccess: () => {
      queryClient.clear();
      setUser(null);
      navigate('/');
    },
    onError: (error) => {
      toast.error('Une erreur est survenue');
      console.log(error);
    },
  });

  const handleLogout = () => {
    logout.mutate();
  };
  return (
    <div className="flex gap-4">

      <Notification notifications={notifications} />
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger>
          <Avatar className="cursor-pointer">
            <AvatarImage src={user.image} className="object-cover" />
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-56">
          <div className="grid gap-4">
            <Link
              to="/mon-espace"
              className="flex items-center gap-2 text-sm font-medium hover:text-green-500"
              onClick={() => setIsPopoverOpen(false)}
            >
              <UserIcon size={16} />
              <span>Mon profil</span>
            </Link>
            <Link
              to="/mon-espace?tab=received"
              className="flex items-center gap-2 text-sm font-medium hover:text-green-500"
              onClick={() => setIsPopoverOpen(false)}
            >
              <Package size={16} />
              <span>Mes Échanges</span>
            </Link>
            <Link
              to="/mon-espace?tab=messages"
              className="flex items-center gap-2 text-sm font-medium hover:text-green-500"
              onClick={() => setIsPopoverOpen(false)}
            >
              <MessageSquare size={16} />
              <span>Messages</span>
            </Link>
            <hr />
            <Button variant="outline" className="w-full" onClick={handleLogout}>
              Déconnexion
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UserInfo;
