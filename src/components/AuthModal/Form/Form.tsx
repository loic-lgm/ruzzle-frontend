import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronRight, Loader } from 'lucide-react';
import SocialLoginButtons from '@/components/AuthModal/SocialLoginButtons';
import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';

interface FormProps {
  setActiveTab: React.Dispatch<React.SetStateAction<'login' | 'signup'>>;
  activeTab: 'login' | 'signup';
}

type LoginData = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  user: {
    id: number;
    username: string;
  };
};

const loginFn = async (data: LoginData): Promise<LoginResponse> => {
  const response = await axios.post('http://127.0.0.1:8000/users/login/', data);
  return response.data;
};

/**
 * 
 * TODO
 * Mettre les types dans un fichier à part
 * Mettre loginFn dans une autre fonction
 * Utiliser une variable d'environement pour http://127.0.0.1:8000
 * Trouver un moyen d'enregistrer le token du user
 */

const Form = ({ setActiveTab, activeTab }: FormProps) => {
  const login = useMutation({
    mutationFn: loginFn,
    onSuccess: (data) => {
      console.log('Login réussi :', data);
      // exemple : localStorage.setItem('token', data.token)
    },
    onError: (error) => {
      console.error('Erreur de login :', error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    login.mutate({ email, password });
    console.log('Login form submitted');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-red-500 text-sm">
        {(login.error as AxiosError<{ error: string }>)?.response?.data?.error}
      </div>
      {activeTab === 'login' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="votreemail@exemple.com"
              required
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
              required
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
