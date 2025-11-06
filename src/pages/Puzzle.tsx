import EditPuzzleModal from '@/components/EditPuzzleModal';
import NotFound from '@/components/NotFound';
import SwapModal from '@/components/SwapModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useBrands } from '@/hooks/useBrands';
import { useCategories } from '@/hooks/useCategories';
import { usePuzzle } from '@/hooks/usePuzzle';
import { useUserPuzzles } from '@/hooks/useUserPuzzles';
import { useAuthModalStore } from '@/stores/useAuthModalStore';
import { useModalStore } from '@/stores/useModalStore';
import useUserStore from '@/stores/useUserStore';
import { CONDITION } from '@/utils/constants';
import { AxiosError } from 'axios';
import {
  ArrowRightLeft,
  CalendarDays,
  Layout,
  MapPin,
  SquarePen,
  User,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

const Puzzle = () => {
  const { hashId } = useParams();
  const { data: puzzle, error, isError } = usePuzzle(hashId!);
  const user = useUserStore((state) => state.user);
  const [isEditPuzzleOpen, setIsEditPuzzleOpen] = useState<boolean>(false);
  const { data: userPuzzles } = useUserPuzzles();
  const { data: brands } = useBrands();
  const { data: categories } = useCategories();
  const { open } = useAuthModalStore();
  const { open: openSwap } = useModalStore();
  const navigate = useNavigate();
  const isUserConnectedIsOwner = puzzle?.owner.id == user?.id;
  const handleSwap = () => {
    if (isUserConnectedIsOwner) {
      toast.error('Tu ne peux pas échanger tes propres puzzles.');
      return;
    }
    if (user) {
      openSwap();
    } else {
      open('login');
    }
  };

  return (
    <div className="flex flex-col bg-gray-50">
      <main className="flex-1 pt-32 sm:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            {isError && (error as AxiosError)?.response?.status === 404 ? (
              <NotFound type="puzzle" />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="order-2 lg:order-1 max-w-1/2 m-auto">
                  <div className="glass-card overflow-hidden">
                    <div className="aspect-[5/8] relative">
                      <img
                        src={`${puzzle?.image}?w=800&auto=format&q=90`}
                        alt={puzzle?.image}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2 space-y-6 flex flex-col justify-center h-full">
                  <div className="flex gap-1 mb-2">
                    {puzzle?.categories?.map((category) => (
                      <Badge
                        variant="outline"
                        className="bg-emerald-100 text-darkpurple border-emerald-500"
                        key={category.id}
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-row gap-2 mb-4 justify-between">
                    <div className="flex flex-row gap-2">
                      <Badge
                        variant="outline"
                        className="bg-teal-100 text-darkpurple border-teal-500"
                      >
                        {
                          CONDITION.find(
                            (cond) => cond.id === puzzle?.condition
                          )?.name
                        }
                      </Badge>
                      {puzzle?.width && puzzle.height && (
                        <Badge
                          variant="outline"
                          className="bg-lime-100 text-darkpurple border-lime-500"
                        >
                          {puzzle?.width}cm x {puzzle?.height}cm
                        </Badge>
                      )}
                      <p
                        className="text-lg cursor-pointer"
                        onClick={() =>
                          navigate(
                            isUserConnectedIsOwner
                              ? '/mon-espace'
                              : `/profil/${puzzle?.owner.username}`
                          )
                        }
                      >
                        • @{puzzle?.owner.username}
                      </p>
                    </div>
                    {isUserConnectedIsOwner && (
                      <div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                          onClick={() => setIsEditPuzzleOpen(true)}
                        >
                          <SquarePen className="h-4 w-4" />
                          <span className="sr-only">Éditer</span>
                        </Button>
                      </div>
                    )}
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
                    {puzzle?.owner.city_name && (
                      <div className="glass-card p-4">
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 text-teal-500 mr-3" />
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">
                              Localisation
                            </p>
                            <p className="font-semibold">
                              {puzzle?.owner.city_name}
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
                      onClick={handleSwap}
                      size="lg"
                    >
                      <ArrowRightLeft className="h-5 w-5 mr-2" />
                      Demander un échange
                    </Button>
                    {/* <div className="grid grid-cols-2 gap-40">
                      <Button
                        variant="outline"
                        className="hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                      >
                        <Heart className="h-4 w-4 mr-1" />
                        Like
                      </Button>
                      <Button
                        variant="outline"
                        className="hover:bg-green-50 hover:border-green-200 hover:text-green-600"
                      >
                        <Share2 className="h-4 w-4 mr-1" />
                        Partager
                      </Button>
                    </div> */}
                  </div>
                </div>
              </div>
            )}
          </div>
          {puzzle && user && userPuzzles && (
            <SwapModal
              selectedPuzzle={puzzle}
              userPuzzles={userPuzzles}
              requester={user}
            />
          )}
          {isEditPuzzleOpen && puzzle && categories && brands && (
            <EditPuzzleModal
              open={isEditPuzzleOpen}
              onOpenChange={setIsEditPuzzleOpen}
              puzzle={puzzle}
              categories={categories}
              brands={brands}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Puzzle;
