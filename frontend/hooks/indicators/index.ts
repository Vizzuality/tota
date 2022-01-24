import TotaAPI from 'services/api';
import { useQuery, UseQueryResult } from 'react-query';
import type { IndicatorValue } from 'types';

interface GetIndicatorValuesArgs {
  widget: string;
  slug?: string | string[];
  region?: string | string[];
  category_1?: string | string[];
  category_2?: string | string[];
}

function addParam(params: URLSearchParams, name: string, value: string | string[]) {
  const wrap = (x: string | string[]) => [x].flat().filter((x) => x);
  const valueArray = wrap(value);
  if (valueArray.length > 0) params.append(name, valueArray.join(','));
}

function getIndicatorValues({
  slug,
  region,
  widget,
  category_1,
  category_2,
}: GetIndicatorValuesArgs): Promise<IndicatorValue[]> {
  const params = new URLSearchParams();

  addParam(params, 'filter[widget]', widget);
  addParam(params, 'filter[indicator]', slug);
  addParam(params, 'filter[region_slug]', region);
  addParam(params, 'filter[category_1]', category_1);
  addParam(params, 'filter[category_2]', category_2);

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
