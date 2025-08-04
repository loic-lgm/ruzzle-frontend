import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  MessageSquare,
  Package,
  Check,
  Send,
  Edit,
  Puzzle,
} from 'lucide-react';
import SwapRequests from '@/components/SwapRequests';
import Messages from '@/components/Messages';
import EditProfileModal from '@/components/EditProfileModal/EditProfileModal';
import useUserStore from '@/stores/useUserStore';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import {
  fetchCompletedSwapsByUser,
  fetchReceivedSwapsByUser,
  fetchSentSwapsByUser,
} from '@/service/user';
import { mapSwapToRow } from '@/components/SwapRequests/helpers';
import PuzzlesList from '@/components/PuzzlesList';
import { fetchPuzzlesByUser } from '@/service/puzzle';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('puzzles');
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const { data: receivedSwaps = [] } = useQuery({
    queryKey: ['received-swaps', user?.id],
    queryFn: () => fetchReceivedSwapsByUser(user!.id),
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const { data: sentSwaps = [] } = useQuery({
    queryKey: ['sent-swaps', user?.id],
    queryFn: () => fetchSentSwapsByUser(user!.id),
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

  const { data: userPuzzles } = useQuery({
    queryKey: ['userPuzzles'],
    queryFn: fetchPuzzlesByUser,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const receivedSwapsToTable = receivedSwaps.map((swap) =>
    mapSwapToRow(swap, user?.id, 'received')
  );

  const sentSwapsToTable = sentSwaps.map((swap) =>
    mapSwapToRow(swap, user?.id, 'sent')
  );

  const completedSwapsToTable = completedSwaps.map((swap) =>
    mapSwapToRow(swap, user?.id, 'completed')
  );

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-24 pb-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {user && userPuzzles && (
            <>
              <div className="mb-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                    <AvatarImage
                      src={`${import.meta.env.VITE_API_URL}${user?.image}`}
                      alt={user?.username}
                      className="object-cover"
                    />
                    <AvatarFallback>
                      {user?.username.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {user?.first_name} {user?.last_name}
                    </h1>
                    <p className="text-gray-500">@{user?.username}</p>
                    {user?.created_at && (
                      <p className="text-sm text-gray-500 mt-1">
                        Membre depuis{' '}
                        {new Date(user?.created_at).toLocaleDateString(
                          'fr-FR',
                          {
                            month: 'long',
                            year: 'numeric',
                          }
                        )}
                      </p>
                    )}
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                      <div className="text-center px-4 py-2 bg-white rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-gray-900">
                          {completedSwaps.length}
                        </div>
                        <div className="text-xs text-gray-500">Échanges</div>
                      </div>
                      <div className="text-center px-4 py-2 bg-white rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-gray-900">
                          {sentSwaps.length + receivedSwaps.length}
                        </div>
                        <div className="text-xs text-gray-500">En cours</div>
                      </div>
                      <div className="text-center px-4 py-2 bg-white rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-gray-900">
                          5/5
                        </div>
                        <div className="text-xs text-gray-500">Note</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      className="flex gap-2"
                      onClick={() => setIsEditProfileOpen(true)}
                    >
                      <Edit size={16} />
                      Éditer son profil
                    </Button>
                  </div>
                </div>
              </div>
              <Tabs
                defaultValue="received"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-4 mb-8 w-full flex flex-nowrap">
                  <TabsTrigger
                    value="puzzles"
                    className="flex items-center gap-2"
                  >
                    <Puzzle size={16} />
                    <span className="hidden sm:inline">Mes Puzzles</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="received"
                    className="flex items-center gap-2"
                  >
                    <Package size={16} />
                    <span className="hidden sm:inline">Reçu</span>
                    <Badge className="ml-1 bg-emerald-500">2</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="sent" className="flex items-center gap-2">
                    <Send size={16} />
                    <span className="hidden sm:inline">Envoyé</span>
                    <Badge className="ml-1 bg-emerald-500">1</Badge>
                  </TabsTrigger>
                  <TabsTrigger
                    value="completed"
                    className="flex items-center gap-2"
                  >
                    <Check size={16} />
                    <span className="hidden sm:inline">Terminé</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="messages"
                    className="flex items-center gap-2"
                  >
                    <MessageSquare size={16} />
                    <span className="hidden sm:inline">Messages</span>
                    <Badge className="ml-1 bg-blue-500">3</Badge>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="puzzles">
                  <Card>
                    <CardHeader>
                      <CardTitle>Liste de tous vos puzzles</CardTitle>
                      <CardDescription>
                        Vous pouvez gérer tous vos puzzles ici.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <PuzzlesList puzzles={userPuzzles} />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="received">
                  <Card>
                    <CardHeader>
                      <CardTitle>Demandes d&apos;échange reçues</CardTitle>
                      <CardDescription>
                        Les demandes d&apos;échange que vous avez reçu des
                        autres membres.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <SwapRequests
                        type="received"
                        swaps={receivedSwapsToTable}
                        user={user}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="sent">
                  <Card>
                    <CardHeader>
                      <CardTitle>Demandes d&apos;échange envoyées</CardTitle>
                      <CardDescription>
                        Demande d&apos;échange que vous avez envoyées aux autres
                        membres.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <SwapRequests
                        type="sent"
                        swaps={sentSwapsToTable}
                        user={user}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="completed">
                  <Card>
                    <CardHeader>
                      <CardTitle>Échanges terminés</CardTitle>
                      <CardDescription>
                        Votre historique d&apos;échanges conclus.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <SwapRequests
                        type="completed"
                        swaps={completedSwapsToTable}
                        user={user}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="messages">
                  <Card>
                    <CardHeader>
                      <CardTitle>Messages</CardTitle>
                      <CardDescription>
                        Conversation avec les autres membres.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Messages />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>
      {user && (
        <EditProfileModal
          open={isEditProfileOpen}
          onOpenChange={setIsEditProfileOpen}
          user={user}
        />
      )}
    </div>
  );
};

export default Profile;
