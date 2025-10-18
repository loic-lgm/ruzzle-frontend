import { City, GouvApiResponse } from '@/types/city';

export const fetchCities = async (query: string): Promise<City[]> => {
  if (!query || query.length < 2) return [];

  const url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(
    query
  )}&type=municipality&limit=10`;

  const response = await fetch(url);
  const data: GouvApiResponse = await response.json();

  const cities: City[] = data.features.map((feature) => ({
    id: feature.properties.citycode,
    name: feature.properties.label,
    postal_code: feature.properties.postcode,
    latitude: feature.geometry.coordinates[1],
    longitude: feature.geometry.coordinates[0],
  }));

  return cities;
};
