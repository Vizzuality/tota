import TotaAPI from 'services/api';
import { useQuery, UseQueryResult } from 'react-query';
import type { AdditionalResource } from 'types';

export function useAdditionalResources(region: string, useQueryParams: any = {}): UseQueryResult<AdditionalResource[]> {
  return useQuery<AdditionalResource[], Error>(
    ['Fetch additional resources', region],
    !!region ? () => TotaAPI.get(`/additional_resources?filter[regions.slug]=${region}`) : () => Promise.resolve([]),
    {
      staleTime: Infinity,
      ...useQueryParams,
    },
  );
}
