import { Swap, SwapRow, SwapType } from '@/types/swap';

export function mapSwapToRow(
  swap: Swap,
  currentUserId: number | undefined,
  type: SwapType
): SwapRow {
  const isRequester = swap.requester.id === currentUserId;

  const user =
    type === 'sent'
      ? swap.puzzle_asked.owner
      : type === 'received'
      ? swap.puzzle_proposed.owner
      : isRequester
      ? swap.puzzle_asked.owner
      : swap.puzzle_proposed.owner;

  const puzzle =
    type === 'sent' || (type === 'completed' && isRequester)
      ? swap.puzzle_proposed
      : swap.puzzle_asked;

  const forPuzzle =
    type === 'sent' || (type === 'completed' && isRequester)
      ? swap.puzzle_asked
      : swap.puzzle_proposed;

  return {
    id: swap.id,
    user: {
      avatar: user.image ?? '',
      username: user.username,
    },
    puzzle: {
      image: puzzle.image,
      pieceCount: puzzle.piece_count,
    },
    forPuzzle: {
      image: forPuzzle.image,
      pieceCount: forPuzzle.piece_count,
    },
    date: new Date(swap.created).toLocaleDateString('fr-FR', {
      month: 'long',
      year: 'numeric',
    }),
    status: swap.status,
  };
}
