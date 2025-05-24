import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { FilterTypes } from '@/types/puzzle';
import Filter from '@/components/Filter';
import Footer from '@/components/Footer';
import Explore from '@/components/Explore';

const Puzzles = () => {
  const [filters, setFilters] = useState<FilterTypes>({
    categories: [],
    pieceCount: [],
    brands: [],
    cities: [],
  });

  const handleFilterChange = (newFilters: FilterTypes) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      pieceCount: [],
      brands: [],
      cities: [],
    });
  };

  const handleApplyFilters = () => {
    // In a real app, this would trigger an API call
    console.log('Applied filters:', filters);
  };

  return (
    <div className="bg-gray-50">
      <Navbar />
      <Explore />

      {/* Filters section */}
      {/* {filtersVisible && ( */}
      <Filter
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        onApplyFilters={handleApplyFilters}
      />
      {/* )} */}

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
