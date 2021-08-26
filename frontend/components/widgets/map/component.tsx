import React, { FC, useState, useCallback, useEffect } from 'react';
import { LayerManager, Layer } from '@vizzuality/layer-manager-react';
import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import Map from 'components/map';
import getBBox from '@turf/bbox';
import getCentroid from '@turf/centroid';

import type { MapWidgetProps } from './types';
import { MapEvent, Popup } from 'react-map-gl';

const MapWidget: FC<MapWidgetProps> = ({ featureTooltip, selectedRegion, extraLayers = [] }: MapWidgetProps) => {
  const [map, setMap] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 54.123389,
    longitude: -124.950408,
    zoom: 4,
    minZoom: 4,
    maxZoom: 6,
  });
  const [bounds, setBounds] = useState({
    bbox: null,
    options: {
      padding: 50,
    },
    viewportOptions: {
      transitionDuration: 0,
    },
  });
  const [highlightedFeature, setHighlightedFeature] = useState(null);

  const handleViewportChange = useCallback((vw) => {
    setViewport(vw);
  }, []);

  const handleHover = (evt: MapEvent) => {
    const feature = evt.features.find((f) => !!f.properties.TOURISM_REGION_NAME);
    if (feature) {
      const source = 'tourism_regions';
      const sourceLayer = 'tourism_regions';
      const centroid = getCentroid(feature);
      centroid.properties = feature.properties;
      centroid.id = feature.id;
      if (highlightedFeature) {
        map.setFeatureState({ source, id: highlightedFeature.id, sourceLayer }, { hover: false });
      }
      setHighlightedFeature(centroid);
      map.setFeatureState({ source, id: feature.id, sourceLayer }, { hover: true });
    } else if (highlightedFeature) {
      resetHighlight();
    }
  };
  const handleMapMouseLeave = () => {
    resetHighlight();
  };
  const resetHighlight = () => {
    const layer = 'tourism_regions';

    if (highlightedFeature) {
      map.setFeatureState({ source: layer, id: highlightedFeature.id, sourceLayer: layer }, { hover: false });
      setHighlightedFeature(null);
    }
  };
  const handleMapLoad = ({ map }) => {
    setMap(map);
  };

  useEffect(() => {
    if (selectedRegion && map) {
      const selectedRegionFilter = ['match', ['get', 'TOURISM_REGION_NAME'], selectedRegion, true, false];
      map.setFilter('tourism_regions_outline', selectedRegionFilter);
      map.setFilter('tourism_regions_fills', selectedRegionFilter);

      const interval = setInterval(() => {
        const features = map.queryRenderedFeatures({ layers: ['tourism_regions_outline'] });
        if (features.length > 0) {
          clearInterval(interval);
          const zoomToBbox = getBBox(features[0]);
          setBounds({
            ...bounds,
            bbox: zoomToBbox,
          });
        }
      }, 50);
    }
  }, [map, selectedRegion]);

  const includeRegionOutline = Boolean(selectedRegion);
  const regionHoverOpacity = selectedRegion ? 0.8 : 1;
  const regionOpacity = selectedRegion ? 0 : 0.8;

  const layers = [
    {
      id: 'tourism_regions',
      version: '0.0.1',
      type: 'vector',
      source: {
        url: 'mapbox://totadata.8tgd889y',
        promoteId: 'TOURISM_REGION_NAME',
      },
      render: {
        layers: [
          {
            id: 'tourism_regions_fills',
            'source-layer': 'tourism_regions',
            type: 'fill',
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
          includeRegionOutline && {
            id: 'tourism_regions_outline',
            'source-layer': 'tourism_regions',
            type: 'line',
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
    },
    ...extraLayers,
  ];

  return (
    <div className="relative w-full h-full">
      <div className="absolute -inset-5 mapbox-overlays-no-overflow">
        <Map
          width="100%"
          height="100%"
          bounds={bounds}
          viewport={viewport}
          dragPan={!selectedRegion}
          scrollZoom={!selectedRegion}
          mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onMapViewportChange={handleViewportChange}
          onHover={handleHover}
          onMouseOut={handleMapMouseLeave}
          onMapLoad={handleMapLoad}
        >
          {(map) => (
            <>
              <LayerManager map={map} plugin={PluginMapboxGl}>
                {layers.map((l) => (
                  <Layer key={l.id} {...l} />
                ))}
              </LayerManager>

              {highlightedFeature && (
                <Popup
                  className="mapbox-custom-popup"
                  latitude={highlightedFeature.geometry.coordinates[1]}
                  longitude={highlightedFeature.geometry.coordinates[0]}
                  closeButton={false}
                  closeOnClick={false}
                  dynamicPosition={false}
                  anchor="top"
                >
                  {featureTooltip(highlightedFeature)}
                </Popup>
              )}
            </>
          )}
        </Map>
      </div>
    </div>
  );
};

export default MapWidget;
