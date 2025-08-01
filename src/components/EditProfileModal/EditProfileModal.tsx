/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Camera, User } from 'lucide-react';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronRight, Loader } from 'lucide-react';
import SocialLoginButtons from '@/components/AuthModal/SocialLoginButtons';
import { AxiosError } from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { loginFn, signupFn } from '@/service/auth';
import { useNavigate } from 'react-router';
import { City } from '@/types/city';
import { fetchCities } from '@/service/city';
import { useAuthModalStore } from '@/stores/useAuthModalStore';

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userData: {
    id: string;
    name: string;
    username: string;
    email: string;
    avatar: string;
    bio?: string;
  };
}

const EditProfileModal = ({
  open,
  onOpenChange,
  userData,
}: EditProfileDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Éditer votre profil</DialogTitle>
          <DialogDescription>
            Vous pouvez modifier vos informations personnelles ici.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4">
          {/* {error && <div className="text-red-500 text-sm">{error}</div>} */}

          <div className="space-y-2">
            <Label htmlFor="username">Nom d&apos;utilisateur</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="votrenom"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Ville</Label>
            <Select>
              <SelectTrigger className="w-94">
                <SelectValue placeholder="Choisissez une ville" />
              </SelectTrigger>
              <SelectContent>{/* Options ici */}</SelectContent>
            </Select>
            <input type="hidden" name="city" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              id="signup-email"
              name="email"
              type="email"
              placeholder="votreemail@exemple.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-password">Mot de passe</Label>
            <Input
              id="signup-password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
            <Input
              id="confirm-password"
              name="confirm-password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full gradient-border-button-cta bg-white/10 text-gray-900 hover:bg-white/20 font-semibold"
          >
            Sauvegarder
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
