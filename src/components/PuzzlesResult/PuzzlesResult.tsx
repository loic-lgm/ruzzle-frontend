import PuzzleCard from '@/components/PuzzleCard';
import { Puzzles } from '@/types/puzzle';

interface PuzzlesResultProps {
  puzzles: Puzzles;
  displayMode: string;
}
const PuzzlesResult = ({ puzzles, displayMode }: PuzzlesResultProps) => {
  return (
    <div className="mb-16 flex justify-center flex-col m-auto max-w-7xl">
      <h2 className="text-xl font-semibold mb-4">
        {puzzles.length}{' '}
        {puzzles.length === 1 ? 'puzzle trouvé' : 'puzzles trouvés'}
      </h2>

      {displayMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {puzzles.map((puzzle) => (
            <PuzzleCard key={puzzle.id} puzzle={puzzle} />
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
