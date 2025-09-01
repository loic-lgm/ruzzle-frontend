import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { LogOut, MessageSquare, Package, User as UserIcon } from 'lucide-react';
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
    <div className="flex gap-4 items-center">
      <Notification notifications={notifications} />

      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger>
          <Avatar className="cursor-pointer">
            <AvatarImage src={user.image} className="object-cover" />
          </Avatar>
        </PopoverTrigger>

        <PopoverContent
          className="
            w-15 md:w-56 
            flex flex-col items-center md:items-start 
            px-3 py-2 gap-3
          "
          side="bottom"
          align="center"
        >
          <Link
            to="/mon-espace"
            onClick={() => setIsPopoverOpen(false)}
            className="flex flex-col md:flex-row items-center gap-1 md:gap-2 hover:text-green-500"
          >
            <UserIcon size={18} />
            <span className="hidden md:inline text-sm">Mon profil</span>
          </Link>

          <Link
            to="/mon-espace?tab=received"
            onClick={() => setIsPopoverOpen(false)}
            className="flex flex-col md:flex-row items-center gap-1 md:gap-2 hover:text-green-500"
          >
            <Package size={18} />
            <span className="hidden md:inline text-sm">Mes Échanges</span>
          </Link>

          <Link
            to="/mon-espace?tab=messages"
            onClick={() => setIsPopoverOpen(false)}
            className="flex flex-col md:flex-row items-center gap-1 md:gap-2 hover:text-green-500"
          >
            <MessageSquare size={18} />
            <span className="hidden md:inline text-sm">Messages</span>
          </Link>

          <hr className="w-full border-gray-200 my-1" />

          <button
            onClick={handleLogout}
            className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-gray-600 hover:text-red-500 transition-colors"
          >
            <LogOut size={18} />
            <span className="hidden md:inline text-sm">Déconnexion</span>
          </button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UserInfo;
