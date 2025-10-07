import { Button } from '@/components/ui/button';
import { rateQuery } from '@/service/rate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface RateBlockProps {
  swapId: number;
  reviewedId: number;
  hasVoted: boolean;
  ratingGiven: number;
}

const RateBlock = ({
  swapId,
  reviewedId,
  hasVoted,
  ratingGiven,
}: RateBlockProps) => {
  const [ratingSelected, setRatingSelected] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [localHasVoted, setLocalHasVoted] = useState(hasVoted);
  const [localRating, setLocalRating] = useState(ratingGiven);
  const queryClient = useQueryClient()

  useEffect(() => {
    setLocalHasVoted(hasVoted);
    setLocalRating(ratingGiven);
    setRatingSelected(0);
  }, [hasVoted, ratingGiven, swapId]);

  const rate = useMutation({
    mutationFn: ({
      exchangeId,
      rating,
      reviewedId,
    }: {
      exchangeId: number;
      rating: number;
      reviewedId: number;
    }) =>
      rateQuery({
        exchangeId,
        rating,
        reviewedId,
      }),

    onSuccess: () => {
      setLocalHasVoted(true);
      setLocalRating(ratingSelected);
      // onRated();
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      toast.success('Note envoyée avec succès');
    },

    onError: (error) => {
      const axiosError = error as AxiosError<{ error: string }>;
      toast.error(
        axiosError.response?.data?.error ||
          'Une erreur est survenue lors de l’envoi de la note'
      );
    },
  });

  const handleSubmitRating = () => {
    if (ratingSelected === 0) return;
    rate.mutate({
      exchangeId: swapId,
      rating: ratingSelected,
      reviewedId: reviewedId,
    });
  };

  return (
    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md text-center flex flex-col items-center gap-3">
      {localHasVoted ? (
        <>
          <p className="text-sm font-medium text-green-700">
            Merci pour ton évaluation !
          </p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`${
                  star <= localRating ? 'text-yellow-500' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="text-sm font-medium text-green-700">
            Tu n&apos;as pas encore noté cet échange !
          </p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(null)}
                onClick={() => setRatingSelected(star)}
                key={star}
                className={`text-green-700 hover:text-yellow-500 transition-colors ${
                  star <= (hoveredStar ?? ratingSelected)
                    ? 'text-yellow-500'
                    : 'text-green-700'
                }`}
              />
            ))}
          </div>
          <Button
            size="sm"
            className="bg-green-500 hover:bg-emerald-500 text-white"
            disabled={rate.isPending || ratingSelected === 0}
            onClick={handleSubmitRating}
          >
            Noter
          </Button>
        </>
      )}
    </div>
  );
};

export default RateBlock;
