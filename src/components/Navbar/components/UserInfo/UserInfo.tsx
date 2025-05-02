import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell, MessageSquare, Package, User } from "lucide-react";
import { Link } from "react-router";

const UserInfo = () => {
  return (
    <div className="flex gap-8">
      <Button variant="ghost" size="icon">
        <Bell />
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
              <User size={16} />
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
