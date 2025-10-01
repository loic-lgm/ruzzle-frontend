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
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
  const navigate = useNavigate();

  const deletePuzzle = useMutation({
    mutationFn: deletePuzzleFn,
    onSuccess: () => {
      toast.success('Puzzle supprimé avec succès !');
      queryClient.invalidateQueries({ queryKey: ['userPuzzles'] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
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

      {/* MOBILE */}
      <div className="block md:hidden space-y-4">
        {puzzles.map((puzzle) => (
          <Card
            key={puzzle.id}
            className="overflow-hidden shadow-sm border border-gray-200"
          >
            <div
              className="relative aspect-[4/3] cursor-pointer"
              onClick={() => navigate(`/puzzles/${puzzle.hashid}`)}
            >
              <img
                src={puzzle.image}
                alt={puzzle.image}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex justify-between items-center">
                <div>
                  <span>
                    {puzzle.brand.name} • {puzzle.categories[0]?.name}
                  </span>
                </div>
                <div className="flex gap-2">
                  {puzzle.status == 'pending' && (
                    <Button size="icon" variant="secondary" className="h-8 w-8">
                      <Hourglass className="h-4 w-4 text-green-500" />
                    </Button>
                  )}
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8"
                    onClick={() =>
                      handleActions(puzzle.hashid!, 'update', puzzle)
                    }
                  >
                    <SquarePen className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8"
                    onClick={() =>
                      handleActions(puzzle.hashid!, 'delete', puzzle)
                    }
                  >
                    <XCircle className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription className="flex flex-col gap-2">
                <div className='flex gap-1'>
                  <Badge variant="outline">
                    {
                      CONDITION.find((cond) => cond.id === puzzle.condition)
                        ?.name
                    }
                  </Badge>
                  <Badge variant="secondary">{puzzle.piece_count} pièces</Badge>
                </div>
                <div>
                  Ajouté le{' '}
                  {puzzle.created &&
                    new Date(puzzle.created).toLocaleDateString('fr-FR')}
                </div>
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      {/* DESKTOP */}
      <div className="hidden md:block overflow-x-auto">
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
                        {puzzle.brand.name} • {puzzle.categories[0]?.name}
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
                    {puzzle.status == 'pending' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 bg-accent cursor-default"
                      >
                        <Hourglass className="size-4 text-green-500" />
                      </Button>
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
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() =>
                        handleActions(puzzle.hashid!, 'delete', puzzle)
                      }
                    >
                      <XCircle className="h-4 w-4 text-red-500" />
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
