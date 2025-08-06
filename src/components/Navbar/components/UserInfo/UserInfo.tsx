import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Bell,
  CirclePlus,
  MessageSquare,
  Package,
  User as UserIcon,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { User } from '@/types/user';
import { toast } from 'sonner';
import { logoutFn } from '@/service/auth';
import { useMutation } from '@tanstack/react-query';
import useUserStore from '@/stores/useUserStore';

interface UserInfoProps {
  user: User;
}

const UserInfo = ({ user }: UserInfoProps) => {
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();
  const logout = useMutation({
    mutationFn: logoutFn,
    onSuccess: () => {
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
      <Button
        variant="ghost"
        size="icon"
        className="text-green-500 bg-transparent hover:text-green-500"
      >
        <Link to="/ajouter-un-puzzle">
          <CirclePlus />
        </Link>
      </Button>
      <Button variant="ghost">
        <Bell />
      </Button>
      <Popover>
        <PopoverTrigger>
          <Avatar className="cursor-pointer">
            <AvatarImage
              src={user.image}
              className="object-cover"
            />
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-56">
          <div className="grid gap-4">
            <Link
              to="/mon-espace"
              className="flex items-center gap-2 text-sm font-medium hover:text-green-500"
            >
              <UserIcon size={16} />
              <span>Mon profil</span>
            </Link>
            <Link
              to="/mon-espace?tab=exchanges"
              className="flex items-center gap-2 text-sm font-medium hover:text-green-500"
            >
              <Package size={16} />
              <span>Mes Échanges</span>
            </Link>
            <Link
              to="/mon-espace?tab=messages"
              className="flex items-center gap-2 text-sm font-medium hover:text-green-500"
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
