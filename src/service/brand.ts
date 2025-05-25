import { Brands } from '@/types/brand';
import api from '@/utils/apiClient';

export const fetchBrands = async (): Promise<Brands> => {
  const response = await api.get(`${import.meta.env.VITE_API_URL}/brands/`);
  return response.data;
};
