import { ReactNode } from 'react';
import type { ViewportProps } from 'react-map-gl';

import type { SelectRegionProps, RegionProps } from 'hooks/regions/types';

export interface LayerSettings {
  opacity?: number;
  visibility?: boolean;
}

export interface MapContextProps {
  activeLayers: string[];
  viewport: Partial<ViewportProps>;
  changeActiveLayers: (layers: string[]) => void;
  layerSettings: { [key: string]: LayerSettings };
  changeLayerSettings: (layerId: string, settings: any) => void;
  selectedRegion?: RegionProps;
  selectRegion: (region: SelectRegionProps) => void;
  setViewport: (viewport: Partial<ViewportProps>) => void;
}

export interface MapProviderProps {
  children: ReactNode;
}
