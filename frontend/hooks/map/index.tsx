import { createContext, useCallback, useContext, useState } from 'react';

import { useSelectedRegion } from 'hooks/regions';
import type { MapContextProps, MapProviderProps } from './types';

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
    tourism_regions: {
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
