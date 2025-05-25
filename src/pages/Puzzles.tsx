import Navbar from '@/components/Navbar';
import Filter from '@/components/Filter';
import Footer from '@/components/Footer';
import Explore from '@/components/Explore';
import { useQuery } from '@tanstack/react-query';
import { fetchCities } from '@/service/city';
import { fetchBrands } from '@/service/brand';
import { fetchCategories } from '@/service/categories';

const Puzzles = () => {
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

  return (
    <div className="bg-gray-50">
      <Navbar />
      <Explore />
      {cities && brands && categories && (
        <Filter cities={cities} brands={brands} categories={categories} />
      )}

      {/* Results section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {/* {filteredPuzzles.length}{' '}
          {filteredPuzzles.length === 1 ? 'puzzle trouvé' : 'puzzles trouvés'} */}
        </h2>

        {/* {displayMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPuzzles.map((puzzle) => (
              <PuzzleCard key={puzzle.id} puzzle={puzzle} />
            ))}
          </div>
        ) : (
          <PuzzleCarousels filters={filters} />
        )} */}
      </div>
      <Footer />
    </div>
  );
};

export default Puzzles;
