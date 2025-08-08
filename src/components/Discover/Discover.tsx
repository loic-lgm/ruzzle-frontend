import PuzzleCard from '@/components/PuzzleCard';
import { Puzzle } from '@/types/puzzle';
import { User } from '@/types/user';
import { ArrowRight } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

interface RandomPuzzlesProps {
  randomPuzzles: Puzzle[];
  user: User | null;
  setSelectedPuzzle: React.Dispatch<React.SetStateAction<Puzzle | null>>;
}

const Discover = ({
  randomPuzzles,
  user,
  setSelectedPuzzle,
}: RandomPuzzlesProps) => {
  return (
    <div className="flex flex-col items-center mt-50 mb-15">
      <p className="text-4xl mb-4 font-bold bg-gradient-to-r from-lime-500 via-teal-500 to-green-500 bg-clip-text text-transparent animate-slide-up">
        Découvrez les puzzles
      </p>
      <p className="text-lg mb-10">
        Parcourez notre vaste collection de puzzles de haute qualité prêts à
        être échangés.
      </p>
      <div className="flex flex-col items-center justify-center flex-wrap gap-3 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-15 mb-15 px-8">
          {randomPuzzles.map((puzzle) => (
            <PuzzleCard
              setSelectedPuzzle={setSelectedPuzzle}
              key={puzzle.id}
              puzzle={puzzle}
              user={user}
            />
          ))}
        </div>
        <Link
          to="/puzzles"
          className="group inline-flex items-center gap-2 text-green-500 font-medium text-lg hover:text-teal-500 transition-colors"
        >
          Voir tous les puzzles
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default Discover;
