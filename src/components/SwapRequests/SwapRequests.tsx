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

interface ExchangeRequest {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  puzzle: {
    id: string;
    title: string;
    pieceCount: number;
  };
  forPuzzle: {
    id: string;
    title: string;
    pieceCount: number;
  };
  status: string;
  date: string;
  completedDate?: string;
}

// Mock data for exchange requests
const mockRequests: ExchangeRequest[] = [
  // Received requests
  {
    id: 'r1',
    user: {
      id: 'u2',
      name: 'Emma Wilson',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Emily',
    },
    puzzle: {
      id: 'p3',
      title: 'Mountain Sunrise',
      pieceCount: 1000,
    },
    forPuzzle: {
      id: 'p1',
      title: 'Ocean Waves',
      pieceCount: 750,
    },
    status: 'pending',
    date: '15/07/2023',
  },
  {
    id: 'r2',
    user: {
      id: 'u3',
      name: 'Michael Brown',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Michael',
    },
    puzzle: {
      id: 'p4',
      title: 'Forest Adventure',
      pieceCount: 500,
    },
    forPuzzle: {
      id: 'p2',
      title: 'City Skyline',
      pieceCount: 1000,
    },
    status: 'pending',
    date: '10/07/2023',
  },

  // Sent requests
  {
    id: 's1',
    user: {
      id: 'u4',
      name: 'Sophie Wilson',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sophie',
    },
    puzzle: {
      id: 'p1',
      title: 'Starry Night',
      pieceCount: 1500,
    },
    forPuzzle: {
      id: 'p5',
      title: 'City Skyline',
      pieceCount: 2000,
    },
    status: 'pending',
    date: '2023-08-05',
  },

  // Completed exchanges
  {
    id: 'c1',
    user: {
      id: 'u5',
      name: 'Daniel Taylor',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Daniel',
    },
    puzzle: {
      id: 'p6',
      title: 'Winter Landscape',
      pieceCount: 500,
    },
    forPuzzle: {
      id: 'p7',
      title: 'Autumn Forest',
      pieceCount: 500,
    },
    status: 'completed',
    date: '2023-07-15',
    completedDate: '2023-07-25',
  },
  {
    id: 'c2',
    user: {
      id: 'u6',
      name: 'Olivia Johnson',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Olivia',
    },
    puzzle: {
      id: 'p8',
      title: 'Desert Sunset',
      pieceCount: 1000,
    },
    forPuzzle: {
      id: 'p9',
      title: 'Tropical Paradise',
      pieceCount: 1200,
    },
    status: 'completed',
    date: '2023-06-20',
    completedDate: '2023-07-01',
  },
  {
    id: 'c3',
    user: {
      id: 'u7',
      name: 'William Clark',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=William',
    },
    puzzle: {
      id: 'p10',
      title: 'Space Adventure',
      pieceCount: 1500,
    },
    forPuzzle: {
      id: 'p11',
      title: 'Underwater World',
      pieceCount: 1800,
    },
    status: 'completed',
    date: '2023-05-10',
    completedDate: '2023-05-25',
  },
];

interface ExchangeRequestsListProps {
  type: 'received' | 'sent' | 'completed';
}

const SwapRequests = ({ type }: ExchangeRequestsListProps) => {
  // Filter requests based on type
  const filteredRequests = mockRequests.filter((request) => {
    if (type === 'received')
      return request.status === 'pending' && request.id.startsWith('r');
    if (type === 'sent')
      return request.status === 'pending' && request.id.startsWith('s');
    if (type === 'completed') return request.status === 'completed';
    return false;
  });

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

  if (filteredRequests.length === 0) {
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
          {filteredRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell className="py-6">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={request.user.avatar}
                      alt={request.user.name}
                    />
                    <AvatarFallback>
                      {request.user.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{request.user.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{request.puzzle.title}</p>
                  <p className="text-sm text-gray-500">
                    {request.puzzle.pieceCount} pieces
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{request.forPuzzle.title}</p>
                  <p className="text-sm text-gray-500">
                    {request.forPuzzle.pieceCount} pieces
                  </p>
                </div>
              </TableCell>
              <TableCell>{request.date}</TableCell>
              <TableCell>
                {request.status === 'pending' ? (
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
                        onClick={() => handleAccept(request.id)}
                      >
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="sr-only">Accept</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => handleDecline(request.id)}
                      >
                        <XCircle className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Decline</span>
                      </Button>
                    </>
                  )}
                  {type === 'sent' && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => handleCancel(request.id)}
                    >
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Cancel</span>
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => handleMessage(request.id)}
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
