import { useMemo, useState } from 'react';

import { UseRegionsResponse, UseSelectedRegionResponse, RegionProps, SelectRegionProps } from './types';

const fakeRegions: RegionProps[] = [
  { id: 0, name: 'British Columbia', slug: 'british-columbia', parent_id: null },
  { id: 1, name: 'Cariboo Chilcotin Coast', slug: 'cariboo-chilcotin-coast', parent_id: 0 },
  { id: 2, name: 'Kootenay Rockies', slug: 'kootenay-rockies', parent_id: 0 },
  { id: 3, name: 'Northern BC', slug: 'northern-bc', parent_id: 0 },
  { id: 4, name: 'Vancouver Island', slug: 'vancouver-island', parent_id: 0 },
  { id: 5, name: 'Thompson Okanagan', slug: 'thompson-okanagan', parent_id: 0 },
];

function applyParentsAndChildren(regions: RegionProps[]): RegionProps[] {
  return regions.map((r) => ({
    ...r,
    parent: regions.find((rp) => rp.id === r.parent_id),
    children: regions.filter((rc) => rc.parent_id === r.id),
  }));
}

export function useRegions(): UseRegionsResponse {
  const [regions, setRegions] = useState<RegionProps[]>(applyParentsAndChildren(fakeRegions)); // eslint-disable-line

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
