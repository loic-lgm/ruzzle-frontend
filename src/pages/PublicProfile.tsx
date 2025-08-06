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
import { fetchPuzzlesByUser } from '@/service/puzzle';
import { fetchCompletedSwapsByUser, fetchUserByUsername } from '@/service/user';
import useUserStore from '@/stores/useUserStore';
import { Puzzle } from '@/types/puzzle';
import { useQuery } from '@tanstack/react-query';
import { MapPin } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router';

const PublicProfilePage = () => {
  const [selectedPuzzle, setSelectedPuzzle] = useState<Puzzle | null>(null);
  const user = useUserStore((state) => state.user);
  const { username } = useParams();
  const { data: publicUser } = useQuery({
    queryKey: ['public-user', username],
    queryFn: () => fetchUserByUsername(username!),
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
  const { data: userPuzzles } = useQuery({
    queryKey: ['userPuzzles'],
    queryFn: fetchPuzzlesByUser,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
  const { data: completedSwaps = [] } = useQuery({
    queryKey: ['completed-swaps', user?.id],
    queryFn: () => fetchCompletedSwapsByUser(user!.id),
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-24 pb-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {publicUser && (
            <div className="mb-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                  <AvatarImage
                    src={publicUser.image}
                    alt={`@${username}`}
                  />
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
                        {userPuzzles?.length}
                      </div>
                      <div className="text-xs text-gray-500">Puzzles</div>
                    </div>
                    <div className="text-center px-4 py-2 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-gray-900">
                        5/5
                      </div>
                      <div className="text-xs text-gray-500">Note</div>
                    </div>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Collection de puzzles</CardTitle>
                      <CardDescription>
                        {publicUser.puzzles?.length}{' '}
                        {publicUser.puzzles?.length === 1
                          ? 'puzzle'
                          : 'puzzles'}{' '}
                        dans la collection de @{publicUser.username}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {publicUser.puzzles && publicUser.puzzles?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {publicUser.puzzles?.map((puzzle) => (
                            <PuzzleCard
                              key={puzzle.id}
                              user={publicUser}
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
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PublicProfilePage;
