import Discover from '@/components/Discover';
import Hero from '@/components/Hero';
import Stepper from '@/components/Stepper';
import SwapModal from '@/components/SwapModal';
import { useRandomPuzzles } from '@/hooks/useRandomPuzzles';
import { useUserPuzzles } from '@/hooks/useUserPuzzles';
import useUserStore from '@/stores/useUserStore';
import { Puzzle } from '@/types/puzzle';
import { useState } from 'react';

const Home = () => {
  const user = useUserStore((state) => state.user);
  const [selectedPuzzle, setSelectedPuzzle] = useState<Puzzle | null>(null);
  const { data: userPuzzles } = useUserPuzzles();
  const { data: randomPuzzles } = useRandomPuzzles();


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
