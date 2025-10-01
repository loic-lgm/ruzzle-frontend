import { Eye, ArrowLeftRight, MapPin, Layout, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Puzzle } from '@/types/puzzle';
import { useAuthModalStore } from '@/stores/useAuthModalStore';
import React, { useState } from 'react';
import { User as UserType } from '@/types/user';
import { useModalStore } from '@/stores/useModalStore';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { cn } from '@/lib/utils';

interface PuzzleCardProps {
  puzzle: Puzzle;
  setSelectedPuzzle: React.Dispatch<React.SetStateAction<Puzzle | null>>;
  user: UserType | null;
}


const PuzzleCard = ({ puzzle, setSelectedPuzzle, user }: PuzzleCardProps) => {
  console.log(puzzle)
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const { open } = useAuthModalStore();
  const { open: openSwap } = useModalStore();
  const navigate = useNavigate()
  const handleSwap = () => {
    if (user && puzzle.owner.id == user.id) {
      toast.error('Vous ne pouvez pas échanger vos propres puzzles.');
      return;
    }
    if (user) {
      setSelectedPuzzle(puzzle);
      openSwap();
    } else {
      open('login');
    }
  };
  return (
    <Card
      className="group relative h-64 w-full overflow-hidden transition-shadow duration-00 hover:shadow-xl p-0"
      onClick={() => setShowInfo(!showInfo)}
    >
      <div className="absolute top-2 right-2 z-20">
        <Badge
          variant="secondary"
          className="bg-white/80 backdrop-blur-sm text-gray-800 shadow-sm px-2 py-1 flex items-center gap-1"
        >
          <Layout className="h-3 w-3" />
          <span>{puzzle.piece_count} pièces</span>
        </Badge>
      </div>

      <CardContent className="p-0 h-full w-full">
        <img
          src={puzzle.image}
          alt={puzzle.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </CardContent>

      <div
        className={cn(
          'absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-500 p-4',
          showInfo ? 'opacity-100' : 'opacity-0 sm:group-hover:opacity-100'
        )}
      >
        {puzzle.owner && (
          <div className="flex items-center justify-between mt-1 text-white/90 text-xs">
            <div className="flex flex-row items-center">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{puzzle.owner.city?.name}</span>
            </div>
            <div className="flex flex-row items-center">
              <User className="h-3 w-3 mr-1" />
              <span>{puzzle.owner.username}</span>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-2">
          <span className="text-white/80 text-xs">{puzzle.categories[0]?.name}</span>

          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 rounded-full bg-white/20 text-white"
              onClick={handleSwap}
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>

            <Button
              size="sm"
              variant="ghost"
              className="h-8 rounded-full flex items-center bg-white/20 text-white"
              onClick={() => navigate(`/puzzles/${puzzle.hashid}`)}
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
