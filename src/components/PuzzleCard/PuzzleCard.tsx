import { Eye, ArrowLeftRight, MapPin, Layout } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    HoverCard,
    HoverCardTrigger,
    HoverCardContent,
} from '@/components/ui/hover-card';
import { Puzzle } from '@/types/puzzle';

interface PuzzleCardProps {
  puzzle: Puzzle;
}

const PuzzleCard = ({ puzzle }: PuzzleCardProps) => {
  return (
    <Card className="group relative h-64 w-full overflow-hidden transition-all duration-200 hover:shadow-lg">
      {/* Badge flottant */}
      <div className="absolute top-2 right-2 z-20">
        <Badge
          variant="secondary"
          className="bg-white/80 backdrop-blur-sm text-gray-800 shadow-sm px-2 py-1 flex items-center gap-1"
        >
          <Layout className="h-3 w-3" />
          <span>{puzzle.pieceCount} pièces</span>
        </Badge>
      </div>

      {/* Image en fond */}
      <CardContent className="p-0 h-full w-full">
        <img
          src={puzzle.image}
          alt={puzzle.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </CardContent>

      {/* Overlay en bas */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
        <h3 className="text-white font-semibold truncate">{puzzle.title}</h3>

        {puzzle.city && (
          <div className="flex items-center mt-1 text-white/90 text-xs">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{puzzle.city}</span>
          </div>
        )}

        <div className="flex justify-between items-center mt-2">
          <span className="text-white/80 text-xs">{puzzle.category}</span>

          <div className="flex items-center space-x-2">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all duration-300"
                >
                  <ArrowLeftRight className="h-4 w-4 text-white" />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-auto p-2">
                <span className="text-xs">Échanger</span>
              </HoverCardContent>
            </HoverCard>

            <Button
              size="sm"
              variant="secondary"
              className="h-8 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40"
            >
              <Eye className="h-4 w-4 mr-1" />
              <span className="text-xs">Aperçu</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PuzzleCard;
