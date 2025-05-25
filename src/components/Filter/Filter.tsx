import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  FilterIcon,
  X,
  FilterX,
  Grid3X3,
  LayoutList,
  Search,
} from 'lucide-react';
// import {
//   categories as allCategories,
//   pieceCounts as allPieceCounts,
//   brands as allBrands,
//   frenchCities as allCities,
// } from '@/data/filter-options';
// import { City } from '@/types/city';
import { Brands } from '@/types/brand';
// import { Category } from '@/types/category';
import { FilterTypes } from '@/types/puzzle';
import SelectCustom from '@/components/SelectCustom/SelectCustom';
import { PIECE_COUNT } from '@/utils/constants';
import { Cities } from '@/types/city';
import { Categories } from '@/types/category';

interface FilterPropsType {
  brands: Brands;
  cities: Cities;
  categories: Categories;
}

const Filter = ({ brands, cities, categories }: FilterPropsType) => {
  const [filters, setFilters] = useState<FilterTypes>({
    category: '',
    pieceCount: '',
    brand: '',
    city: '',
  });

  const handleClearFilters = () => {
    setFilters({
      category: '',
      pieceCount: '',
      brand: '',
      city: '',
    });
  };

  const handleApplyFilters = () => {
    // In a real app, this would trigger an API call
    console.log('Applied filters:', filters);
  };

  // const handleFilterChange = (newFilters: FilterTypes) => {
  //   setFilters(newFilters);
  // };

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
    filters.category || filters.pieceCount || filters.brand || filters.city;

  const [displayMode, setDisplayMode] = useState<'grid' | 'carousel'>('grid');
  const [filtersVisible, setFiltersVisible] = useState(true);

  /**
   * TODO
   * 1. Faire les appels pour passer les datas
   * 2. Centrer l'intérieur du bloc filter: titre - select - button search
   * 3. Reorganiser les state dans Puzzles
   * 4. Afficher tous les puzzles sans filtres
   */

  return (
    <>
      <div className="flex justify-center flex-col m-auto max-w-7xl">
        <div className="flex justify-end px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFiltersVisible(!filtersVisible)}
              className={
                filtersVisible
                  ? 'bg-green-500/10 text-black border-green-300'
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
                  ? 'bg-lime-500/10 text-black border-lime-300'
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
                  ? 'bg-lime-500/10 text-black border-lime-300'
                  : ''
              }
            >
              <LayoutList className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {filtersVisible && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center text-green-500">
                <FilterIcon className="mr-2 h-5 w-5 text-emerald-500" />
                Filtrer les puzzles
              </h2>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className="text-green-500 hover:text-emerald-500 hover:bg-emerald/5"
                >
                  <X className="h-4 w-4 mr-1" />
                  Tout effacer
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-18 mb-6">
              <SelectCustom
                label="Categorie"
                data={categories}
                type="category"
              />
              <SelectCustom
                label="Nombre de pièce"
                data={PIECE_COUNT}
                type="pieceCount"
              />
              <SelectCustom label="Marque" data={brands} type="brand" />
              <SelectCustom label="Ville" data={cities} type="city" />
              <div></div>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleApplyFilters}
                className="px-8 py-2 h-12 bg-gradient-to-r from-green-500 to-teal-500 text-white hover:shadow-lg transition-all hover:scale-105"
              >
                <span className="font-medium">Rechercher</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Filter;
