import { createContext, useCallback, useContext, useState, ReactNode } from 'react';

interface LayerSettings {
  id: string | number;
  opacity?: number;
  visibility?: boolean;
}

interface MapContextProps {
  activeLayers: string[];
  layerSettings: { [key: string]: LayerSettings };
  changeLayerSettings: (layerId: string, settings: any) => void;
  changeActiveLayers: (layers: string[]) => void;
}

interface MapProviderProps {
  children: ReactNode;
}

const MapContext = createContext<MapContextProps>({
  activeLayers: [],
  layerSettings: {},
  changeLayerSettings: () => console.info('changeLayerSettings not implemented'),
  changeActiveLayers: () => console.info('changeActiveLayers not implemented'),
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
        changeLayerSettings,
        changeActiveLayers,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}
