import { ArrowLeftRight, Upload, User } from 'lucide-react';

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
    <div className="flex w-full justify-center mb-8">
      <div className="relative w-2/3">
        <div className="h-1 bg-gray-200 w-full absolute top-10 left-0 z-0" />

        <div className="relative z-10 flex justify-between items-start w-full">
          {steps.map((step, index) => {
            const isFirst = index === 0;
            const isLast = index === steps.length - 1;
            const translate = isFirst
              ? '-translate-x-1/2'
              : isLast
              ? 'translate-x-1/2'
              : '';

            return (
              <div
                key={index}
                className={`flex flex-col items-center text-center w-[250px] relative ${translate}`}
              >
                <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center z-10">
                  {step.icon}
                </div>

                <div className="mt-3 min-h-[3.5rem] max-w-[280px] w-[300px]">
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
    </div>
  );
};

export default Stepper;
