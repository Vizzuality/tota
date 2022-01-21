import TotaAPI from 'services/api';
import { useQuery, UseQueryResult } from 'react-query';
import type { IndicatorValue } from 'types';

interface GetIndicatorValuesArgs {
  slug?: string | string[];
  region?: string | string[];
  category_1?: string | string[];
  category_2?: string | string[];
}

function getIndicatorValues({
  slug,
  region,
  category_1,
  category_2,
}: GetIndicatorValuesArgs): Promise<IndicatorValue[]> {
  const params = new URLSearchParams();
  const wrap = (x: string | string[]) => [x].flat().filter((x) => x);
  const slugArray = wrap(slug);
  const regionArray = wrap(region);
  const category_1Array = wrap(category_1);
  const category_2Array = wrap(category_2);
  if (slugArray.length > 0) params.append('filter[indicator]', slugArray.join(','));
  if (regionArray.length > 0) params.append('filter[region_slug]', regionArray.join(','));
  if (category_1Array.length > 0) params.append('filter[category_1]', category_1Array.join(','));
  if (category_2Array.length > 0) params.append('filter[category_2]', category_2Array.join(','));
  const queryString = Array.from(params).length > 0 ? `?${params.toString()}` : '';

  return TotaAPI.get(`indicator_values${queryString}`);
}

export function useIndicatorValues(params: GetIndicatorValuesArgs): UseQueryResult<IndicatorValue[]> {
  return useQuery<IndicatorValue[], Error>(
    ['Fetch indicator values', params],
    !!params ? () => getIndicatorValues(params) : () => Promise.resolve([]),
    {
      staleTime: Infinity,
    },
  );
}
