import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  FilterIcon,
  X,
  FilterX,
  Grid3X3,
  LayoutList,
  Search,
} from 'lucide-react';
import { Brands } from '@/types/brand';
import { FilterTypes } from '@/types/puzzle';
import SelectCustom from '@/components/SelectCustom/SelectCustom';
import { PIECE_COUNT } from '@/utils/constants';
import { Cities } from '@/types/city';
import { Categories } from '@/types/category';

interface FilterPropsType {
  brands: Brands;
  cities: Cities;
  categories: Categories;
  displayMode: string;
  filters: FilterTypes;
  setFilters: Dispatch<SetStateAction<FilterTypes>>;
  setDisplayMode: Dispatch<SetStateAction<'grid' | 'carousel'>>;
}

const Filter = ({
  brands,
  cities,
  categories,
  displayMode,
  filters,
  setFilters,
  setDisplayMode,
}: FilterPropsType) => {
  const [filtersVisible, setFiltersVisible] = useState(true);

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

  const handleFilterChange = useCallback(
    (type: keyof FilterTypes, value: string) => {
      let selectedItem;

      switch (type) {
        case 'category':
          selectedItem = categories.find(
            (item) => item.id.toString() === value
          );
          break;
        case 'brand':
          selectedItem = brands.find((item) => item.id.toString() === value);
          break;
        case 'city':
          selectedItem = cities.find((item) => item.id.toString() === value);
          break;
        default:
          return;
      }

      if (!selectedItem) return;

      setFilters((prev) => ({
        ...prev,
        [type]: type == 'city' ? selectedItem.name : selectedItem.id,
      }));
    },
    [brands, categories, cities, setFilters]
  );

  const hasActiveFilters =
    filters.category || filters.pieceCount || filters.brand || filters.city;

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

            <div className="flex gap-10 mb-10">
              <SelectCustom
                label="Categorie"
                data={categories}
                type="category"
                onChange={handleFilterChange}
              />
              <SelectCustom
                label="Nombre de pièce"
                data={PIECE_COUNT}
                type="pieceCount"
                onChange={() => {}}
              />
              <SelectCustom
                label="Marque"
                data={brands}
                type="brand"
                onChange={handleFilterChange}
              />
              <SelectCustom
                label="Ville"
                data={cities}
                type="city"
                onChange={handleFilterChange}
              />
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
