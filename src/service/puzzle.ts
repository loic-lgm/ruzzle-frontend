import {
  FilterTypes,
  PaginatedResponse,
  PublishOrEditPuzzleData,
  Puzzle,
  Puzzles,
} from '@/types/puzzle';
import api from '@/utils/apiClient';

export const fetchPuzzles = async (
  filters: Partial<FilterTypes> = {}
): Promise<PaginatedResponse> => {
  const searchParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    searchParams.append(key, value.toString());
  });
  const response = await api.get(
    `${import.meta.env.VITE_API_URL}/puzzles/?${searchParams}`
  );
  return response.data;
};

export const fetchPuzzlesByUser = async (): Promise<Puzzles> => {
  const response = await api.get(
    `${import.meta.env.VITE_API_URL}/puzzles/mine/`
  );
  return response.data;
};

export const fetchPuzzle = async (hashid: string): Promise<Puzzle> => {
  const response = await api.get(
    `${import.meta.env.VITE_API_URL}/puzzles/${hashid}/`
  );
  return response.data;
};

export const fetchRandomPuzzles = async (): Promise<Puzzles> => {
  const response = await api.get(
    `${import.meta.env.VITE_API_URL}/puzzles/random/`
  );
  return response.data;
};

export const publishPuzzle = async (
  data: PublishOrEditPuzzleData
): Promise<Puzzle> => {
  const formData = new FormData();
  formData.append('brand_id', data.brand_id.toString());
  formData.append('piece_count', data.piece_count.toString());
  formData.append('condition', data.condition);
  formData.append('owner', data.owner.toString());
  if (data.height !== null && data.height !== undefined) {
    formData.append('height', data.height.toString());
  }
  if (data.width !== null && data.width !== undefined) {
    formData.append('width', data.width.toString());
  }
  data.category_ids.forEach((cat) => {
    if (typeof cat === 'number') {
      formData.append('category_ids', cat.toString());
    } else if ('isNew' in cat && cat.isNew) {
      formData.append('category_ids', JSON.stringify(cat));
    }
  });
  if (data.image) {
    formData.append('image', data.image);
  }
  const response = await api.post(
    `${import.meta.env.VITE_API_URL}/puzzles/`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

export const editPuzzle = async (
  hashid: string,
  data: PublishOrEditPuzzleData
): Promise<Puzzle> => {
  const formData = new FormData();
  formData.append('brand_id', data.brand_id.toString());
  formData.append('piece_count', data.piece_count.toString());
  formData.append('condition', data.condition);
  formData.append('owner', data.owner.toString());
  if (data.width !== null && data.width !== undefined) {
    formData.append('width', data.width.toString());
  }
  if (data.height !== null && data.height !== undefined) {
    formData.append('height', data.height.toString());
  }
  data.category_ids.forEach((cat) => {
    if (typeof cat === 'number') {
      formData.append('category_ids', cat.toString());
    } else if ('isNew' in cat && cat.isNew) {
      formData.append('category_ids', JSON.stringify(cat));
    }
  });
  if (data.image) {
    formData.append('image', data.image);
  }
  const response = await api.put(
    `${import.meta.env.VITE_API_URL}/puzzles/${hashid}/`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

export const deletePuzzleFn = async (hashid: string): Promise<Puzzle> => {
  const response = await api.delete(
    `${import.meta.env.VITE_API_URL}/puzzles/${hashid}/`
  );
  return response.data;
};
