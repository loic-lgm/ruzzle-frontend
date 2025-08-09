import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User } from '@/types/user';
import { AVATARS } from '@/utils/constants';
import { User as UserIcon } from 'lucide-react';
import React from 'react';

interface SelectAvatarProps {
  setShowAvatarSelector: React.Dispatch<React.SetStateAction<boolean>>;
  setUserData: React.Dispatch<React.SetStateAction<User>>;
}

const SelectAvatar = ({
  setShowAvatarSelector,
  setUserData,
}: SelectAvatarProps) => {
  const handleImage = (e: React.MouseEvent<HTMLImageElement>) => {
    const image = e.currentTarget.src
    setUserData((prev) => ({
      ...prev,
      image: image,
    }));
  };
  return (
    <div className="border rounded-lg p-4 bg-muted/50">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-medium">Choisir un avatar</h4>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowAvatarSelector(false)}
        >
          ✕
        </Button>
      </div>
      <div className="flex flex-wrap justify-around">
        {AVATARS.map((avatarUrl, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-1 cursor-pointer p-2 rounded-lg hover:bg-accent transition-colors h-20 w-20 full-rounded"
          >
            <Avatar className="h-16 w-16 border-2 border-border hover:border-green-500 transition-colors p-1">
              <AvatarImage
                src={avatarUrl}
                alt={`Avatar option ${index + 1}`}
                onClick={handleImage}
              />
              <AvatarFallback>
                <UserIcon className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectAvatar;
