import AlertDialogSwap from '@/components/AlertDialogSwap';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { updateSwap } from '@/service/swap';
import { Swap } from '@/types/swap';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowRightLeft, Check, Clock, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface MessageExchangeType {
  swap: Swap;
  isRequester: boolean;
  setDisableConversation: (value: boolean) => void;
  disableConversation: boolean
}

const MessageExchange = ({ swap, isRequester, setDisableConversation, disableConversation }: MessageExchangeType) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [action, setAction] = useState<'accepted' | 'denied' | null>(null);
  const myPuzzle = isRequester ? swap.puzzle_proposed : swap.puzzle_asked;
  const otherPuzzle = isRequester ? swap.puzzle_asked : swap.puzzle_proposed;
  const queryClient = useQueryClient();

  const update = useMutation({
    mutationFn: ({ status }: { status: 'accepted' | 'denied' }) =>
      updateSwap({ exchangeId: swap.id, payload: status }),
    onSuccess: (_, variables) => {
      const { status } = variables;

      if (status === 'accepted') {
        toast.success('Échange accepté');
        queryClient.invalidateQueries({
          queryKey: ['conversation-swaps', swap.conversation_id],
        });
        if (!isRequester) {
          queryClient.invalidateQueries({
            queryKey: ['swap-requests-received'],
          });
        } else {
          queryClient.invalidateQueries({ queryKey: ['swap-requests-sent'] });
        }

        queryClient.invalidateQueries({ queryKey: ['completed-swaps'] });
      }

      if (status === 'denied') {
        toast.success('Échange refusé');
        queryClient.invalidateQueries({
          queryKey: ['conversation-swaps', swap.conversation_id],
        });
        if (!isRequester) {
          queryClient.invalidateQueries({
            queryKey: ['swap-requests-received'],
          });
        } else {
          queryClient.invalidateQueries({ queryKey: ['swap-requests-sent'] });
        }
      }
    },
    onError: (err) => {
      console.error(err);
      toast.error("Une erreur s'est produite");
    },
  });

  const handleConfirm = () => {
    if (!action) return;
    update.mutate({ status: action });
    setAlertOpen(false);
  };
  return (
    <Card className="mx-4 m-2 border border-border/50">
      <CardContent className="px-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium">Échange proposé</span>
          </div>
          <Badge
            variant={swap.status === 'accepted' ? 'default' : 'secondary'}
            className="text-xs"
          >
            {swap.status === 'accepted' ? (
              <>
                <Check className="h-3 w-3 mr-1" />
                Accepté
              </>
            ) : swap.status === 'rejected' ? (
              <>
                <X className="h-3 w-3 mr-1" />
                Refusé
              </>
            ) : (
              <>
                <Clock className="h-3 w-3 mr-1" />
                En attente
              </>
            )}
          </Badge>
        </div>

        <div className="flex items-center justify-around">
          <div className="flex items-center gap-2">
            <img
              src={myPuzzle.image}
              alt={myPuzzle.title}
              className="w-15 h-15 object-cover rounded border"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium truncate">
                {myPuzzle.category.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {myPuzzle.piece_count} pièces
              </p>
            </div>
          </div>

          <div className="flex-shrink-0">
            <ArrowRightLeft className="h-4 w-4 text-green-500" />
          </div>

          <div className="flex items-center gap-2">
            <img
              src={otherPuzzle.image}
              alt={otherPuzzle.title}
              className="w-15 h-15 object-cover rounded border"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium truncate">
                {otherPuzzle.category.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {otherPuzzle.piece_count} pièces
              </p>
            </div>
          </div>
        </div>

        {swap.status === 'pending' && (
          <div className="flex gap-2 mt-4 justify-center">
            <Button
              variant="outline"
              size="sm"
              className="text-red-500 border-red-500 hover:bg-red-50 hover:text-red-500"
              onClick={() => {
                setAction('denied');
                setAlertOpen(true);
                setDisableConversation(true);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
            {!isRequester && (
              <Button
                size="sm"
                className="bg-green-500 hover:bg-emerald-500"
                onClick={() => {
                  setAction('accepted');
                  setAlertOpen(true);
                  setDisableConversation(true)
                }}
              >
                <Check className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
        {(swap.status === 'accepted' || swap.status === 'denied' || disableConversation) && (
          <div className="mt-3 p-2 bg-gray-50 rounded text-center">
            <p className="text-xs text-gray-600">
              {swap.status === 'accepted'
                ? 'Échange accepté - Les détails de livraison ont été partagés par email'
                : 'Échange refusé - Cette conversation est terminée'}
            </p>
          </div>
        )}
      </CardContent>
      {action && (
        <AlertDialogSwap
          action={action}
          open={alertOpen}
          setOpen={setAlertOpen}
          onConfirm={handleConfirm}
        />
      )}
    </Card>
  );
};

export default MessageExchange;
