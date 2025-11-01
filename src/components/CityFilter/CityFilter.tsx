import React from 'react';
import { Infinity as InfinytIcon, MapPin } from 'lucide-react';
import useUserStore from '@/stores/useUserStore';
import { FilterTypes } from '@/types/puzzle';
import { City, CityFilterValue } from '@/types/city';
import CityAutocomplete from '@/components/CityAutoComplete';

interface CityFilterProps {
  onChange: (type: keyof FilterTypes, value: number | CityFilterValue) => void;
  radius: number;
  setRadius: React.Dispatch<React.SetStateAction<number>>;
  selectedCity: City | null;
  setSelectedCity: React.Dispatch<React.SetStateAction<City | null>>;
  cityQuery: string;
  setCityQuery: React.Dispatch<React.SetStateAction<string>>;
}

const CityFilter = ({
  onChange,
  radius,
  setRadius,
  selectedCity,
  setSelectedCity,
  cityQuery,
  setCityQuery,
}: CityFilterProps) => {
  const user = useUserStore((state) => state.user);

  const handleRadiusChange = (newRadius: number) => {
    setRadius(newRadius);
    const base = user
      ? { latitude: user.latitude, longitude: user.longitude }
      : selectedCity
      ? { latitude: selectedCity.latitude, longitude: selectedCity.longitude }
      : null;

    if (base) {
      onChange('city', {
        ...base,
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

  const distances = [5, 10, 25, 50, 0];

  const getButtonLabel = (dist: number) =>
    dist === 0 ? <InfinytIcon className="w-4 h-4" /> : `${dist}km`;

  return (
    <div className="flex flex-col w-full max-w-xs lg:relative">
      <label className="block text-sm font-medium text-black mb-2 flex items-center lg:absolute lg:-top-6">
        <MapPin className="h-4 w-4 mr-1 text-green-500" />
        {user ? 'Autour de moi' : 'Autour d’une ville'}
      </label>

      {user && user?.latitude && user?.longitude ? (
        <>
          <p className="text-xs text-emerald-600 mt-1 mb-2">
            Ville sélectionnée : <strong>{user.city_name}</strong>
          </p>
          <div className="grid grid-cols-5 gap-2">
            {distances.map((dist) => (
              <button
                key={dist}
                onClick={() => handleRadiusChange(dist)}
                className={`flex items-center justify-center py-2 px-2 rounded-lg text-xs font-medium transition-all cursor-pointer text-center w-full ${
                  radius === dist
                    ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md'
                    : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                }`}
              >
                {getButtonLabel(dist)}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <CityAutocomplete
            onSelectCity={handleSelectCity}
            displayLabel={false}
            value={cityQuery}
            onValueChange={setCityQuery}
          />
          {selectedCity && (
            <>
              <p className="text-xs text-emerald-600 mt-1 mb-2">
                Ville sélectionnée : <strong>{selectedCity.name}</strong>
              </p>
              <div className="grid grid-cols-5 gap-2">
                {distances.map((dist) => (
                  <button
                    key={dist}
                    onClick={() => handleRadiusChange(dist)}
                    className={`flex items-center justify-center py-2 px-2 rounded-lg text-xs font-medium transition-all cursor-pointer text-center w-full ${
                      radius === dist
                        ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md'
                        : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                    }`}
                  >
                    {getButtonLabel(dist)}
                  </button>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CityFilter;
