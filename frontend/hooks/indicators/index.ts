import TotaAPI, { GetIndicatorsArgs } from 'services/api';
import { useQuery, UseQueryResult } from 'react-query';
import type { IndicatorValue } from 'types';

export function useIndicatorValues(params: GetIndicatorsArgs): UseQueryResult<IndicatorValue[]> {
  return useQuery<IndicatorValue[], Error>(
    ['Fetch indicator values', params],
    !!params ? () => TotaAPI.getIndicatorValues(params) : () => Promise.resolve([]),
    {
      staleTime: Infinity,
    },
  );
}
