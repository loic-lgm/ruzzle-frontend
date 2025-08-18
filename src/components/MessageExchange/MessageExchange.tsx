import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
              <p className="text-xs font-medium truncate">{myPuzzle.category.name}</p>
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
