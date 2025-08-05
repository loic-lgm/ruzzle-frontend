import {
  FilterTypes,
  PublishOrEditPuzzleData,
  Puzzle,
  Puzzles,
} from '@/types/puzzle';
import api from '@/utils/apiClient';

export const fetchPuzzles = async (
  filters: Partial<FilterTypes> = {}
): Promise<Puzzles> => {
  const searchParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    searchParams.append(key, value);
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

export const publishPuzzle = async (
  data: PublishOrEditPuzzleData
): Promise<Puzzle> => {
  const response = await api.post(
    `${import.meta.env.VITE_API_URL}/puzzles/`,
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data', // obligatoire pour upload
      },
    }
  );
  return response.data;
};

export const editPuzzle = async (
  hashid: string,
  data: PublishOrEditPuzzleData
): Promise<Puzzle> => {
  const response = await api.put(
    `${import.meta.env.VITE_API_URL}/puzzles/${hashid}/`,
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data', // obligatoire pour upload
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
