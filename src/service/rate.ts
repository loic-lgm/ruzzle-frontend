import api from '@/utils/apiClient';

export const rateQuery = async ({
  exchangeId,
  rating,
  reviewedId,
}: {
  exchangeId: number;
  rating: number;
  reviewedId: number;
}) => {
  const response = await api.post(`${import.meta.env.VITE_API_URL}/rates/`, {
    exchange: exchangeId,
    rating,
    reviewed: reviewedId,
  });
  return response.data;
};
