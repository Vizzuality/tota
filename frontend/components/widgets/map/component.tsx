import React, { FC, useState, useCallback } from 'react';
import { LayerManager, Layer } from '@vizzuality/layer-manager-react';
import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import Map from 'components/map';
import getBBox from '@turf/bbox';
import getCentroid from '@turf/centroid';

import type { MapWidgetProps } from './types';
import { MapEvent, Marker, Popup } from 'react-map-gl';

interface TooltipProps {
  data: any;
  label: string;
}

const Tooltip: FC<TooltipProps> = ({ data = [], label }: TooltipProps) => {
  return (
    <div className="bg-white shadow-md text-sm" style={{ minWidth: 300 }}>
      {label && <div className="bg-blue9 py-2 px-4 text-white flex flex-row justify-between">{label}</div>}
      <div className="px-4 py-2">{data.length === 0 && <div>No data available</div>}</div>
    </div>
  );
};

const MapWidget: FC<MapWidgetProps> = ({ data, featureTooltip, markerContent, selectedRegion, markers }: MapWidgetProps) => {
  const minZoom = 2;
  const maxZoom = 10;

  const [viewport, setViewport] = useState({
    latitude: 54.123389,
    longitude: -124.950408,
    zoom: 4,
    minZoom: 4,
    maxZoom: 4,
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
  const [map, setMap] = useState(null);
  const [highlightedFeature, setHighlightedFeature] = useState(null);

  const handleViewportChange = useCallback((vw) => {
    setViewport(vw);
  }, []);

  const handleMapClick = (evt: MapEvent) => {
    console.log('map click', evt);
    console.log('clicked on', evt.features[0]?.properties?.TOURISM_REGION_NAME);
  };
  const handleHover = (evt: MapEvent) => {
    const feature = evt.features[0];

    if (feature && feature.properties.TOURISM_REGION_NAME) {
      const bbox = getBBox(feature);
      const centroid = getCentroid(feature);
      centroid.properties = feature.properties;
      setHighlightedFeature(centroid);
      const { id, source, sourceLayer } = feature;
      map.setFeatureState({ source, id, sourceLayer }, { hover: true });
    } else {
      setHighlightedFeature(null);
    }
  };
  const handleMapReady = ({ map }) => {
    setMap(map);
  };
  const handleMapLoad = ({ map }) => {
    setTimeout(() => {
      if (selectedRegion) {
        map.setFilter('tourism_regions_fills', [
          'match',
          ['get', 'TOURISM_REGION_NAME'],
          selectedRegion,
          true,
          false
        ]);

        setTimeout(() => {
          const features = map.queryRenderedFeatures({ layers: ['tourism_regions_fills'] });
          if (features.length > 0) {
            const zoomToBbox = getBBox(features[0]);
            setBounds({
              ...bounds,
              bbox: zoomToBbox,
            });
          }
        }, 200)
      }
    }, 0);
  };

  const layers = [
    {
      id: 'tourism_regions',
      version: '0.0.1',
      type: 'vector',
      source: {
        url: 'mapbox://totadata.8tgd889y',
      },
      render: {
        layers: [
          {
            id: 'tourism_regions_fills',
            'source-layer': 'tourism_regions',
            type: 'fill',
            paint: {
              'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0.8],
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
        ],
      },
    },
  ];

  return (
    <div className="relative w-full h-full">
      <div className="absolute -inset-5">
        <Map
          width="100%"
          height="100%"
          bounds={bounds}
          minZoom={minZoom}
          maxZoom={maxZoom}
          viewport={viewport}
          mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onMapViewportChange={handleViewportChange}
          onClick={handleMapClick}
          onHover={handleHover}
          onMapReady={handleMapReady}
          onMapLoad={handleMapLoad}
        >
          {(map) => (
            <>
              <LayerManager map={map} plugin={PluginMapboxGl}>
                {layers.map((l) => (
                  <Layer key={l.id} {...l} />
                ))}
              </LayerManager>

              {(markers || []).map((marker) => (
                <Marker latitude={marker.latitude} longitude={marker.longitude} offsetLeft={-20} offsetTop={-10}>
                  {markerContent(marker)}
                </Marker>
              ))}

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
