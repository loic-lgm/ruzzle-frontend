import PuzzleCard from '@/components/PuzzleCard';
import { Puzzle, Puzzles } from '@/types/puzzle';
import { User } from '@/types/user';
import React from 'react';

interface PuzzlesResultProps {
  puzzles: Puzzles;
  displayMode: string;
  setSelectedPuzzle: React.Dispatch<React.SetStateAction<Puzzle | null>>;
  user: User | null;
}
const PuzzlesResult = ({
  puzzles,
  displayMode,
  setSelectedPuzzle,
  user,
}: PuzzlesResultProps) => {
  return (
    <div className="mb-16 flex justify-center flex-col m-auto max-w-7xl">
      <h2 className="text-xl font-semibold mb-4">
        {puzzles.length < 1 && 'Aucun puzzle trouvé'}
        {puzzles.length === 1 && `${puzzles.length} puzzle trouvé`}
        {puzzles.length > 1 && `${puzzles.length} puzzles trouvés`}
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
