/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Check, MessageSquare } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Puzzle } from '@/types/puzzle';
import { useSwapModalStore } from '@/stores/useSwapModalStore';

interface ExchangeModalProps {
  selectedPuzzle: Puzzle;
}

const SwapModal = ({ selectedPuzzle }: ExchangeModalProps) => {
  const { isOpen, close } = useSwapModalStore();
//   const [selectedPuzzle, setSelectedPuzzle] = useState<Puzzle | null>(null);
  const [message, setMessage] = useState<string>(
    'Bonjour, je suis intéressé pour échanger votre puzzle.'
  );

  let toto = 1;
  let titi = 2;

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
            Exchange Proposal
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div>
            <h3 className="text-base font-semibold mb-2">
              Vous souhaitez échanger
            </h3>
            <div className="flex items-center p-3 rounded-md bg-muted/50">
              <img
                // src={currentPuzzle.image}
                // alt={currentPuzzle.title}
                className="w-16 h-16 object-cover rounded-md mr-3"
              />
              <div>
                <h4 className="font-medium">{selectedPuzzle.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {/* {currentPuzzle.pieceCount} pieces */}
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
                {/* {myPuzzles.length > 0 ? (
                  myPuzzles.map((puzzle) => (
                    <div
                      key={puzzle.id}
                      onClick={() => setSelectedPuzzle(puzzle)}
                      className={`flex items-center p-3 rounded-md cursor-pointer transition-colors ${
                        selectedPuzzle?.id === puzzle.id
                          ? 'bg-primary/10 border border-primary'
                          : 'hover:bg-muted border border-transparent'
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={puzzle.image}
                          alt={puzzle.title}
                          className="w-16 h-16 object-cover rounded-md mr-3"
                        />
                        {selectedPuzzle?.id === puzzle.id && (
                          <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-1">
                            <Check className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{puzzle.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {puzzle.pieceCount} pieces
                        </p>
                      </div>
                    </div>
                  ))
                ) */}
                {toto == titi ? (
                  ''
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
              Include a message:
            </h3>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message to the puzzle owner..."
              className="min-h-[100px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button
            // onClick={handleSubmit}
            disabled={!selectedPuzzle}
            className="bg-gradient-to-r from-ruzzle-pink to-ruzzle-purple text-white"
          >
            Send Exchange Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SwapModal;
