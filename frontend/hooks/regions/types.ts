import { ReactNode } from 'react';
import { Region } from 'types';

export interface RegionContextProps {
  active: boolean;
  regions: Region[];
}

export interface RegionProviderProps {
  children: ReactNode;
}

export interface UseRegionsResponse {
  regions: Region[];
}
