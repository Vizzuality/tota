import TotaAPI, { GetIndicatorsArgs } from 'services/api';
import { useQuery } from 'react-query';
import type { IndicatorValue } from 'types';

export function useIndicatorValues(params: GetIndicatorsArgs) {
  return useQuery<IndicatorValue[], Error>(
    ['Fetch indicator values', params],
    !!params ? () => TotaAPI.getIndicatorValues(params) : () => Promise.resolve([]),
  );
}
