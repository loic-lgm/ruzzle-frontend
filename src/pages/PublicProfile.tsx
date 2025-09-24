import NotFound from '@/components/NotFound';
import PuzzleCard from '@/components/PuzzleCard';
import SwapModal from '@/components/SwapModal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { usePublicUser } from '@/hooks/usePublicUser';
import { useUserPuzzles } from '@/hooks/useUserPuzzles';
import { useUserSwaps } from '@/hooks/useUserSwaps';
import useUserStore from '@/stores/useUserStore';
import { Puzzle } from '@/types/puzzle';
import { AxiosError } from 'axios';
import { MapPin, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const PublicProfilePage = () => {
  const [selectedPuzzle, setSelectedPuzzle] = useState<Puzzle | null>(null);
  const user = useUserStore((state) => state.user);
  const { username } = useParams();
  const navigate = useNavigate();
  const { data: userPuzzles } = useUserPuzzles();
  const { completedSwaps } = useUserSwaps(user?.id ?? undefined);
  const { data: publicUser, error, isError, isLoading } = usePublicUser(username!);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    if (user?.username == username) {
      navigate('/mon-espace');
    }
  }, [user, navigate, username]);

  return (
    <div className="flex flex-col">
      <main className="flex-1 pt-32 sm:pt-24 pb-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isError &&
            (error as AxiosError)?.response?.status === 404 &&
            !isLoading && <NotFound type="user" />}
          {publicUser && !isLoading && (
            <div className="mb-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
                <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                  <AvatarImage src={publicUser.image} alt={`@${username}`} />
                  <AvatarFallback>
                    {username?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold text-gray-900">
                    @{username}
                  </h1>
                  <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                    <MapPin size={16} className="text-gray-500" />
                    <p className="text-gray-600">
                      {publicUser.city?.name}, France
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {' '}
                    Membre depuis{' '}
                    {new Date(publicUser.created_at!).toLocaleDateString(
                      'fr-FR',
                      {
                        month: 'long',
                        year: 'numeric',
                      }
                    )}
                  </p>

                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                    <div className="text-center px-4 py-2 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-gray-900">
                        {completedSwaps.length}
                      </div>
                      <div className="text-xs text-gray-500">Échanges</div>
                    </div>
                    <div className="text-center px-4 py-2 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-gray-900">
                        {publicUser.puzzles?.length}
                      </div>
                      <div className="text-xs text-gray-500">Puzzles</div>
                    </div>
                    <div className="text-center px-4 py-2 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-gray-900 flex items-center gap-1">
                        5
                        <span>
                          <Star className="h-4 w-4 text-green-500" />
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">Note</div>
                    </div>
                  </div>
                </div>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Collection de puzzles</CardTitle>
                  <CardDescription>
                    {publicUser.puzzles?.length}{' '}
                    {publicUser.puzzles?.length === 1 ? 'puzzle' : 'puzzles'}{' '}
                    dans la collection de @{publicUser.username}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {publicUser.puzzles && publicUser.puzzles?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {publicUser.puzzles?.map((puzzle) => (
                        <PuzzleCard
                          key={puzzle.id}
                          user={user}
                          puzzle={puzzle}
                          setSelectedPuzzle={setSelectedPuzzle}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500">
                        Aucun puzzle trouvé dans cette collection.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
              {selectedPuzzle && user && userPuzzles && (
                <SwapModal
                  selectedPuzzle={selectedPuzzle}
                  userPuzzles={userPuzzles}
                  requester={user}
                />
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PublicProfilePage;
