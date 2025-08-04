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
import { SquarePen, XCircle } from 'lucide-react';
import { Puzzles } from '@/types/puzzle';

interface PuzzleListProps {
  puzzles: Puzzles;
}

const PuzzlesList = ({ puzzles }: PuzzleListProps) => {
  //   const { toast } = useToast();

  //   const handleEdit = (puzzleId: string) => {
  // toast({
  //   title: 'Modifier le puzzle',
  //   description: "Fonctionnalité d'édition à venir",
  // });
  //   };

  //   const handleDelete = (puzzleId: string) => {
  // toast({
  //   title: 'Puzzle supprimé',
  //   description: 'Le puzzle a été retiré de votre collection',
  // });
  //   };

  return (
    <div className="space-y-4">
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
                      className="w-12 h-12 rounded object-cover"
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
                  <Badge variant="outline">{puzzle.condition}</Badge>
                </TableCell>
                <TableCell>
                  {puzzle.created &&
                    new Date(puzzle.created).toLocaleDateString('fr-FR')}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                      //   onClick={() =>
                      //     handleUpdateStatus(swap.id, 'denied', type)
                      //   }
                    >
                      <SquarePen className="h-4 w-4 text-green-500" />
                      <span className="sr-only">Annuler</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                      //   onClick={() =>
                      //     handleUpdateStatus(swap.id, 'denied', type)
                      //   }
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
    </div>
  );
};

export default PuzzlesList;
