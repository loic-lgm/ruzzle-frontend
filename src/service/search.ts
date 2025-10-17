import { Brand } from '@/types/brand';
import { Category } from '@/types/category';
import { User } from '@/types/user';
import api from '@/utils/apiClient';

export const search = async (
  search: string
): Promise<{
  users: User[];
  categories: Category[];
  brands: Brand[];
}> => {
  const res = await api.get(
    `${import.meta.env.VITE_API_URL}/search/?q=${search}`
  );
  return res.data;
};
