import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check, MessageSquare } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Puzzle, Puzzles } from '@/types/puzzle';
import { useSwapModalStore } from '@/stores/useSwapModalStore';

interface ExchangeModalProps {
  selectedPuzzle: Puzzle;
  userPuzzles: Puzzles | null;
}

const SwapModal = ({ selectedPuzzle, userPuzzles }: ExchangeModalProps) => {
  const { isOpen, close } = useSwapModalStore();
  const [message, setMessage] = useState<string>(
    'Bonjour, je suis intéressé pour échanger votre puzzle.'
  );
  const [puzzleToSend, setPuzzleToSend] = useState<Puzzle | null>(null);

  //   const handleSubmit = () => {
  //     if (!selectedPuzzle) {
  //       toast({
  //         title: 'No puzzle selected',
  //         description: 'Please select a puzzle to exchange',
  //         variant: 'destructive',
  //       });
  //       return;
  //     }

  //     // Here we would actually send the exchange request to the backend
  //     toast({
  //       title: 'Exchange request sent!',
  //       description: `Your request to exchange ${selectedPuzzle.title} for ${currentPuzzle.title} has been sent.`,
  //     });

  //     onClose();
  //   };

  // Update the message when a puzzle is selected
  //   React.useEffect(() => {
  //     if (selectedPuzzle) {
  //       setMessage(
  //         `Hi there! I'm interested in exchanging my puzzle "${selectedPuzzle.title}" for your "${currentPuzzle.title}". Let me know if you're interested!`
  //       );
  //     }
  //   }, [selectedPuzzle, currentPuzzle.title]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Demande d&apos;échange
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div>
            <h3 className="text-base font-semibold mb-2">
              Vous souhaitez échanger
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
                  {selectedPuzzle.category.name}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-2">
              Séléctionner un de vos puzzles:
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
                          {puzzle.category.name}
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
                    Vous n&apos;avez aucun puzzle à échanger.
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

        <DialogFooter>
          <Button variant="outline" onClick={close}>
            Annuler
          </Button>
          <Button
            // onClick={handleSubmit}
            disabled={!puzzleToSend}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white"
          >
            Envoyer une demande
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SwapModal;
