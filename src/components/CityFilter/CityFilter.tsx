import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import useUserStore from '@/stores/useUserStore';
import { FilterTypes } from '@/types/puzzle';
import { City, CityFilterValue } from '@/types/city';
import CityAutocomplete from '@/components/CityAutoComplete';

interface CityFilterProps {
  onChange: (type: keyof FilterTypes, value: number | CityFilterValue) => void;
  radius: number;
  setRadius: React.Dispatch<React.SetStateAction<number>>;
}

const CityFilter = ({ onChange, radius, setRadius }: CityFilterProps) => {
  const user = useUserStore((state) => state.user);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const handleRadiusChange = (newRadius: number) => {
    setRadius(newRadius);
    if (user?.latitude && user?.longitude) {
      onChange('city', {
        latitude: user.latitude,
        longitude: user.longitude,
        radius: newRadius,
      });
    } else if (selectedCity) {
      onChange('city', {
        latitude: selectedCity.latitude,
        longitude: selectedCity.longitude,
        radius: newRadius,
      });
    }
  };

  const handleSelectCity = (city: City) => {
    setSelectedCity(city);
    onChange('city', {
      latitude: city.latitude,
      longitude: city.longitude,
      radius,
    });
  };

  return (
    <div className="flex flex-col w-full max-w-xs">
      <label className="block text-sm font-medium text-black mb-2 flex items-center">
        <MapPin className="h-4 w-4 mr-1 text-green-500" />
        {user ? 'Autour de moi' : 'Autour d’une ville'}
      </label>
      {user && user?.latitude && user?.longitude ? (
        <>
          <div className="grid grid-cols-4 gap-2">
            {[5, 10, 25, 50].map((dist) => (
              <button
                key={dist}
                onClick={() => handleRadiusChange(dist)}
                className={`py-2 px-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  radius === dist
                    ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md'
                    : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                }`}
              >
                {dist}km
              </button>
            ))}
          </div>
          <p className="text-xs text-emerald-600 mt-1 mb-2">
            Ville sélectionnée : <strong>{user.city_name}</strong>
          </p>
        </>
      ) : (
        <>
          <CityAutocomplete
            onSelectCity={handleSelectCity}
            displayLabel={false}
          />
          {selectedCity && (
            <>
              <p className="text-xs text-emerald-600 mt-1 mb-2">
                Ville sélectionnée : <strong>{selectedCity.name}</strong>
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CityFilter;
