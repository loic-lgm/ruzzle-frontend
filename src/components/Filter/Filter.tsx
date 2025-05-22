import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  // SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  FilterIcon,
  X,
  FilterX,
  Grid3X3,
  LayoutList,
  Search,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
// import {
//   categories as allCategories,
//   pieceCounts as allPieceCounts,
//   brands as allBrands,
//   frenchCities as allCities,
// } from '@/data/filter-options';
// import { City } from '@/types/city';
// import { Brand } from '@/types/brand';
// import { Category } from '@/types/category';
import { FilterTypes } from '@/types/puzzle';

interface PuzzleFiltersProps {
  filters: FilterTypes;
  onFilterChange: (filters: FilterTypes) => void;
  onClearFilters: () => void;
  onApplyFilters: () => void;
}

const Filter = ({
  filters,
  // onFilterChange,
  onClearFilters,
  onApplyFilters,
}: PuzzleFiltersProps) => {
  // const handleCategoryChange = (category: string) => {
  //   const newCategories = filters.categories.includes(category)
  //     ? filters.categories.filter((c) => c !== category)
  //     : [...filters.categories, category];

  //   onFilterChange({
  //     ...filters,
  //     categories: newCategories,
  //   });
  // };

  // const handlePieceCountChange = (pieceCount: string) => {
  //   const newPieceCounts = filters.pieceCount.includes(pieceCount)
  //     ? filters.pieceCount.filter((p) => p !== pieceCount)
  //     : [...filters.pieceCount, pieceCount];

  //   onFilterChange({
  //     ...filters,
  //     pieceCount: newPieceCounts,
  //   });
  // };

  // const handleBrandChange = (brand: string) => {
  //   const newBrands = filters.brands.includes(brand)
  //     ? filters.brands.filter((b) => b !== brand)
  //     : [...filters.brands, brand];

  //   onFilterChange({
  //     ...filters,
  //     brands: newBrands,
  //   });
  // };

  // const handleCityChange = (city: string) => {
  //   const newCities = filters.cities?.includes(city)
  //     ? filters.cities.filter((c) => c !== city)
  //     : [...(filters.cities || []), city];

  //   onFilterChange({
  //     ...filters,
  //     cities: newCities,
  //   });
  // };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.pieceCount.length > 0 ||
    filters.brands.length > 0 ||
    (filters.cities && filters.cities.length > 0);

  const [displayMode, setDisplayMode] = useState<'grid' | 'carousel'>('grid');
  const [filtersVisible, setFiltersVisible] = useState(true);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and view controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFiltersVisible(!filtersVisible)}
            className={
              filtersVisible
                ? 'bg-ruzzle-purple/10 text-ruzzle-purple border-ruzzle-purple/50'
                : ''
            }
          >
            {filtersVisible ? (
              <FilterX className="h-4 w-4 mr-1" />
            ) : (
              <Search className="h-4 w-4 mr-1" />
            )}
            {filtersVisible ? 'Masquer les filtres' : 'Afficher les filtres'}
          </Button>

          <div className="border-l h-6 mx-2"></div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setDisplayMode('grid')}
            className={
              displayMode === 'grid'
                ? 'bg-ruzzle-pink/10 text-ruzzle-pink border-ruzzle-pink/50'
                : ''
            }
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setDisplayMode('carousel')}
            className={
              displayMode === 'carousel'
                ? 'bg-ruzzle-pink/10 text-ruzzle-pink border-ruzzle-pink/50'
                : ''
            }
          >
            <LayoutList className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center text-ruzzle-darkpurple">
            <FilterIcon className="mr-2 h-5 w-5 text-ruzzle-purple" />
            Filter Puzzles
          </h2>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-ruzzle-purple hover:text-ruzzle-pink hover:bg-ruzzle-pink/5"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Categories Filter */}
          <div>
            <label className="block text-sm font-medium text-ruzzle-darkpurple mb-2">
              Categories
            </label>
            <Select>
              <SelectTrigger className="w-full border-ruzzle-lightblue/30 focus:border-ruzzle-pink">
                <SelectValue placeholder="Select categories" />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-60">
                  {/* {allCategories.map((category: Category) => (
                  <SelectItem
                    key={category.id}
                    value={category.name}
                    onClick={() => handleCategoryChange(category.name)}
                  >
                    <div className="flex items-center">
                      {filters.categories.includes(category) && (
                        <CheckIcon className="h-4 w-4 mr-2 text-ruzzle-pink" />
                      )}
                      <span>{category.name}</span>
                    </div>
                  </SelectItem>
                ))} */}
                </ScrollArea>
              </SelectContent>
            </Select>
            {filters.categories.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {/* {filters.categories.map((category: Category) => (
                <div
                  key={category.id}
                  className="bg-ruzzle-purple/10 text-ruzzle-darkpurple text-xs px-2 py-1 rounded-full flex items-center"
                >
                  {category.name}
                  <button
                    onClick={() => handleCategoryChange(category.name)}
                    className="ml-1 text-ruzzle-purple hover:text-ruzzle-pink"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))} */}
              </div>
            )}
          </div>

          {/* Piece Count Filter */}
          <div>
            <label className="block text-sm font-medium text-ruzzle-darkpurple mb-2">
              Piece Count
            </label>
            <Select>
              <SelectTrigger className="w-full border-ruzzle-lightblue/30 focus:border-ruzzle-pink">
                <SelectValue placeholder="Select piece count" />
              </SelectTrigger>
              <SelectContent>
                {/* {allPieceCounts.map((count: number) => (
                <SelectItem
                  key={count}
                  value={count.toString()}
                  onClick={() => handlePieceCountChange(count.toString())}
                >
                  <div className="flex items-center">
                    {filters.pieceCount.includes(count) && (
                      <CheckIcon className="h-4 w-4 mr-2 text-ruzzle-pink" />
                    )}
                    <span>{count}</span>
                  </div>
                </SelectItem>
              ))} */}
              </SelectContent>
            </Select>
            {filters.pieceCount.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {/* {filters.pieceCount.map((count: number) => (
                <div
                  key={count}
                  className="bg-ruzzle-blue/10 text-ruzzle-blue text-xs px-2 py-1 rounded-full flex items-center"
                >
                  {count}
                  <button
                    onClick={() => handlePieceCountChange(count.toString())}
                    className="ml-1 text-ruzzle-blue hover:text-ruzzle-pink"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))} */}
              </div>
            )}
          </div>

          {/* Brand Filter */}
          <div>
            <label className="block text-sm font-medium text-ruzzle-darkpurple mb-2">
              Brands
            </label>
            <Select>
              <SelectTrigger className="w-full border-ruzzle-lightblue/30 focus:border-ruzzle-pink">
                <SelectValue placeholder="Select brands" />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-60">
                  {/* {allBrands.map((brand: Brand) => (
                  <SelectItem
                    key={brand.id}
                    value={brand.name}
                    onClick={() => handleBrandChange(brand.name)}
                  >
                    <div className="flex items-center">
                      {filters.brands.includes(brand) && (
                        <CheckIcon className="h-4 w-4 mr-2 text-ruzzle-pink" />
                      )}
                      <span>{brand.name}</span>
                    </div>
                  </SelectItem>
                ))} */}
                </ScrollArea>
              </SelectContent>
            </Select>
            {/* {filters.brands.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {filters.brands.map((brand: Brand) => (
                <div
                  key={brand.id}
                  className="bg-ruzzle-lightblue/20 text-ruzzle-darkpurple text-xs px-2 py-1 rounded-full flex items-center"
                >
                  {brand.name}
                  <button
                    onClick={() => handleBrandChange(brand.name)}
                    className="ml-1 text-ruzzle-purple hover:text-ruzzle-pink"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )} */}
          </div>

          {/* City Filter */}
          <div>
            <label className="block text-sm font-medium text-ruzzle-darkpurple mb-2">
              Cities
            </label>
            <Select>
              <SelectTrigger className="w-full border-ruzzle-lightblue/30 focus:border-ruzzle-pink">
                <SelectValue placeholder="Select cities" />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-60">
                  {/* {allCities.map((city: City) => (
                  <SelectItem
                    key={city.id}
                    value={city.name}
                    onClick={() => handleCityChange(city.name)}
                  >
                    <div className="flex items-center">
                      {filters.cities?.includes(city) && (
                        <CheckIcon className="h-4 w-4 mr-2 text-ruzzle-pink" />
                      )}
                      <span>{city.name}</span>
                    </div>
                  </SelectItem>
                ))} */}
                </ScrollArea>
              </SelectContent>
            </Select>
            {/* {filters.cities && filters.cities.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {filters.cities.map((city: City) => (
                <div
                  key={city.id}
                  className="bg-ruzzle-pink/10 text-ruzzle-pink text-xs px-2 py-1 rounded-full flex items-center"
                >
                  {city.name}
                  <button
                    onClick={() => handleCityChange(city.name)}
                    className="ml-1 text-ruzzle-purple hover:text-ruzzle-pink"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )} */}
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={onApplyFilters}
            className="px-8 py-2 h-12 bg-gradient-to-r from-ruzzle-pink to-ruzzle-purple text-white hover:shadow-lg transition-all hover:scale-105"
          >
            <span className="font-medium">Search Puzzles</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Filter;
