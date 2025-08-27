import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Hourglass, SquarePen, XCircle } from 'lucide-react';
import { Puzzle, Puzzles } from '@/types/puzzle';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePuzzleFn } from '@/service/puzzle';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import EditPuzzleModal from '@/components/EditPuzzleModal';
import { Category } from '@/types/category';
import { Brand } from '@/types/brand';
import { CONDITION } from '@/utils/constants';
import { useSwapsRefresh } from '@/hooks/useSwapsRefresh';
import { useNavigate } from 'react-router';

interface PuzzleListProps {
  puzzles: Puzzles;
  categories: Category[];
  brands: Brand[];
}

const PuzzlesList = ({ puzzles, categories, brands }: PuzzleListProps) => {
  const [error, setError] = useState<string>('');
  const [isEditPuzzleOpen, setIsEditPuzzleOpen] = useState<boolean>(false);
  const [selectedPuzzle, setSelectedPuzzle] = useState<Puzzle | null>();
  const queryClient = useQueryClient();
  const { refreshSwaps } = useSwapsRefresh();
  const navigate = useNavigate()

  const deletePuzzle = useMutation({
    mutationFn: deletePuzzleFn,
    onSuccess: () => {
      toast.success('Puzzle supprimé avec succès !');
      queryClient.invalidateQueries({ queryKey: ['userPuzzles'] });
      refreshSwaps('received', selectedPuzzle!.owner.id);
      refreshSwaps('sent', selectedPuzzle!.owner.id);
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ error: string }>;
      toast.success('Une erreur est survenue !');
      setError(axiosError.response?.data?.error || 'Une erreur est survenue');
    },
  });

  const handleActions = (hashId: string, type: string, puzzle?: Puzzle) => {
    if (type === 'delete') {
      setSelectedPuzzle(puzzle);
      deletePuzzle.mutate(hashId);
    }
    if (type === 'update') {
      setIsEditPuzzleOpen(true);
      setSelectedPuzzle(puzzle);
    }
  };

  return (
    <div className="space-y-4">
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Puzzle</TableHead>
              <TableHead>Nombre de pièces</TableHead>
              <TableHead>État</TableHead>
              <TableHead>Date d&apos;ajout</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {puzzles.map((puzzle) => (
              <TableRow key={puzzle.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={puzzle.image}
                      alt={puzzle.image}
                      className="w-12 h-12 rounded object-cover cursor-pointer"
                      onClick={() => navigate(`/puzzles/${puzzle.hashid}`)}
                    />
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {puzzle.brand.name} • {puzzle.category.name}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{puzzle.piece_count} pièces</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {
                      CONDITION.find((cond) => cond.id === puzzle.condition)
                        ?.name
                    }
                  </Badge>
                </TableCell>
                <TableCell>
                  {puzzle.created &&
                    new Date(puzzle.created).toLocaleDateString('fr-FR')}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2 items-center">
                    {puzzle.status != 'pending' && (
                      <>
                        <Hourglass className="size-4 text-green-500" />
                        <span className="sr-only">En cours de transaction</span>
                      </>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() =>
                        handleActions(puzzle.hashid!, 'update', puzzle)
                      }
                    >
                      <SquarePen className="h-4 w-4" />
                      <span className="sr-only">Éditer</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => handleActions(puzzle.hashid!, 'delete', puzzle)}
                    >
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Supprimer</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {puzzles.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Vous n&apos;avez pas encore ajouté de puzzles à votre collection.
        </div>
      )}
      {isEditPuzzleOpen && selectedPuzzle && (
        <EditPuzzleModal
          open={isEditPuzzleOpen}
          onOpenChange={setIsEditPuzzleOpen}
          puzzle={selectedPuzzle}
          categories={categories}
          brands={brands}
        />
      )}
    </div>
  );
};

export default PuzzlesList;
