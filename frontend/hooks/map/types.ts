import { ReactNode } from 'react';
import type { ViewportProps } from 'react-map-gl';

import type { Region } from 'types';

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
  selectedRegion?: Region;
  selectRegion: (slug: string) => void;
  setViewport: (viewport: Partial<ViewportProps>) => void;
  regionChanged: boolean;
}

export interface MapProviderProps {
  children: ReactNode;
}
