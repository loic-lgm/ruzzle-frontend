import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FilterIcon, X, FilterX, Grid3X3, Search } from 'lucide-react';
import { Brand, Brands } from '@/types/brand';
import { FilterTypes } from '@/types/puzzle';
import SelectCustom from '@/components/SelectCustom/SelectCustom';
import { PIECE_COUNT } from '@/utils/constants';
import { City, CityFilterValue } from '@/types/city';
import { Categories, Category } from '@/types/category';
import { useNavigate } from 'react-router';
import CityFilter from '@/components/CityFilter';

interface FilterPropsType {
  brands: Brands;
  categories: Categories;
  displayMode: string;
  filters: FilterTypes;
  setFilters: Dispatch<SetStateAction<FilterTypes>>;
  setDisplayMode: Dispatch<SetStateAction<'grid' | 'carousel'>>;
}

const Filter = ({
  brands,
  categories,
  displayMode,
  filters,
  setFilters,
  setDisplayMode,
}: FilterPropsType) => {
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [radius, setRadius] = useState<number>(0);
  const navigate = useNavigate();
  const handleClearFilters = () => {
    setFilters({
      category: '',
      pieceCount: '',
      brand: '',
      city: '',
    });
    setRadius(0)
    if (window.location.search) {
      navigate('/puzzles', { replace: true });
    }
  };

  const handleFilterChange = useCallback(
    (type: keyof FilterTypes, value: string | number | CityFilterValue) => {
      if (type === 'city') {
        setFilters((prev) => ({
          ...prev,
          city: value as CityFilterValue | string,
        }));
        return;
      }
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
        case 'pieceCount':
          selectedItem = value;
          break;
        default:
          return;
      }

      if (!selectedItem) return;
      window.history.replaceState(null, '', '/puzzles');
      setFilters((prev) => ({
        ...prev,
        [type]:
          type === 'pieceCount'
            ? selectedItem
            : (selectedItem as Category | Brand | City).id.toString(),
      }));
    },
    [brands, categories, setFilters]
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

            {/* <Button
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
            </Button> */}
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

            <div
              className="flex flex-col gap-2 lg:flex-row lg:gap-10 mb-10 lg:items-center"
            >
              <SelectCustom
                label="Categorie"
                data={categories}
                type="category"
                onChange={handleFilterChange}
                value={filters.category ?? ''}
              />
              <SelectCustom
                label="Nombre de pièce"
                data={PIECE_COUNT}
                type="pieceCount"
                onChange={handleFilterChange}
                value={filters.pieceCount}
              />
              <SelectCustom
                label="Marque"
                data={brands}
                type="brand"
                onChange={handleFilterChange}
                value={filters.brand ?? ''}
              />
              <CityFilter onChange={handleFilterChange} radius={radius} setRadius={setRadius}/>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Filter;
