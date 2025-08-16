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
  Puzzle,
  User as UserIcon,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { User } from '@/types/user';
import { toast } from 'sonner';
import { logoutFn } from '@/service/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useUserStore from '@/stores/useUserStore';
import { Badge } from '@/components/ui/badge';

interface UserInfoProps {
  user: User;
}

const UserInfo = ({ user }: UserInfoProps) => {
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();
  const queryClient = useQueryClient()
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
      <Button variant="ghost">
        <Link to="/puzzles">
          <Puzzle />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="text-green-500 bg-transparent hover:text-green-500"
      >
        <Link to="/ajouter-un-puzzle">
          <CirclePlus />
        </Link>
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <Badge className="absolute -top-1 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-green-500">
              2
            </Badge>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <div className="p-3 border-b">
            <h3 className="font-medium">Notifications</h3>
          </div>
          <div className="divide-y max-h-60 overflow-y-auto">
            <div className="p-3 hover:bg-gray-50">
              <div className="flex gap-3">
                <Package className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-medium">
                    Nouvelle demande d&apos;échange
                  </p>
                  <p className="text-xs text-gray-500">
                    Emma Wilson souhaite échanger des puzzles avec vous.
                  </p>
                  <p className="text-xs text-gray-400 mt-1">À l&apos;instant</p>
                </div>
              </div>
            </div>
            <div className="p-3 hover:bg-gray-50">
              <div className="flex gap-3">
                <MessageSquare className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-medium">Nouveau message</p>
                  <p className="text-xs text-gray-500">
                    Sarah Johnson vous a envoyé un message.
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Il y a 2 heures</p>
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <Popover>
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
            >
              <UserIcon size={16} />
              <span>Mon profil</span>
            </Link>
            <Link
              to="/mon-espace?tab=received"
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
