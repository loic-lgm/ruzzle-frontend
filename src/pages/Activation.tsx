import {
  CheckCircle2,
  Mail,
  ArrowRight,
  Puzzle,
  Loader,
  XCircle,
  UserPlus,
  Home,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate, useParams } from 'react-router';
import { useValidation } from '@/hooks/useValidation';
import { useAuthModalStore } from '@/stores/useAuthModalStore';
import useUserStore from '@/stores/useUserStore';
import { useEffect } from 'react';

const Activation = () => {
  const { uuid, token } = useParams();
  const user = useUserStore((state) => state.user);
  const { open } = useAuthModalStore();
  const navigate = useNavigate();
  const { isLoading, isError } = useValidation(uuid!, token!);

   useEffect(() => {
      if (user) {
        navigate('/mon-espace');
      }
    }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md p-8 text-center bg-card/80 backdrop-blur-sm border-border/50 shadow-2xl animate-scale-in">
          <div className="mb-6">
            {!isLoading && !isError && (
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-1 animate-fade-in">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
            )}
            {isError && (
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-full mb-1 animate-fade-in">
                <XCircle className="w-10 h-10 text-white" />
              </div>
            )}
            {isLoading && (
              <div className="flex justify-center">
                <Loader className="animate-spin text-green-500" size={64} />
              </div>
            )}
          </div>
          <div className="space-y-4 animate-fade-in delay-200">
            {!isLoading && !isError && (
              <>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-lime-500 via-emerald-500 to-green-500 bg-clip-text text-transparent">
                  Compte activé !
                </h1>
                <p className="text-muted-foreground text-lg">
                  Félicitations ! Votre compte a été activé avec succès.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground/80 py-4">
                  <Mail className="w-4 h-4" />
                  <span>Vérification par email terminée</span>
                </div>
              </>
            )}
            {isError && (
              <>
                <h1 className="text-3xl font-bold text-red-500">
                  Lien invalide ou expiré
                </h1>
                <p className="text-muted-foreground text-lg">
                  Le lien de validation que vous avez utilisé n&apos;est plus
                  valide ou a expiré.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground/80 py-4">
                  <Mail className="w-4 h-4" />
                  <span>Vérification par email échouée</span>
                </div>
              </>
            )}
            {isLoading && (
              <>
                <div>
                  <p className="text-muted-foreground text-lg">
                    Activation en cours
                  </p>
                  <p className="text-muted-foreground/80">
                    Cette action peut prendre quelque temps, veuillez patientez
                    ou contacter le support.
                  </p>
                </div>
              </>
            )}
          </div>
          {!isLoading && (
            <>
              <div className="space-y-3 mt-8 animate-fade-in delay-300">
                <Button
                  asChild
                  className="w-full h-12 gradient-border-button-cta transition-all duration-300 group hover:bg-muted/50"
                  onClick={() => (!isError ? open('login') : open('signup'))}
                >
                  {!isError ? (
                    <div className="flex items-center justify-center gap-2">
                      <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      Connexion
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      Créer un nouveau compte
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="w-full h-11 border-border/50 hover:bg-muted/50 transition-all duration-300"
                  onClick={() =>
                    !isError ? navigate('/puzzles') : navigate('/')
                  }
                >
                  {!isError ? (
                    <div className="flex items-center justify-center gap-2">
                      <Puzzle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      Accéder à la marketplace
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      Retour à l&apos;accueil
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
              </div>
              <div className="mt-8 pt-6 border-t border-border/30 animate-fade-in delay-500">
                {!isError ? (
                  <p className="text-xs text-muted-foreground/60">
                    Vous pouvez maintenant publier des puzzles et échanger avec
                    d&apos;autres utilisateurs !
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground/60">
                    Si le problème persiste, contactez notre support client pour
                    obtenir de l&apos;aide.
                  </p>
                )}
              </div>
            </>
          )}
        </Card>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
    </div>
  );
};

export default Activation;
