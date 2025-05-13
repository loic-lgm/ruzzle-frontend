import { Cities } from '@/types/city';
import api from '@/utils/apiClient';

export const fetchCities = async (): Promise<Cities> => {
  const response = await api.get(`${import.meta.env.VITE_API_URL}/cities/`);
  return response.data;
};
