import { Button } from '@/components/ui/button';
import { useAuthModalStore } from '@/stores/useAuthModalStore';
import { User } from '@/types/user';
import {
  ArrowLeftRight,
  ChevronsRight,
  Upload,
  User as UserIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router';

const steps = [
  {
    title: 'Créez un compte',
    description: 'Inscrivez gratuitement en quelques secondes seulement.',
    icon: <UserIcon />,
  },
  {
    title: 'Montrez vos puzzles',
    description:
      'Partagez vos puzzles et connectez-vous avec des milliers de passionnés.',
    icon: <Upload />,
  },
  {
    title: 'Échangez et amusez vous',
    description: 'Trouvez les puzzles que vous aimez et faites des échanges.',
    icon: <ArrowLeftRight />,
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
      className="flex flex-col items-center w-full mb-15 scroll-mt-24"
      id="how-it-works"
    >
      <p className="text-4xl mb-30 font-bold bg-gradient-to-r from-lime-500 via-green-500 to-teal-500 bg-clip-text text-transparent animate-slide-up">
        Comment ça marche ?
      </p>
      <div className="relative w-[900px]">
        <svg
          className="absolute top-7 left-0 w-full h-10 z-0"
          viewBox="0 0 1000 100"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d=" M0,50 C 125,0 125,100 250,50 S 375,0 500,50 S 625,100 750,50 S 875,0 1000,50"
            stroke="#e5e7eb"
            strokeWidth="16"
            fill="transparent"
          />
        </svg>

        <div className="relative z-10 h-40 w-full">
          {steps.map((step, index) => {
            const total = steps.length - 1;
            const leftPercent = (index / total) * 100;

            return (
              <div
                key={index}
                className="absolute flex flex-col items-center text-center"
                style={{
                  left: `${leftPercent}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-bl from-lime-500 to-green-500 text-white flex items-center justify-center transition-transform duration-200 ease-in-out hover:scale-110">
                  {step.icon}
                </div>

                <div className="mt-3 w-[300px]">
                  <div className="text-base font-medium">{step.title}</div>
                  <div className="text-sm text-gray-600">
                    {step.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-30">
        <Button
          variant="custom"
          className="group px-8 py-4 bg-gradient-to-r from-green-500/10 to-lime-500/10 rounded-full text-gray-800 text-lg"
          size="custom"
          onClick={handleStartNow}
        >
          Démarrer maintenant
          <ChevronsRight className="transition-transform duration-300 group-hover:scale-140" />
        </Button>
      </div>
    </section>
  );
};

export default Stepper;
