import { Categories } from '@/types/category';
import api from '@/utils/apiClient';

export const fetchCategories = async (): Promise<Categories> => {
  const response = await api.get(`${import.meta.env.VITE_API_URL}/categories/`);
  return response.data;
};
