import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { useMutation } from '@tanstack/react-query';
import { loginFn, signupFn } from '@/service/auth';
import { useLocation, useNavigate } from 'react-router';
import { City } from '@/types/city';
import { useAuthModalStore } from '@/stores/useAuthModalStore';
import useUserStore from '@/stores/useUserStore';
import { useCities } from '@/hooks/useCities';
import { AVATARS } from '@/utils/constants';
import { toast } from 'sonner';

interface FormProps {
  close?: () => void;
}

const Form = ({ close }: FormProps) => {
  const { activeTab, switchTab } = useAuthModalStore();
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [error, setError] = useState<string | null>('');
  const setUser = useUserStore((state) => state.setUser);
  const location = useLocation();
  const { data: cities } = useCities();

  const login = useMutation({
    mutationFn: loginFn,
    onSuccess: (data) => {
      setError(null);
      setUser(data.user);
      close?.();
      if (location.pathname == '/') {
        navigate('/puzzles');
      }
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ error: string }>;
      setError(axiosError.response?.data?.error || 'Une erreur est survenue');
    },
  });

  const signup = useMutation({
    mutationFn: signupFn,
    onSuccess: () => {
      setError(null);
      close?.();
      toast.success(
        'Inscription réussie ! Validez votre compte par email pour vous connecter.'
      ,{duration: 8000});
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{
        error?: string;
        username?: string;
        email?: string;
      }>;
      setError(
        axiosError.response?.data?.error ||
          axiosError.response?.data?.username ||
          axiosError.response?.data?.email ||
          'Une erreur est survenue'
      );
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmedPassword = formData.get('confirm-password') as string;
    const username = formData.get('username') as string;
    const city = formData.get('city') as string;
    const firstname = formData.get('firstname') as string;
    const name = formData.get('name') as string;

    if (!email || !password) {
      setError(
        !email
          ? 'Vous devez fournir un email valide.'
          : 'Vous devez fournir un mot de passe.'
      );
      return;
    }
    if (activeTab == 'login') {
      login.mutate({ email, password });
    }
    if (activeTab == 'signup') {
      if (!confirmedPassword || !username) {
        setError(
          !confirmedPassword
            ? 'Les mots de passe doivent être identiques.'
            : "Vous devez fournir un nom d'utilisateur"
        );
        return;
      }
      if (!username) {
        setError("Vous devez renseigner un nom d'utilisateur");
      }
      if (/\s/.test(username)) {
        setError("Le nom d'utlisateur ne doit pas contenir d'espace.");
      }
      if (!city) {
        setError('Vous devez renseigner une ville');
        return;
      }
      if (!name || !firstname) {
        setError(
          !name
            ? 'Vous devez renseigner votre nom.'
            : 'Vous devez renseigner votre prénom.'
        );
        return;
      }
      signup.mutate({
        username,
        email,
        password,
        city_id: city,
        image: AVATARS[Math.floor(Math.random() * AVATARS.length)],
        first_name: firstname,
        last_name: name,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {activeTab === 'login' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="email@exemple.com"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Mot de passe</Label>
              <a
                href="#forgot-password"
                className="text-sm text-green-500 hover:underline"
              >
                Mot de passe oublié ?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              name="password"
            />
          </div>
        </>
      )}
      {activeTab === 'signup' && (
        <>
          <div className="flex gap-5 flex-col">
            <div className="flex gap-5 flex flex-col sm:flex-row gap-5">
              <div className="space-y-2">
                <Label htmlFor="username">Nom d&apos;utilisateur</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Nom d'utilisateur"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nom</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nom"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstname">Prénom</Label>
                <Input
                  id="firstname"
                  name="firstname"
                  type="text"
                  placeholder="Prénom"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="space-y-2 sm:w-1/2 min-w-0">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  name="email"
                  type="email"
                  placeholder="email@exemple.com"
                  required
                />
              </div>
              <div className="space-y-2 sm:w-1/2 min-w-0">
                <Label>Ville</Label>
                <Select onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-94 bg-transparent w-full">
                    <SelectValue placeholder="Choississez une ville" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities &&
                      cities.map((city: City) => (
                        <SelectItem
                          key={city.id}
                          value={city.id.toString()}
                          className="hover:bg-accent hover:text-accent-foreground"
                        >
                          {city.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <input type="hidden" name="city" value={selectedCity} />
              </div>
            </div>
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
        </>
      )}
      <Button
        type="submit"
        className="w-full gradient-border-button-cta bg-white/10 text-gray-900 hover:bg-white/20 font-semibold"
      >
        <span>{activeTab === 'login' ? 'Se connecter' : "S'inscrire"}</span>
        {login.isPending || signup.isPending ? (
          <Loader className="animate-spin" size={16} />
        ) : (
          <ChevronRight size={16} />
        )}
      </Button>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 text-gray-500 rounded-sm">
            Ou continuer avec
          </span>
        </div>
      </div>
      <SocialLoginButtons />
      <div className="text-center mt-4">
        {activeTab === 'login' && (
          <p className="text-sm text-gray-600">
            Vous n&apos;avez pas de compte ?{' '}
            <button
              type="button"
              onClick={() => switchTab('signup')}
              className="text-green-500 hover:underline font-medium"
            >
              S&apos;inscrire
            </button>
          </p>
        )}
        {activeTab === 'signup' && (
          <p className="text-sm text-gray-600">
            Vous avez déjà un compte ?{' '}
            <button
              type="button"
              onClick={() => switchTab('login')}
              className="text-green-500 hover:underline font-medium"
            >
              Connexion
            </button>
          </p>
        )}
      </div>
    </form>
  );
};

export default Form;
