import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronRight, Loader } from 'lucide-react';
import SocialLoginButtons from '@/components/AuthModal/SocialLoginButtons';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { loginFn, signupFn } from '@/service/auth';
import { Link, useLocation, useNavigate } from 'react-router';
import { City } from '@/types/city';
import { useAuthModalStore } from '@/stores/useAuthModalStore';
import useUserStore from '@/stores/useUserStore';
import { AVATARS } from '@/utils/constants';
import { toast } from 'sonner';
import { isValidEmail } from '@/utils/isValideEmail';
import { forgotPassword as forgotPasswordQuery } from '@/service/auth';
import { Checkbox } from '@/components/ui/checkbox';
import CityAutocomplete from '@/components/CityAutoComplete';

interface FormProps {
  close?: () => void;
}

const Form = ({ close }: FormProps) => {
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const { activeTab, switchTab } = useAuthModalStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [selectedCityData, setSelectedCityData] = useState<City | null>(null);
  const [error, setError] = useState<string | null>('');
  const setUser = useUserStore((state) => state.setUser);
  const location = useLocation();

  const login = useMutation({
    mutationFn: loginFn,
    onSuccess: (data) => {
      setError(null);
      setUser(data.user);
      close?.();
      if (location.pathname == '/') {
        navigate('/puzzles');
      }
      if (location.pathname.startsWith('/reset-password')) {
        navigate('/mon-espace');
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
        'Inscription réussie ! Validez votre compte par email pour vous connecter.',
        { duration: 8000 }
      );
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

  const forgotPassword = useMutation({
    mutationFn: forgotPasswordQuery,
    onSuccess: (data) => {
      setError(null);
      toast.success(data.message, { duration: 8000 });
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{
        error?: string;
      }>;
      setError(axiosError.response?.data?.error || 'Une erreur est survenue');
    },
  });

  const handleForgotPassword = (email: string) => {
    forgotPassword.mutate(email);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmedPassword = formData.get('confirm-password') as string;
    const username = formData.get('username') as string;
    const firstname = formData.get('firstname') as string;
    const name = formData.get('name') as string;

    if (!isValidEmail(email)) {
      setError('Vous devez fournir un email valide.');
      return;
    }

    if (!email || !password) {
      setError(
        !email
          ? 'Vous devez fournir un email.'
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
      if (!selectedCityData) {
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
      if (!termsAccepted) {
        setError(
          'Vous devez accepter les conditions d’utilisation pour vous inscrire.'
        );
        return;
      }
      signup.mutate({
        username,
        email,
        password,
        city_name: selectedCityData!.name,
        postal_code: selectedCityData!.postal_code,
        latitude: selectedCityData!.latitude,
        longitude: selectedCityData!.longitude,
        image: AVATARS[Math.floor(Math.random() * AVATARS.length)],
        first_name: firstname,
        last_name: name,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {activeTab === 'login' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@exemple.com"
            />
          </div>
          <div className="space-y-2">
            <div className="flex sm:justify-between sm:items-center sm:flex-row flex-col-reverse">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="flex flex-col items-end">
                {!isValidEmail(email) && (
                  <p className="text-xs text-gray-500 mb-1">
                    Saisir un email valide pour activer ce lien
                  </p>
                )}
                <a
                  className={`text-sm text-green-500 ${
                    !isValidEmail(email)
                      ? 'opacity-50 cursor-default'
                      : 'hover:underline cursor-pointer'
                  }`}
                  onClick={(e) => {
                    if (!isValidEmail(email)) {
                      e.preventDefault();
                    } else {
                      handleForgotPassword(email);
                    }
                  }}
                >
                  Mot de passe oublié ?
                </a>
              </div>
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
                  placeholder="johndoe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nom</Label>
                <Input id="name" name="name" type="text" placeholder="Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstname">Prénom</Label>
                <Input
                  id="firstname"
                  name="firstname"
                  type="text"
                  placeholder="John"
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
                />
              </div>
              <div className="space-y-2 sm:w-1/2 min-w-0">
                <CityAutocomplete
                  onSelectCity={(city) => setSelectedCityData(city)}
                />
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
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
            <Input
              id="confirm-password"
              name="confirm-password"
              type="password"
              placeholder="••••••••"
            />
          </div>
          <div className="flex items-start space-x-3 rounded-lg border border-gray-200 bg-white/20 p-4 shadow-sm hover:shadow transition">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(!!checked)}
              className="mt-0.5 border-gray-300 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-700 leading-snug cursor-pointer"
            >
              J’accepte les{' '}
              <Link
                to="/conditions"
                target="_blank"
                className="text-green-500 font-semibold hover:underline"
              >
                conditions d’utilisation
              </Link>
            </label>
          </div>
        </>
      )}
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button
        type="submit"
        className="w-full gradient-border-button-cta bg-white/10 text-gray-900 hover:bg-white/20 font-semibold"
        disabled={activeTab === 'signup' && !termsAccepted}
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
            Pas encore de compte ?{' '}
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
