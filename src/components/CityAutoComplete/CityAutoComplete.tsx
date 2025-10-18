import { useState } from 'react';
import { useCities } from '@/hooks/useCities';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { City } from '@/types/city';

interface CityAutoCompleteProps {
  onSelectCity: (city: City) => void;
  displayLabel?: boolean;
}

const CityAutocomplete = ({
  onSelectCity,
  displayLabel = true,
}: CityAutoCompleteProps) => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const { data: cities = [], isLoading } = useCities(query);

  const handleInputChange = (value: string) => {
    setQuery(value);
    setShowDropdown(value.length > 0);
  };

  const handleSelect = (city: City) => {
    setQuery(city.name);
    onSelectCity(city);
    setShowDropdown(false);
  };

  return (
    <div className="space-y-2 w-full relative">
      {displayLabel &&
      <Label htmlFor="city">Ville</Label>
      }
      <Input
        id="city"
        value={query}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Commencez à taper une ville..."
        autoComplete="off"
      />
      {showDropdown && (
        <ul className="absolute z-10 w-full mt-1 max-h-48 overflow-auto border border-gray-200 bg-white rounded-md shadow-lg">
          {isLoading && <li className="p-2 text-gray-500">Chargement...</li>}
          {!isLoading && cities.length === 0 && (
            <li className="p-2 text-gray-500">Aucune ville trouvée</li>
          )}
          {cities.map((city) => (
            <li
              key={city.id}
              onClick={() => handleSelect(city)}
              className="cursor-pointer px-3 py-2 hover:bg-gray-100 flex justify-between"
            >
              <span>{city.name}</span>
              <span className="text-gray-400 text-sm">{city.postal_code}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CityAutocomplete;
