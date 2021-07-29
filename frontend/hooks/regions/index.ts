import { useMemo, useState } from 'react';

import { UseRegionsResponse, UseSelectedRegionResponse, RegionProps, SelectRegionProps } from './types';

const fakeRegions: RegionProps[] = [
  { id: 0, title: 'All regions (British colombia)', slug: 'british-columbia' },
  { id: 1, title: 'Cariboo Chilcotin Coast', slug: 'cariboo-chilcotin-coast' },
  { id: 2, title: 'Kootenay Rockies', slug: 'kootenay-rockies' },
  { id: 3, title: 'Northern BC', slug: 'northern-bc' },
  { id: 4, title: 'Vancouver Island', slug: 'vancouver-island' },
  { id: 5, title: 'Thomposon Okanagan', slug: 'thompson-okanagan' },
];

export function useRegions(): UseRegionsResponse {
  const [regions, setRegions] = useState<RegionProps[]>(fakeRegions); // eslint-disable-line

  // Replace with react query
  const [query, useQuery] = useState('https://such-query'); // eslint-disable-line

  return useMemo(() => {
    return {
      regions,
    };
  }, [query]);
}

export function useSelectedRegion(): UseSelectedRegionResponse {
  const { regions } = useRegions();
  const [selectedRegion, setSelectedRegion] = useState<RegionProps>(regions[0]);

  const selectRegion = ({ id }: SelectRegionProps): void => {
    const selected = regions.find((r) => r.id === id);
    if (selected) {
      setSelectedRegion(selected);
    } else {
      setSelectedRegion(regions[0]);
    }
  };

  return {
    regions,
    selectRegion,
    selectedRegion,
  };
}
