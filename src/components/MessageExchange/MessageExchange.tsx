import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Swap } from '@/types/swap';
import { ArrowRightLeft, Check, Clock, X } from 'lucide-react';

interface MessageExchangeType {
  swap: Swap;
  isRequester: boolean;
}

const MessageExchange = ({ swap, isRequester }: MessageExchangeType) => {
  const myPuzzle = isRequester ? swap.puzzle_proposed : swap.puzzle_asked;
  const otherPuzzle = isRequester ? swap.puzzle_asked : swap.puzzle_proposed;
  return (
    <Card className="m-4 border-2 border-green-500 py-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <ArrowRightLeft className="h-5 w-5 text-green-500" />
          Échange proposé
          <Badge
            variant={swap.status === 'accepted' ? 'default' : 'secondary'}
            className="ml-auto"
          >
            {swap.status === 'accepted' ? (
              <>
                <Check className="h-3 w-3 mr-1" />
                Accepté
              </>
            ) : swap.status === 'denied' ? (
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
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 text-center">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Votre puzzle
            </p>
            <div className="group flex justify-center">
              <img
                src={myPuzzle.image}
                alt={myPuzzle.image}
                className="h-25 object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="flex-shrink-0">
            <div className="w-10 h-10rounded-full flex items-center justify-center">
              <ArrowRightLeft className="h-5 w-5 text-green-500" />
            </div>
          </div>

          <div className="flex-1 text-center">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Son puzzle
            </p>
            <div className="group flex justify-center">
              <img
                src={otherPuzzle.image}
                alt={otherPuzzle.image}
                className="h-25 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {swap.status === 'pending' && (
          <div className="flex gap-2 mt-4 justify-center">
            <Button
              variant="outline"
              size="sm"
              className="text-red-500 border-red-500 hover:bg-red-50 hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </Button>
            <Button size="sm" className="bg-green-500 hover:bg-emerald-500">
              <Check className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MessageExchange;
