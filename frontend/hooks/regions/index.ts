import { useCallback, useMemo } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import snakeCase from 'lodash/snakeCase';

import TotaAPI from 'services/api';

import { UseRegionsResponse } from './types';
import type { Region } from 'types';

function applyParentsAndChildren(regions: Region[]): Region[] {
  if (!regions?.length) return [];

  return regions.map((r) => ({
    ...r,
    parent: regions.find((rp) => rp.id === r.parent_id),
    children: regions.filter((rc) => rc.parent_id === r.id),
  }));
}

export function useRegions() {
  const result = useQuery<Region[], Error>(
    'regions',
    () => TotaAPI.get('/regions?filter[region_type]=province,tourism_region'),
    {
      keepPreviousData: true,
      staleTime: Infinity,
      placeholderData: [],
      select: useCallback(applyParentsAndChildren, []),
    },
  );
  return {
    ...result,
    data: result.data || [],
  };
}

export function useRouterSelectedRegion(): Region {
  const router = useRouter();
  const { region } = router.query;
  const { data: regions } = useRegions();

  if (!region) return null;

  return regions.find((r) => r.slug === snakeCase(region as string));
}
