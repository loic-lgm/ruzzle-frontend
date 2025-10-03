import Discover from '@/components/Discover';
import Hero from '@/components/Hero';
import Stepper from '@/components/Stepper';
import SwapModal from '@/components/SwapModal';
import { useRandomPuzzles } from '@/hooks/useRandomPuzzles';
import { useUserPuzzles } from '@/hooks/useUserPuzzles';
import useUserStore from '@/stores/useUserStore';
import { Puzzle } from '@/types/puzzle';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

const Home = () => {
  const user = useUserStore((state) => state.user);
  const [selectedPuzzle, setSelectedPuzzle] = useState<Puzzle | null>(null);
  const { data: userPuzzles } = useUserPuzzles();
  const { data: randomPuzzles } = useRandomPuzzles();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 0);
      }
    }
  }, [location]);

  return (
    <>
      <Hero />
      <Stepper user={user} />
      {randomPuzzles && (
        <Discover
          randomPuzzles={randomPuzzles}
          user={user}
          setSelectedPuzzle={setSelectedPuzzle}
        />
      )}
      {userPuzzles && selectedPuzzle && user && (
        <SwapModal
          selectedPuzzle={selectedPuzzle}
          userPuzzles={userPuzzles}
          requester={user}
        />
      )}
    </>
  );
};

export default Home;
