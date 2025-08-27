import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { usePuzzle } from '@/hooks/usePuzzle';
import { CONDITION } from '@/utils/constants';
import {
  ArrowRightLeft,
  BookmarkPlus,
  CalendarDays,
  Heart,
  Layout,
  MapPin,
  Share2,
  User,
} from 'lucide-react';
import { useParams } from 'react-router';

const Puzzle = () => {
  const { hashId } = useParams();
  const { data: puzzle } = usePuzzle(hashId!);
  return (
    <div className="flex flex-col bg-gray-50">
      <main className="flex-1 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="order-2 lg:order-1">
                <div className="glass-card overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src={`${puzzle?.image}?w=800&auto=format&q=90`}
                      alt={puzzle?.image}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-darkpurple border-green-500"
                    >
                      {puzzle?.category.name}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-lime-100 text-darkpurple border-lime-500"
                    >
                      {
                        CONDITION.find((cond) => cond.id === puzzle?.condition)
                          ?.name
                      }
                    </Badge>
                    <p className="text-lg cursor-pointer">
                      • @{puzzle?.owner.username}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-card p-4">
                    <div className="flex items-center">
                      <Layout className="h-5 w-5 text-lime-500 mr-3" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Pièces
                        </p>
                        <p className="font-semibold">{puzzle?.piece_count}</p>
                      </div>
                    </div>
                  </div>
                  <div className="glass-card p-4">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-emerald-500 mr-3" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Marque
                        </p>
                        <p className="font-semibold">{puzzle?.brand.name}</p>
                      </div>
                    </div>
                  </div>
                  {puzzle?.owner.city?.name && (
                    <div className="glass-card p-4">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-teal-500 mr-3" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">
                            Localisation
                          </p>
                          <p className="font-semibold">
                            {puzzle?.owner.city?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="glass-card p-4">
                    <div className="flex items-center">
                      <CalendarDays className="h-5 w-5 text-green-500 mr-3" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Publié le
                        </p>
                        <p className="font-semibold">
                          {puzzle?.created &&
                            new Date(puzzle.created).toLocaleDateString(
                              'fr-FR'
                            )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button
                    className="w-full bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-teal-500 hover:to-green-500 text-white font-medium py-3"
                    // onClick={handleExchange}
                    size="lg"
                  >
                    <ArrowRightLeft className="h-5 w-5 mr-2" />
                    Demander un échanger
                  </Button>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      className="hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      Like
                    </Button>
                    <Button
                      variant="outline"
                      className="hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600"
                    >
                      <BookmarkPlus className="h-4 w-4 mr-1" />
                      Sauvegarder
                    </Button>
                    <Button
                      variant="outline"
                      className="hover:bg-green-50 hover:border-green-200 hover:text-green-600"
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      Partager
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Puzzle;
