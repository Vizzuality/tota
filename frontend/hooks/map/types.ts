import { ReactNode } from 'react';

import type { SelectRegionProps, RegionProps } from 'hooks/regions/types';

export interface LayerSettings {
  id: string | number;
  opacity?: number;
  visibility?: boolean;
}

export interface MapContextProps {
  activeLayers: string[];
  changeActiveLayers: (layers: string[]) => void;
  layerSettings: { [key: string]: LayerSettings };
  changeLayerSettings: (layerId: string, settings: any) => void;
  selectedRegion?: RegionProps;
  selectRegion: (region: SelectRegionProps) => void;
}

export interface MapProviderProps {
  children: ReactNode;
}
