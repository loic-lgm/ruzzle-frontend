import Discover from '@/components/Discover';
import Hero from '@/components/Hero';
import Stepper from '@/components/Stepper';
import SwapModal from '@/components/SwapModal';
import { fetchPuzzlesByUser, fetchRandomPuzzles } from '@/service/puzzle';
import useUserStore from '@/stores/useUserStore';
import { Puzzle } from '@/types/puzzle';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const Home = () => {
  const user = useUserStore((state) => state.user);
  const [selectedPuzzle, setSelectedPuzzle] = useState<Puzzle | null>(null);
  const { data: randomPuzzles } = useQuery({
    queryKey: ['random-puzzles'],
    queryFn: fetchRandomPuzzles,
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

  return (
    <>
      <Hero />
      <Stepper />
      {randomPuzzles && (
        <Discover
          randomPuzzles={randomPuzzles}
          user={user}
          setSelectedPuzzle={setSelectedPuzzle}
        />
      )}
      {userPuzzles && selectedPuzzle && (
        <SwapModal selectedPuzzle={selectedPuzzle} userPuzzles={userPuzzles} />
      )}
    </>
  );
};

export default Home;
