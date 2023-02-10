import { useQuery } from 'react-query';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import fetchUserData from '../util/fetchUserData';

export const useUserData = (user: UserProfile) =>
  useQuery({
    queryKey: ['fectchUserData', user],
    queryFn: () => fetchUserData(user),
    enabled: !!user,
  });
