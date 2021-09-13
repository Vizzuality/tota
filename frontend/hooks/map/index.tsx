import { createContext, useCallback, useContext } from 'react';
import { useRouter } from 'next/router';
import type { ViewportProps } from 'react-map-gl';

import { useSelectedRegion } from 'hooks/regions';
import type { MapContextProps, MapProviderProps } from './types';
import { useQueryParams } from 'hooks/query-params';
import { encodeParam, decodeParam } from 'utils/url';

const MapContext = createContext<MapContextProps>({
  activeLayers: [],
  layerSettings: {},
  viewport: {},
  selectedRegion: undefined,
  changeLayerSettings: () => console.info('changeLayerSettings not implemented'),
  changeActiveLayers: () => console.info('changeActiveLayers not implemented'),
  selectRegion: () => console.info('selectRegion not implemented'),
  setViewport: () => console.info('set viewport not implemented'),
});

export const useMap = () => {
  const ctx = useContext(MapContext);

  if (!ctx) {
    throw Error('The `useMap` hook must be called from a descendent of the `MapProvider`.');
  }

  return ctx;
};

function useEncodedQueryParam(paramName: string, defaultParams: any = {}) {
  const [query, setQuery] = useQueryParams();
  const setParams = (newParams: any) => setQuery({ [paramName]: encodeParam(newParams) });

  if (query.hasOwnProperty(paramName)) {
    return [decodeParam(query[paramName]), setParams];
  }

  return [defaultParams, setParams];
}

export function MapProvider({ children }: MapProviderProps) {
  const [mapSettings, setMapSettings] = useEncodedQueryParam('map', {
    viewport: {
      latitude: 54.123389,
      longitude: -124.950408,
      zoom: 5,
      minZoom: 4,
      maxZoom: 20,
    },
    activeLayers: ['tourism_regions'],
    layerSettings: {
      tourism_regions: {
        visibility: true,
        opacity: 1,
      },
    },
  });
  const activeLayers = mapSettings.activeLayers || [];
  const layerSettings = mapSettings.layerSettings || {};
  const viewport = mapSettings.viewport;
  const { selectRegion, selectedRegion } = useSelectedRegion();

  const changeLayerSettings = useCallback(
    (layerId, settings) => {
      const layerSettings = mapSettings.layerSettings || {};
      const newSettings = {
        ...layerSettings,
        [layerId]: {
          ...layerSettings[layerId],
          ...settings,
        },
      };
      setMapSettings({
        ...mapSettings,
        layerSettings: newSettings,
      });
    },
    [mapSettings],
  );
  const changeActiveLayers = useCallback(
    (layers: string[]) => {
      setMapSettings({
        ...mapSettings,
        activeLayers: layers,
      });
    },
    [mapSettings],
  );
  const setViewport = useCallback(
    (newViewport: Partial<ViewportProps>) => {
      setMapSettings({
        ...mapSettings,
        viewport: newViewport,
      });
    },
    [mapSettings],
  );

  // workaround for router not ready
  const router = useRouter();
  if (!router.isReady) {
    return null;
  }

  return (
    <MapContext.Provider
      value={{
        activeLayers,
        layerSettings,
        viewport,
        selectRegion,
        selectedRegion,
        changeLayerSettings,
        changeActiveLayers,
        setViewport,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}
