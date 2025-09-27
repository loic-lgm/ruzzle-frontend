import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { resetPassword as resetPasswordQuery } from '@/service/auth';
import { useAuthModalStore } from '@/stores/useAuthModalStore';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ChevronRight, Loader, User } from 'lucide-react';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'sonner';

const ResetPassword = () => {
  const { uuid, token } = useParams<{ uuid: string; token: string }>();
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { open } = useAuthModalStore();

  const resetPassword = useMutation({
    mutationFn: ({ password }: { password: string }) =>
      resetPasswordQuery(uuid!, token!, password),
    onSuccess: (data) => {
      toast.success(data.message || 'Mot de passe réinitialisé avec succès !');
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{
        error?: string;
      }>;
      setError(axiosError.response?.data?.error || 'Une erreur est survenue');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    setError(null);
    resetPassword.mutate({ password });
  };

  return (
    <div className="max-w-md mx-auto py-10 px-4 mt-24">
      <h1 className="text-2xl font-bold mb-6">Réinitialiser le mot de passe</h1>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">Nouveau mot de passe</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          className="w-full gradient-border-button-cta bg-white/10 text-gray-900 hover:bg-white/20 font-semibold flex items-center justify-center gap-2"
          disabled={resetPassword.isPending}
          onClick={() => {
            if (resetPassword.isSuccess) {
              open('login');
            }
          }}
        >
          {resetPassword.isSuccess ? (
            <>
              <User size={16} />
              Connexion
            </>
          ) : (
            <>
              Valider
              {resetPassword.isPending ? (
                <Loader className="animate-spin" size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
