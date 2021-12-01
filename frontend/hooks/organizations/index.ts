import { useQuery } from 'react-query';

import { Organization } from 'types';

import TotaAPI from 'services/api';

export function useOrganization(id: number) {
  const query = useQuery<Organization[]>(
    ['organization', { id }],
    () => TotaAPI.get(`/organizations?filter[id]=${id}`),
    {
      keepPreviousData: true,
      staleTime: Infinity,
    },
  );

  return {
    ...query,
    data: (query.data || [])[0],
  };
}
