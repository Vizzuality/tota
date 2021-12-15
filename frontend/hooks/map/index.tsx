import { createContext, useCallback, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import type { ViewportProps } from 'react-map-gl';

import { useRegions } from 'hooks/regions';
import type { MapContextProps, MapProviderProps } from './types';
import { useQueryParams } from 'hooks/query-params';
import { encodeParam, decodeParam } from 'utils/url';

const MapContext = createContext<MapContextProps>({
  activeLayers: [],
  layerSettings: {},
  viewport: {},
  selectedRegion: undefined,
  regionChanged: false,
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

function getLayerSettings(layerSettings: any = {}, activeLayers: string[] = []) {
  const newLayerSettings = {};
  activeLayers.forEach((layer) => {
    newLayerSettings[layer] = layerSettings[layer] || {
      visibility: true,
      opacity: 1,
    };
  });
  return newLayerSettings;
}

export function getMapUrl(selectedRegion: string, activeLayers: string[] = []) {
  const mapSettings = {
    selectedRegion,
    layerSettings: getLayerSettings({}, activeLayers),
  };

  return `/map?map=${encodeParam(mapSettings)}`;
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
    layerSettings: getLayerSettings({}, ['tourism_regions']),
  });
  const [regionChanged, setRegionChanged] = useState(false);
  const { layerSettings, viewport, selectedRegion: selectedRegionSlug } = mapSettings;
  const { data: regions } = useRegions();
  const selectedRegion = regions.find((r) => r.slug === selectedRegionSlug) || regions[0];
  const activeLayers = Object.keys(layerSettings);

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
        layerSettings: getLayerSettings(mapSettings.layerSettings || {}, layers),
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
  const selectRegion = useCallback(
    (region: string) => {
      setRegionChanged(true);
      setMapSettings({
        ...mapSettings,
        selectedRegion: region,
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
        regionChanged,
        changeLayerSettings,
        changeActiveLayers,
        setViewport,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}
