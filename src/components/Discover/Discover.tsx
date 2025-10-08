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
    <div
      id="decouvrir"
      className="flex flex-col justify-center items-center min-h-screen scroll-mt-24 pt-10"
    >
      <p className="text-4xl mb-2 sm:mb-4 font-bold bg-gradient-to-r from-lime-500 via-teal-500 to-green-500 bg-clip-text text-transparent animate-slide-up mt-8 md:mb-0 px-6 sm:px-0 text-center">
        Découvre la collection
      </p>
      <p className="text-lg mb-4 sm:mb-10 text-center">
        Choisis parmi des dizaines de puzzles prêts à changer de mains.
      </p>
      <div className="flex flex-col items-center justify-center flex-wrap gap-3 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 sm:mt-15 sm:mb-15 px-8">
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
