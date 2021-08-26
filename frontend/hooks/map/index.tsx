import { createContext, useCallback, useContext, useState, ReactNode } from 'react';

import type { SelectRegionProps, RegionProps } from 'hooks/regions/types';

import { useSelectedRegion } from 'hooks/regions';

interface LayerSettings {
  id: string | number;
  opacity?: number;
  visibility?: boolean;
}

interface MapContextProps {
  activeLayers: string[];
  changeActiveLayers: (layers: string[]) => void;
  layerSettings: { [key: string]: LayerSettings };
  changeLayerSettings: (layerId: string, settings: any) => void;
  selectedRegion?: RegionProps;
  selectRegion: (region: SelectRegionProps) => void;
}

interface MapProviderProps {
  children: ReactNode;
}

const MapContext = createContext<MapContextProps>({
  activeLayers: [],
  layerSettings: {},
  selectedRegion: undefined,
  changeLayerSettings: () => console.info('changeLayerSettings not implemented'),
  changeActiveLayers: () => console.info('changeActiveLayers not implemented'),
  selectRegion: () => console.info('selectRegion not implemented'),
});

export const useMap = () => {
  const ctx = useContext(MapContext);

  if (!ctx) {
    throw Error('The `useMap` hook must be called from a descendent of the `MapProvider`.');
  }

  return ctx;
};

export function MapProvider({ children }: MapProviderProps) {
  const [layerSettings, setLayerSettings] = useState({
    tourism_region: {
      id: 'tourism_region',
      visibility: true,
      opacity: 1,
    },
  });
  const [activeLayers, setActiveLayers] = useState(['tourism_regions']);
  const { selectRegion, selectedRegion } = useSelectedRegion();

  const changeLayerSettings = useCallback(
    (layerId, settings) => {
      const newSettings = {
        ...layerSettings,
        [layerId]: {
          ...layerSettings[layerId],
          ...settings,
        },
      };
      setLayerSettings(newSettings);
    },
    [layerSettings],
  );
  const changeActiveLayers = useCallback((layers: string[]) => {
    setActiveLayers(layers);
  }, []);

  return (
    <MapContext.Provider
      value={{
        activeLayers,
        layerSettings,
        selectRegion,
        selectedRegion,
        changeLayerSettings,
        changeActiveLayers,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}
