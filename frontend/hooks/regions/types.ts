import { ReactNode } from 'react';

export interface RegionProps {
  id: number;
  title: string;
}

export interface SelectRegionProps {
  id: number;
}

export interface RegionContextProps {
  active: boolean;
  regions: RegionProps[];
}

export interface RegionProviderProps {
  children: ReactNode;
}

export interface UseRegionsResponse {
  regions: RegionProps[];
}

export interface UseSelectedRegionResponse {
  regions: RegionProps[];
  selectRegion: ({}: SelectRegionProps) => void;
  selectedRegion: RegionProps;
}
