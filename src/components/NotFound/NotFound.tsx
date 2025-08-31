import { Button } from '@/components/ui/button';
import { Ghost, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

interface NotFoundType {
  type: 'puzzle' | 'user'
}

const NotFound = ({ type }: NotFoundType) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center bg-gray-50 px-4 text-center">
      <div className="glass-card p-10 rounded-2xl max-w-md">
        <Ghost className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          {type == 'puzzle' ? 'Puzzle introuvable' : 'Utilisateur introuvable'}
        </h1>
        <p className="text-gray-600 mb-6">
          {type == 'puzzle'
            ? 'Le puzzle que vous recherchez n’existe pas, a été échangé ou supprimé.'
            : "L'utilisateur que vous recherchez n’existe pas ou a été supprimé."}
        </p>
        <Button
          onClick={() => navigate('/')}
          className="bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-teal-500 hover:to-green-500 text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à l’accueil
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
