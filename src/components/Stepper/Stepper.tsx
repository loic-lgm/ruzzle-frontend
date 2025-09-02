import { Button } from '@/components/ui/button';
import { useAuthModalStore } from '@/stores/useAuthModalStore';
import { User } from '@/types/user';
import {
  ArrowLeftRight,
  CheckCircle,
  ChevronsDown,
  ChevronsRight,
  Search,
} from 'lucide-react';
import { useNavigate } from 'react-router';

const steps = [
  {
    title: 'Explorer',
    description:
      'Parcourez les puzzles disponibles et trouvez celui qui vous plaît.',
    icon: <Search className="h-8 w-8" />,
  },
  {
    title: 'Demandez un échange',
    description: 'Sélectionnez votre puzzle et envoyez une demande.',
    icon: <ArrowLeftRight className="h-8 w-8" />,
  },
  {
    title: "Validez l'échange",
    description: "Discutez, rencontrez et finalisez l'échange facilement.",
    icon: <CheckCircle className="h-8 w-8" />,
  },
];

interface StepperProps {
  user: User | null;
}

const Stepper = ({ user }: StepperProps) => {
  const navigate = useNavigate();
  const { open } = useAuthModalStore();
  const handleStartNow = () => {
    if (user) {
      navigate('ajouter-un-puzzle');
    } else {
      open();
    }
  };
  return (
    <section
      className="flex flex-col justify-center items-center min-h-[calc(100vh-160px)] w-full scroll-mt-24 gap-5"
      id="comment-ca-marche"
    >
      <h2 className="text-4xl font-bold bg-gradient-to-r from-lime-500 via-green-500 to-teal-500 bg-clip-text text-transparent mt-8 md:mb-30">
        Comment ça marche ?
      </h2>

      <div className="flex flex-col md:flex-row justify-between items-center gap-10 max-w-5xl w-full">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center max-w-xs"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-bl from-lime-500 to-green-500 text-white flex items-center justify-center mb-4">
              {step.icon}
            </div>
            <h3 className="text-lg font-semibold">{step.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="md:mt-12 flex gap-4">
        <Button
          variant="custom"
          className="group px-7 py-4 bg-gradient-to-r from-teal-500/10 to-green-500/10 rounded-full text-gray-800 text-lg"
          size="custom"
        >
          <a href="#decouvrir">
            <ChevronsDown className="transition-transform duration-300 group-hover:translate-y-1" />
          </a>
        </Button>
        <Button
          variant="custom"
          className="group px-7 py-4 bg-gradient-to-r from-green-500/10 to-lime-500/10 rounded-full text-gray-800 text-lg"
          size="custom"
          onClick={handleStartNow}
        >
          Commencer maintenant
          <ChevronsRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    </section>
  );
};

export default Stepper;
