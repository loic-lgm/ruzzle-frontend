import Filter from '@/components/Filter';
import Explore from '@/components/Explore';
import { useQuery } from '@tanstack/react-query';
import { fetchCities } from '@/service/city';
import { fetchBrands } from '@/service/brand';
import { fetchCategories } from '@/service/category';
import { fetchPuzzles, fetchPuzzlesByUser } from '@/service/puzzle';
import { useState } from 'react';
import PuzzlesResult from '@/components/PuzzlesResult';
import { FilterTypes, Puzzle } from '@/types/puzzle';
import { Loader } from 'lucide-react';
import SwapModal from '@/components/SwapModal';
import useUserStore from '@/stores/useUserStore';

const Puzzles = () => {
  const user = useUserStore((state) => state.user);
  const [displayMode, setDisplayMode] = useState<'grid' | 'carousel'>('grid');
  const [selectedPuzzle, setSelectedPuzzle] = useState<null | Puzzle>(null);
  const [filters, setFilters] = useState<FilterTypes>({
    category: '',
    pieceCount: '',
    brand: '',
    city: '',
  });

  const { data: cities } = useQuery({
    queryKey: ['cities'],
    queryFn: fetchCities,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const { data: brands } = useQuery({
    queryKey: ['brands'],
    queryFn: fetchBrands,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const { data: puzzles, isLoading } = useQuery({
    queryKey: ['puzzles', filters],
    queryFn: () => fetchPuzzles(filters),
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
    <div className="bg-gray-50">
      <Explore />
      {cities && brands && categories && (
        <Filter
          cities={cities}
          brands={brands}
          categories={categories}
          displayMode={displayMode}
          filters={filters}
          setFilters={setFilters}
          setDisplayMode={setDisplayMode}
        />
      )}
      {isLoading && (
        <Loader className="animate-spin m-auto mt-12 mb-12" size={45} />
      )}
      {puzzles && (
        <PuzzlesResult
          puzzles={puzzles}
          displayMode={displayMode}
          setSelectedPuzzle={setSelectedPuzzle}
          user={user}
        />
      )}
      {selectedPuzzle && user && userPuzzles && (
        <SwapModal
          selectedPuzzle={selectedPuzzle}
          userPuzzles={userPuzzles}
        />
      )}
    </div>
  );
};

export default Puzzles;
