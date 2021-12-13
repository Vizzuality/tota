import React, { FC, useState, useCallback, useEffect } from 'react';
import { MapEvent, Popup } from 'react-map-gl';
import getCentroid from '@turf/centroid';
import { LayerManager, Layer } from '@vizzuality/layer-manager-react';
import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';

import type { MapWidgetProps } from './types';

import Map from 'components/map';

import { REGION_BBOX } from 'constants/regions';
import { useTourismRegionsLayer } from 'hooks/layers';
import { useRegions } from 'hooks/regions';

const MapWidget: FC<MapWidgetProps> = ({
  disableHighlight = false,
  featureTooltip,
  selectedRegion,
  extraLayers = [],
  prependExtraLayers = false,
  includeTourismRegionLabels = true,
}: MapWidgetProps) => {
  const { data: regions } = useRegions();
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
    if (disableHighlight) return;

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
    if (disableHighlight) return;

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
    // removing labels as we don't need them on chart widget
    map.style.stylesheet.layers.forEach((layer) => {
      if (layer['source-layer'] === 'place_label') {
        map.removeLayer(layer.id);
      }
    });
  };
  const tourismRegionLayer = useTourismRegionsLayer(
    selectedRegion,
    disableHighlight ? 0.8 : 0,
    includeTourismRegionLabels,
  );

  useEffect(() => {
    if (selectedRegion) {
      setBounds({
        ...bounds,
        bbox: REGION_BBOX[selectedRegion],
      });
    }
  }, [selectedRegion]);

  const layers = [tourismRegionLayer];
  if (prependExtraLayers) {
    layers.unshift(...extraLayers);
  } else {
    layers.push(...extraLayers);
  }

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

              {highlightedFeature && featureTooltip && (
                <Popup
                  className="mapbox-custom-popup no-tip"
                  latitude={highlightedFeature.geometry.coordinates[1]}
                  longitude={highlightedFeature.geometry.coordinates[0]}
                  closeButton={false}
                  closeOnClick={false}
                  dynamicPosition={false}
                  anchor="top"
                >
                  {featureTooltip(highlightedFeature, regions)}
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
