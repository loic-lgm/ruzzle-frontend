import { fetchUserByUsername } from '@/service/user';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

const PublicProfilePage = () => {
  const { username } = useParams();
  const { data: publicUser, isLoading } = useQuery({
    queryKey: ['public-user', username],
    queryFn: () => fetchUserByUsername(username!),
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
  console.log(publicUser);
  return <div>PP</div>;
};

export default PublicProfilePage;
