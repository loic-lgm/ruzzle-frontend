import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check, Loader, MessageSquare } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Puzzle, Puzzles } from '@/types/puzzle';
import { useModalStore } from '@/stores/useModalStore';
import { AxiosError } from 'axios';
import { swapPuzzle } from '@/service/swap';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useSwapsRefresh } from '@/hooks/useSwapsRefresh';
import { User } from '@/types/user';

interface ExchangeModalProps {
  selectedPuzzle: Puzzle;
  userPuzzles: Puzzles | null;
  requester: User;
}

const SwapModal = ({
  selectedPuzzle,
  userPuzzles,
  requester,
}: ExchangeModalProps) => {
  const [internalError, setInternalError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>(
    'Hey 👋, j’ai repéré ton puzzle, on échange ?'
  );
  const queryClient = useQueryClient();
  const { isOpen, close } = useModalStore();
  const { refreshSwaps } = useSwapsRefresh();

  const swap = useMutation({
    mutationFn: swapPuzzle,
    onSuccess: () => {
      setInternalError('');
      toast.success("Demande d'échange effectuée avec succès !");
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      refreshSwaps('received', selectedPuzzle.owner.id);
      refreshSwaps('sent', requester.id);
      close();
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ error: string }>;
      setInternalError(
        axiosError.response?.data?.error || 'Une erreur est survenue'
      );
    },
  });

  const [puzzleToSend, setPuzzleToSend] = useState<Puzzle | null>(null);

  const handleSubmit = () => {
    if (!message) {
      setInternalError("Écris un message pour faciliter l'échange");
      return;
    }
    if (!puzzleToSend) {
      setInternalError(
        'Tu dois choisir un de tes puzzles à proposer en échange'
      );
      return;
    }
    swap.mutate({
      message: message,
      puzzle_asked_id: Number(selectedPuzzle.id),
      puzzle_proposed_id: Number(puzzleToSend?.id),
    });
    setPuzzleToSend(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent
        className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto max-h-[90vh] flex flex-col pb-0"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Demande d&apos;échange
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 pt-4">
          <div>
            <h3 className="text-base font-semibold mb-2">
              Tu souhaites échanger
            </h3>
            <div className="flex items-center p-3 rounded-md bg-muted/50">
              <img
                src={selectedPuzzle.image}
                className="w-16 h-16 object-cover rounded-md mr-3"
              />
              <div>
                <h4 className="font-medium">{selectedPuzzle.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedPuzzle.piece_count} pieces
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedPuzzle.categories[0]?.name}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-2">
              Sélectionne un de tes puzzle à échanger:
            </h3>
            <ScrollArea className="h-[200px] rounded-md border">
              <div className="p-4 grid gap-3">
                {userPuzzles && userPuzzles.length > 0 ? (
                  userPuzzles.map((puzzle) => (
                    <div
                      key={puzzle.id}
                      onClick={() => setPuzzleToSend(puzzle)}
                      className={`flex items-center p-3 rounded-md cursor-pointer transition-colors ${
                        puzzleToSend?.id === puzzle.id
                          ? ' border border-green-500'
                          : 'hover:bg-muted border border-transparent'
                      }`}
                    >
                      <div className="flex">
                        <img
                          src={puzzle.image}
                          alt={puzzle.title}
                          className="w-16 h-16 object-cover rounded-md mr-3"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{puzzle.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {puzzle.piece_count} pieces
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {puzzle.categories[0]?.name}
                        </p>
                      </div>
                      {puzzleToSend?.id === puzzle.id && (
                        <div className="flex bg-green-500 text-white rounded-full p-1 h-8 w-8 justify-center items-center">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    Tu n&apos;as aucun puzzle à échanger pour le moment.
                  </p>
                )}
              </div>
            </ScrollArea>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-2 flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Envoyer un message:
            </h3>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message to the puzzle owner..."
              className="min-h-[100px] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-green-500"
            />
          </div>
        </div>

        {internalError && (
          <div className="text-red-500 text-sm">{internalError}</div>
        )}
        <DialogFooter className="flex flex-row justify-center sticky bottom-0 gap-2 bg-gradient-to-t from-white to-transparent border-gray-200 py-4">
          <Button variant="outline" onClick={close} disabled={swap.isPending}>
            Annuler
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!puzzleToSend || swap.isPending}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-600"
          >
            Envoyer une demande
            {swap.isPending && <Loader className="animate-spin" size={16} />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SwapModal;
