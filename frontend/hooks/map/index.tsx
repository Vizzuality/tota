import { createContext, useCallback, useContext, useState, useMemo, ReactNode } from 'react';
import { Layer } from '@vizzuality/layer-manager-react';

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

export const useTourismRegionsLayer = (selectedRegion: string): Layer => {
  /* const includeFillLayer = !Boolean(selectedRegion); */
  const includeOutlineLayer = Boolean(selectedRegion);

  const regionHoverOpacity = selectedRegion ? 0.8 : 1;
  const regionOpacity = selectedRegion ? 0 : 0.8;

  return useMemo(() => {
    return {
      id: 'tourism_regions',
      name: 'Regions',
      version: '0.0.1',
      type: 'vector',
      source: {
        url: 'mapbox://totadata.8tgd889y',
        promoteId: 'TOURISM_REGION_NAME',
      },
      legendConfig: {
        type: 'basic',
        items: [
          { value: 'Cariboo Chilcotin Coast', color: '#9B6014' },
          { value: 'Thompson Okanagan', color: '#76ACA9' },
          { value: 'Vancouver Island', color: '#4F91CD' },
          { value: 'Kootenay Rockies', color: '#405E62' },
          { value: 'Northern British Columbia', color: '#A9B937' },
        ],
      },
      render: {
        layers: [
          {
            id: 'tourism_regions_fill',
            'source-layer': 'tourism_regions',
            type: 'fill',
            ...(selectedRegion && { filter: ['match', ['get', 'TOURISM_REGION_NAME'], selectedRegion, true, false] }),
            paint: {
              'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                regionHoverOpacity,
                regionOpacity,
              ],
              'fill-color': [
                'match',
                ['get', 'TOURISM_REGION_NAME'],
                'cariboo_chilcotin_coast',
                '#9B6014',
                'thompson_okanagan',
                '#76ACA9',
                'vancouver_island',
                '#4F91CD',
                'kootenay_rockies',
                '#405E62',
                'northern_british_columbia',
                '#A9B937',
                /* other */ '#DDDDDD',
              ],
            },
          },
          includeOutlineLayer && {
            id: 'tourism_regions_outline',
            'source-layer': 'tourism_regions',
            type: 'line',
            ...(selectedRegion && { filter: ['match', ['get', 'TOURISM_REGION_NAME'], selectedRegion, true, false] }),
            paint: {
              'line-width': 3,
              'line-color': [
                'match',
                ['get', 'TOURISM_REGION_NAME'],
                'cariboo_chilcotin_coast',
                '#9B6014',
                'thompson_okanagan',
                '#76ACA9',
                'vancouver_island',
                '#4F91CD',
                'kootenay_rockies',
                '#405E62',
                'northern_british_columbia',
                '#A9B937',
                /* other */ '#DDDDDD',
              ],
            },
          },
        ].filter((x) => x),
      },
    };
  }, [selectedRegion]);
};

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
