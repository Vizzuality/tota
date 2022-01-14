import TotaAPI from 'services/api';
import { useQuery, UseQueryResult } from 'react-query';
import type { User } from 'types';

export function useSession(): UseQueryResult<User> {
  return useQuery<User, Error>('session', () => TotaAPI.get('/user'), {
    staleTime: Infinity,
    retry: false,
  });
}
