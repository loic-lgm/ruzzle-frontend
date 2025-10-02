import PuzzleCard from '@/components/PuzzleCard';
import { Puzzle, Puzzles } from '@/types/puzzle';
import { User } from '@/types/user';
import React from 'react';

interface PuzzlesResultProps {
  puzzles: Puzzles;
  displayMode: string;
  setSelectedPuzzle: React.Dispatch<React.SetStateAction<Puzzle | null>>;
  user: User | null;
  count: number;
}
const PuzzlesResult = ({
  puzzles,
  displayMode,
  setSelectedPuzzle,
  user,
  count,
}: PuzzlesResultProps) => {
  return (
    <div className="mb-16 flex justify-center flex-col m-auto max-w-7xl px-5 sm:px-2 lg:px-0">
      <h2 className="text-xl font-semibold mb-4">
        {count < 1 && 'Aucun puzzle trouvé'}
        {count === 1 && `${count} puzzle trouvé`}
        {count > 1 && `${count} puzzles trouvés`}
      </h2>

      {displayMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {puzzles.map((puzzle) => (
            <PuzzleCard
              key={puzzle.id}
              puzzle={puzzle}
              setSelectedPuzzle={setSelectedPuzzle}
              user={user}
            />
          ))}
        </div>
      ) : (
        // <PuzzleCarousels filters={filters} />
        ''
      )}
    </div>
  );
};

export default PuzzlesResult;
