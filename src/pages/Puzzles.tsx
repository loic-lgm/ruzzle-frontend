import Filter from '@/components/Filter';
import Explore from '@/components/Explore';
import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { fetchCities } from '@/service/city';
import { fetchBrands } from '@/service/brand';
import { fetchCategories } from '@/service/category';
import { fetchPuzzles, fetchPuzzlesByUser } from '@/service/puzzle';
import { useEffect, useState } from 'react';
import PuzzlesResult from '@/components/PuzzlesResult';
import { FilterTypes, PaginatedResponse, Puzzle } from '@/types/puzzle';
import { Loader } from 'lucide-react';
import SwapModal from '@/components/SwapModal';
import useUserStore from '@/stores/useUserStore';
import { useInView } from 'react-intersection-observer';

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
  const { ref, inView } = useInView();

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

  const {
    data: puzzles,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery<
    PaginatedResponse,
    Error,
    InfiniteData<PaginatedResponse>,
    [string, Partial<FilterTypes>],
    number
  >({
    queryKey: ['puzzles', filters],
    queryFn: ({ pageParam = 1 }) =>
      fetchPuzzles({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      const page = url.searchParams.get('page');
      if (!page) return undefined;
      const pageNum = Number(page);
      return isNaN(pageNum) ? undefined : pageNum;
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const allPuzzles = puzzles?.pages.flatMap((page) => page.results) || [];
  const totalPuzzles = puzzles?.pages[0]?.count || 0;

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

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
      {allPuzzles && (
        <PuzzlesResult
          puzzles={allPuzzles}
          displayMode={displayMode}
          setSelectedPuzzle={setSelectedPuzzle}
          user={user}
          count={totalPuzzles}
        />
      )}
      <div ref={ref} style={{ height: 1 }} />
      {isFetchingNextPage && <p>Chargement...</p>}

      {selectedPuzzle && user && userPuzzles && (
        <SwapModal selectedPuzzle={selectedPuzzle} userPuzzles={userPuzzles} />
      )}
    </div>
  );
};

export default Puzzles;
