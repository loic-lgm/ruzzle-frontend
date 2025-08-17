import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, CheckCircle, XCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SwapRow, SwapStatus, SwapType } from '@/types/swap';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSwap } from '@/service/swap';
import { toast } from 'sonner';
import { useSwapsRefresh } from '@/hooks/useSwapsRefresh';
import { User } from '@/types/user';
import { useNavigate } from 'react-router';

interface ExchangeRequestsListProps {
  type: SwapType;
  swaps: SwapRow[];
  user: User;
}

const SwapRequests = ({ type, swaps, user }: ExchangeRequestsListProps) => {
  const { refreshSwaps } = useSwapsRefresh();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const update = useMutation({
    mutationFn: ({
      payload,
      exchangeId,
    }: {
      payload: SwapStatus;
      exchangeId: number;
      type: 'sent' | 'received';
    }) => updateSwap({ payload, exchangeId }),
    onSuccess: (_, variables) => {
      if (variables.payload == 'denied') {
        toast.success('Échange annulé !');
      }
      if (variables.payload == 'accepted') {
        toast.success('Échange accepté !');
        queryClient.invalidateQueries({
          queryKey: ['completed-swaps', user.id],
        });
        queryClient.invalidateQueries({
          queryKey: ['userPuzzles'],
        });
      }
      refreshSwaps(variables.type, user.id);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleUpdateStatus = (
    id: number,
    status: 'accepted' | 'denied',
    type: 'sent' | 'received'
  ) => {
    update.mutate({ exchangeId: id, payload: status, type: type });
  };

  if (swaps.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No {type} exchange requests found.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Membre</TableHead>
            <TableHead>Son puzzle</TableHead>
            <TableHead>Votre puzzle</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            {type != 'completed' && (
              <TableHead className="text-right">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {swaps.map((swap) => (
            <TableRow key={swap.id}>
              <TableCell className="py-6">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => navigate(`/profil/${swap.user.username}`)}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={swap.user.avatar}
                      alt={swap.user.username}
                    />
                    <AvatarFallback>
                      {swap.user.username.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{swap.user.username}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    src={swap.forPuzzle.image}
                    alt="Miniature du puzzle"
                    className="h-12 w-12 object-cover rounded-md shadow-sm border"
                  />
                  <div>
                    <p className="text-sm text-gray-500">
                      {swap.forPuzzle.pieceCount} pièces
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    src={swap.puzzle.image}
                    alt="Miniature du puzzle"
                    className="h-12 w-12 object-cover rounded-md shadow-sm border"
                  />
                  <div>
                    <p className="text-sm text-gray-500">
                      {swap.puzzle.pieceCount} pièces
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{swap.date}</TableCell>
              <TableCell>
                {swap.status === 'pending' ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <span className="mr-1">●</span> En attente
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <span className="mr-1">●</span> Terminé
                  </span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {type === 'received' && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() =>
                        handleUpdateStatus(swap.id, 'accepted', type)
                      }
                    >
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="sr-only">Accepter</span>
                    </Button>
                  )}
                  {type != 'completed' && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                      >
                        <MessageSquare className="h-4 w-4 text-blue-500" />
                        <span className="sr-only">Message</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() =>
                          handleUpdateStatus(swap.id, 'denied', type)
                        }
                      >
                        <XCircle className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Refuser</span>
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SwapRequests;
