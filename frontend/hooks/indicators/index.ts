import TotaAPI from 'services/api';
import { useQuery } from 'react-query';

export function useIndicatorValues(params: any) {
  return useQuery(
    ['Fetch indicator values', params],
    !!params ? () => TotaAPI.getIndicatorValues(params) : () => Promise.resolve([]),
  );
}
