import { ReactNode } from 'react';

export interface RegionProps {
  id: number;
  name: string;
  slug: string;
  parent_id: number;
  parent?: RegionProps;
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
