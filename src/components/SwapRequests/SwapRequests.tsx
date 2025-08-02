/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, CheckCircle, XCircle, Clock } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type SwapRow = {
  id: number;
  user: {
    avatar: string;
    username: string;
  };
  puzzle: {
    image: string;
    pieceCount: number;
  };
  forPuzzle: {
    image: string;
    pieceCount: number;
  };
  date: string;
  status: string;
};

interface ExchangeRequestsListProps {
  type: 'received' | 'sent' | 'completed';
  swaps: SwapRow[];
}

const SwapRequests = ({ type, swaps }: ExchangeRequestsListProps) => {
  // Handle actions
  const handleAccept = (id: string) => {
    console.log(id);
  };

  const handleDecline = (id: string) => {
    console.log(id);
  };

  const handleCancel = (id: string) => {
    console.log(id);
  };

  const handleMessage = (id: string) => {
    console.log(id);
  };

  if (swaps.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No {type} exchange requests found.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Membre</TableHead>
            <TableHead>Son puzzle</TableHead>
            <TableHead>Votre puzzle</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {swaps.map((swap) => (
            <TableRow key={swap.id}>
              <TableCell className="py-6">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={`${import.meta.env.VITE_API_URL}${swap.user.avatar}`}
                      alt={swap.user.username}
                    />
                    <AvatarFallback>
                      {swap.user.username.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{swap.user.username}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    src={`${import.meta.env.VITE_API_URL}${swap.forPuzzle.image}`}
                    alt="Miniature du puzzle"
                    className="h-12 w-12 object-cover rounded-md shadow-sm border"
                  />
                  <div>
                    <p className="text-sm text-gray-500">
                      {swap.forPuzzle.pieceCount} pièces
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    src={`${import.meta.env.VITE_API_URL}${swap.puzzle.image}`}
                    alt="Miniature du puzzle"
                    className="h-12 w-12 object-cover rounded-md shadow-sm border"
                  />
                  <div>
                    <p className="text-sm text-gray-500">
                      {swap.puzzle.pieceCount} pièces
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{swap.date}</TableCell>
              <TableCell>
                {swap.status === 'pending' ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <span className="mr-1">●</span> En attente
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <span className="mr-1">●</span> Terminé
                  </span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {type === 'received' && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        // onClick={() => handleAccept(request.id)}
                      >
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="sr-only">Accepter</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        // onClick={() => handleDecline(request.id)}
                      >
                        <XCircle className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Refuser</span>
                      </Button>
                    </>
                  )}
                  {type === 'sent' && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                      // onClick={() => handleCancel(request.id)}
                    >
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Annuler</span>
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0"
                    // onClick={() => handleMessage(request.id)}
                  >
                    <MessageSquare className="h-4 w-4 text-blue-500" />
                    <span className="sr-only">Message</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SwapRequests;
