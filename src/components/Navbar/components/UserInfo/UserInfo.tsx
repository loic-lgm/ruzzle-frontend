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
import { Link } from 'react-router';
import { User } from '@/types/user';

interface UserInfoProps {
  user: User;
}

const UserInfo = ({ user }: UserInfoProps) => {
  console.log(user);
  return (
    <div className="flex gap-4">
      <Button variant="ghost" className="text-green-500 bg-transparent hover:text-green-500">
        <CirclePlus />
      </Button>
      <Button variant="ghost">
        <Bell size={32}/>
      </Button>
      <Popover>
        <PopoverTrigger>
          <Avatar className="cursor-pointer">
            <AvatarImage src="https://cdn.britannica.com/06/122506-050-C8E03A8A/Pyramid-of-Khafre-Giza-Egypt.jpg" />
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-56">
          <div className="grid gap-4">
            <Link
              to="/profile"
              className="flex items-center gap-2 text-sm font-medium hover:text-green-500"
            >
              <UserIcon size={16} />
              <span>Mon profil</span>
            </Link>
            <Link
              to="/profile?tab=exchanges"
              className="flex items-center gap-2 text-sm font-medium hover:text-green-500"
            >
              <Package size={16} />
              <span>Mes Échanges</span>
            </Link>
            <Link
              to="/profile?tab=messages"
              className="flex items-center gap-2 text-sm font-medium hover:text-green-500"
            >
              <MessageSquare size={16} />
              <span>Messages</span>
            </Link>
            <hr />
            <Button variant="outline" className="w-full">
              Déconnexion
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UserInfo;
