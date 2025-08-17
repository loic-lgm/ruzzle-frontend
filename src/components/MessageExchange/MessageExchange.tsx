import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Swap } from '@/types/swap';
import { ArrowRightLeft, Check, Clock, X } from 'lucide-react';

const MessageExchange = ({ swap }: { swap: Swap }) => {
  return (
    <Card className="m-4 border-2 border-green-500">
      <CardHeader className="pb-3">
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
          {/* Mon puzzle */}
          <div className="flex-1 text-center">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Votre puzzle
            </p>
            <div className="relative group">
              <img
                src={swap.puzzle_asked.image}
                alt={swap.puzzle_asked.image}
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <div className="text-white text-center">
                  <p className="text-sm">
                    {swap.puzzle_asked.piece_count} pièces
                  </p>
                  <p className="text-xs">{swap.puzzle_asked.brand.name}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Flèche d'échange */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10rounded-full flex items-center justify-center">
              <ArrowRightLeft className="h-5 w-5 text-green-500" />
            </div>
          </div>

          {/* Leur puzzle */}
          <div className="flex-1 text-center">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Son puzzle
            </p>
            <div className="relative group">
              <img
                src={swap.puzzle_proposed.image}
                alt={swap.puzzle_proposed.image}
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <div className="text-white text-center">
                  <p className="text-sm">
                    {swap.puzzle_proposed.piece_count} pièces
                  </p>
                  <p className="text-xs">{swap.puzzle_proposed.brand.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions d'échange */}
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
