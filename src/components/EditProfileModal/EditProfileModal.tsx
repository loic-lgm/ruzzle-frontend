import React, { useCallback, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Camera, User as UserIcon } from 'lucide-react';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { User } from '@/types/user';
import { updateUser } from '@/service/user';
import { toast } from 'sonner';
import { useFetchUser } from '@/hooks/useFetchUser';
import SelectAvatar from '@/components/SelectAvatar';

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
}

const EditProfileModal = ({
  open,
  onOpenChange,
  user,
}: EditProfileDialogProps) => {
  const [userData, setUserData] = useState<User>(user);
  const [error, setError] = useState<string | null>(null);
  const [showAvatarSelector, setShowAvatarSelector] = useState<boolean>(false);
  const [internalError, setInternalError] = useState<string | null>(null);
  const { refetch } = useFetchUser();

  const update = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      setError('');
      setInternalError('');
      toast.success('Profil mis à jour avec succès !');
      onOpenChange(false);
      refetch();
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ error: string }>;
      setInternalError(
        axiosError.response?.data?.error || 'Une erreur est survenue'
      );
    },
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setUserData((prev) => ({ ...prev, [name]: value }));
    },
    [setUserData]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userData.username) {
      setError("Vous devez renseigner un nom d'utilisateur");
      return;
    }
    if (!userData.email) {
      setError('Vous devez renseigner un email');
      return;
    }

    update.mutate({
      userId: user.id,
      payload: {
        first_name: userData.first_name || null,
        last_name: userData.last_name || null,
        username: userData.username,
        email: userData.email,
        ...(userData.image && { image: userData.image }),
      },
    });
  };

  useEffect(() => {
    if (open) {
      setUserData(user);
    }
  }, [open, user]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Éditer votre profil</DialogTitle>
          <DialogDescription>
            Vous pouvez modifier vos informations personnelles ici.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center gap-4 py-2">
            <Avatar
              className="h-24 w-24 border-4 border-white shadow-md cursor-pointer group relative"
              onClick={() => setShowAvatarSelector(!showAvatarSelector)}
            >
              <AvatarImage
                src={userData.image || user.image}
                alt="Profile picture"
                className="object-cover"
              />
              <AvatarFallback>
                <UserIcon className="h-12 w-12" />
              </AvatarFallback>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                <Camera className="h-8 w-8 text-white" />
              </div>
            </Avatar>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowAvatarSelector(!showAvatarSelector)}
            >
              <Camera className="mr-2 h-4 w-4" />
              Changer l&apos;avatar
            </Button>
            {showAvatarSelector && (
              <div className="space-y-2">
                <SelectAvatar
                  setShowAvatarSelector={setShowAvatarSelector}
                  setUserData={setUserData}
                />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">* Nom d&apos;utilisateur</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Votre nom d'utilisateur"
              value={userData.username}
              onChange={handleChange}
              required
            />
            <p className="text-sm text-muted-foreground">
              Ceci est votre nom affiché publiquement.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">* Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="votreemail@exemple.com"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_name">Nom</Label>
            <Input
              id="last_name"
              name="last_name"
              type="text"
              placeholder="Nom"
              value={userData.last_name || ''}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="first_name">Prénom</Label>
            <Input
              id="first_name"
              name="first_name"
              type="text"
              placeholder="Prénom"
              value={userData.first_name || ''}
              onChange={handleChange}
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {internalError && (
            <div className="text-red-500 text-sm">{internalError}</div>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(!open)}
            >
              Annuler
            </Button>
            <Button className="bg-green-500" type="submit">
              Sauvegarder
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
