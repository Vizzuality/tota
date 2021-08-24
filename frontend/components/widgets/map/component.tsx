import React, { FC, useState, useCallback } from 'react';
import { LayerManager, Layer } from '@vizzuality/layer-manager-react';
import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import Map from 'components/map';
import getBBox from '@turf/bbox';
import getCentroid from '@turf/centroid';

import type { MapWidgetProps } from './types';
import { MapEvent, Popup } from 'react-map-gl';

const MapWidget: FC<MapWidgetProps> = ({ featureTooltip, selectedRegion }: MapWidgetProps) => {
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
    const feature = evt.features.find(f => !!f.properties.TOURISM_REGION_NAME);
    const source = 'tourism_regions';
    const sourceLayer = 'tourism_regions';

    if (feature) {
      const centroid = getCentroid(feature);
      centroid.properties = feature.properties;
      centroid.id = feature.id;
      if (highlightedFeature) {
        map.setFeatureState({ source, id: highlightedFeature.id, sourceLayer }, { hover: false });
      }
      setHighlightedFeature(centroid);
      map.setFeatureState({ source, id: feature.id, sourceLayer }, { hover: true });
    } else if (highlightedFeature) {
      map.setFeatureState({ source, id: highlightedFeature.id, sourceLayer }, { hover: false });
      setHighlightedFeature(null);
    }
  };
  const handleMapLoad = ({ map }) => {
    setMap(map);
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
        promoteId: 'TOURISM_REGION_NAME',
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
    {
      id: 'development-funds',
      name: 'Development Funds',
      type: 'geojson',
      images: [
        { id: 'marker', src: '/images/map/marker.svg', options: { sdf: true } },
      ],
      source: {
        type: 'geojson',
        data: process.env.NEXT_PUBLIC_TOTA_API + '/development_funds.geojson',
      },
      render: {
        metadata: {
          position: 'top'
        },
        layers: [
          {
            type: 'symbol',
            paint: {
              'icon-color': '#fff',
            },
            layout: {
              'icon-image': 'marker',
              'icon-size': 1
            },
            // It will put the layer on the top
            metadata: {
              position: 'top'
            }
          }
        ]
      }
    }
  ];

  return (
    <div className="relative w-full h-full">
      <div className="absolute -inset-5">
        <Map
          width="100%"
          height="100%"
          bounds={bounds}
          viewport={viewport}
          mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onMapViewportChange={handleViewportChange}
          onHover={handleHover}
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
