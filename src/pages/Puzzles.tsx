import Filter from '@/components/Filter';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { fetchPuzzles } from '@/service/puzzle';
import { useEffect, useState } from 'react';
import PuzzlesResult from '@/components/PuzzlesResult';
import { FilterTypes, PaginatedResponse, Puzzle } from '@/types/puzzle';
import { Loader } from 'lucide-react';
import SwapModal from '@/components/SwapModal';
import useUserStore from '@/stores/useUserStore';
import { useInView } from 'react-intersection-observer';
import { useCities } from '@/hooks/useCities';
import { useBrands } from '@/hooks/useBrands';
import { useCategories } from '@/hooks/useCategories';
import { useUserPuzzles } from '@/hooks/useUserPuzzles';
import Header from '@/components/Header';
import { useSearchParams } from 'react-router';

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
  const { data: cities } = useCities();
  const { data: brands } = useBrands();
  const { data: categories } = useCategories();
  const { data: userPuzzles } = useUserPuzzles();
  const { ref, inView } = useInView();

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
    [string, number | undefined, Partial<FilterTypes>],
    number
  >({
    queryKey: ['puzzles', user?.id, filters],
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

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const category = searchParams.get('category') || '';
    const brand = searchParams.get('brand') || '';
    setFilters((prev) => ({
      ...prev,
      category,
      brand,
    }));
  }, [searchParams]);

  return (
    <div className="bg-gray-50">
      <Header
        title="Explorer les puzzles"
        subtitle="Parcours les puzzles disponibles et trouve celui qui te plaît."
      />
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
        <SwapModal
          selectedPuzzle={selectedPuzzle}
          userPuzzles={userPuzzles}
          requester={user}
        />
      )}
    </div>
  );
};

export default Puzzles;
