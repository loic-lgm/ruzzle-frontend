import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User } from '@/types/user';
import { AVATARS } from '@/utils/constants';
import { User as UserIcon } from 'lucide-react';
import React, { useState } from 'react';

interface SelectAvatarProps {
  setShowAvatarSelector: React.Dispatch<React.SetStateAction<boolean>>;
  setUserData: React.Dispatch<React.SetStateAction<User>>;
}

const SelectAvatar = ({
  setShowAvatarSelector,
  setUserData,
}: SelectAvatarProps) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>();
  const handleImage = (image: string) => {
    setSelectedAvatar(image);
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

      {/* Scroll vertical avec snapping */}
      <div className="flex flex-wrap justify-around gap-2 max-h-[120px] overflow-y-auto snap-y snap-mandatory">
        {AVATARS.map((avatarUrl, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-1 cursor-pointer p-2 rounded-lg hover:bg-accent transition-colors h-20 w-20 full-rounded snap-start"
            onClick={() => handleImage(avatarUrl)}
          >
            <Avatar
              className={`h-16 w-16 rounded-full border-2 p-1 transition-colors ${
                selectedAvatar === avatarUrl
                  ? 'border-green-500 ring-green-500'
                  : 'border-border hover:border-green-500'
              }`}
            >
              <AvatarImage src={avatarUrl} alt={`Avatar option ${index + 1}`} />
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
