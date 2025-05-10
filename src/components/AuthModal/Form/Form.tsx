import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronRight, Loader } from 'lucide-react';
import SocialLoginButtons from '@/components/AuthModal/SocialLoginButtons';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { FormProps } from '@/types/auth';
import { loginFn } from '@/service/auth';
import { useNavigate } from 'react-router';

const Form = ({ setActiveTab, activeTab }: FormProps) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null | undefined>();

  const login = useMutation({
    mutationFn: loginFn,
    onSuccess: () => {
      setError(null);
      navigate('/puzzles');
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ error: string }>;
      setError(axiosError.response?.data?.error || 'Une erreur est survenue');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    if (!email || !password) {
      setError(
        !email
          ? 'Vous devez fournir un email valide.'
          : 'Vous devez fournir un mot de passe.'
      );
      return;
    }
    login.mutate({ email, password });
    console.log('Login form submitted');
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
              placeholder="votreemail@exemple.com"
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
          <div className="space-y-2">
            <Label htmlFor="username">Nom d&apos;utilisateur</Label>
            <Input id="username" type="text" placeholder="votrenom" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              id="signup-email"
              type="email"
              placeholder="votreemail@exemple.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-password">Mot de passe</Label>
            <Input
              id="signup-password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
            <Input
              id="confirm-password"
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
        <span>{activeTab === 'login' ? 'Se connecter' : 'S\'inscrire'}</span>
        {login.isPending ? (
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
              onClick={() => setActiveTab('signup')}
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
              onClick={() => setActiveTab('login')}
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
