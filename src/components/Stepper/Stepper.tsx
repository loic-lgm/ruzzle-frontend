import { Button } from '@/components/ui/button';
import { ArrowLeftRight, ChevronsRight, Upload, User } from 'lucide-react';

const steps = [
  {
    title: 'Créez un compte',
    description: 'Inscrivez gratuitement en quelques secondes seulement.',
    icon: <User />,
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

const Stepper = () => {
  return (
    <section
      className="flex flex-col items-center w-full mb-15 scroll-mt-24"
      id="stepper"
    >
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

      <div className="mt-15">
        <Button className="px-10 py-6 border-2 border-lime-400 bg-tranparent text-gray-900 hover:border-green-500 hover:bg-transparent text-lg">
          Démarrer maintenant
          <ChevronsRight />
        </Button>
      </div>
    </section>
  );
};

export default Stepper;
