import React, { FC, useState, useCallback, useEffect, useRef } from 'react';
import { MapEvent, Popup } from 'react-map-gl';
import { LayerManager, Layer } from '@vizzuality/layer-manager-react';
import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import CartoProvider from '@vizzuality/layer-manager-provider-carto';

import Map from 'components/map';
import Controls from 'components/map/controls';
import ZoomControl from 'components/map/controls/zoom';
import Legend from 'components/map/legend';
import LegendItem from 'components/map/legend/item';
import LegendTypeBasic from 'components/map/legend/types/basic';
import LegendTypeChoropleth from 'components/map/legend/types/choropleth';
import LegendTypeGradient from 'components/map/legend/types/gradient';
import Tooltip from 'components/map/tooltip';

import { REGION_BBOX } from 'constants/regions';
import { useMap } from 'hooks/map';
import { useLayers } from 'hooks/layers';
import useOnClickOutside from 'hooks/use-on-click-outside';

const cartoProvider = new CartoProvider();

export interface MapProps {
  width?: string | number;
  height?: string | number;
  mapboxApiAccessToken: string;
}

const SELECTABLE_FEATURES = [
  'development_funds',
  'organizations',
  'campgrounds',
  'accommodations',
  'airports',
  'stops',
  'ski_resorts',
  'visitor_centers',
  'first_nations_communities',
  'first_nations_business',
  'trails',
  'fires',
  'wildlife_habitats',
];

export const MainMap: FC<MapProps> = ({
  width = '100%',
  height = '100%',
  mapboxApiAccessToken,
}: MapProps): JSX.Element => {
  const minZoom = 2;
  const maxZoom = 20;
  const {
    activeLayers,
    layerSettings,
    viewport,
    changeActiveLayers,
    changeLayerSettings,
    setViewport,
    selectedRegion,
    regionChanged,
  } = useMap();
  const popupRef = useRef(null);
  const showSingleRegionSlug = selectedRegion?.slug === 'british_columbia' ? null : selectedRegion?.slug;
  const layers = useLayers(showSingleRegionSlug)
    .filter((x) => activeLayers.includes(x.id))
    .map((l) => ({
      ...l,
      visibility: layerSettings[l.id]?.visibility ?? true,
    }));

  const [bounds, setBounds] = useState({
    bbox: null,
    options: {
      padding: 50,
    },
    viewportOptions: {
      transitionDuration: 0,
    },
  });

  const handleViewportChange = (vw) => setViewport(vw);
  const handleZoomChange = useCallback(
    (zoom) => {
      setViewport({
        ...viewport,
        zoom,
      });
    },
    [viewport, setViewport],
  );

  const handleLegendItemRemove = (layerId) => {
    changeActiveLayers(activeLayers.filter((x) => x !== layerId));
  };
  const handleLegendItemVisibilityChange = (id, visibility) => {
    changeLayerSettings(id, { visibility });
  };
  const [selectedFeature, setSelectedFeature] = useState(null);

  const handleClick = (evt: MapEvent) => {
    const feature = evt.features.find((f) => SELECTABLE_FEATURES.includes(f.source));
    if (feature) {
      setSelectedFeature({
        coordinates: {
          longitude: evt.lngLat[0],
          latitude: evt.lngLat[1],
        },
        feature,
      });
    } else {
      setSelectedFeature(null);
    }
  };

  const legendItems = layers.map((layer) => ({
    id: layer.id,
    name: layer.name,
    removable: layer.id !== 'tourism_regions',
    visibility: layerSettings[layer.id]?.visibility ?? false,
    opacity: layerSettings[layer.id]?.opacity ?? 0,
    ...(layer.legendConfig || {}),
  }));
  const interactiveLayerIds = layers.filter((layer) => SELECTABLE_FEATURES.includes(layer.id)).map((layer) => layer.id);

  useEffect(() => {
    if (selectedRegion && regionChanged) {
      setBounds({
        ...bounds,
        bbox: REGION_BBOX[selectedRegion.slug],
      });
    }
  }, [selectedRegion, regionChanged]);
  const closePopup = useCallback(() => setSelectedFeature(null), []);
  useOnClickOutside(popupRef, closePopup);

  return (
    <div className="relative w-full h-full">
      <Map
        bounds={bounds}
        minZoom={minZoom}
        maxZoom={maxZoom}
        viewport={viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        width={width}
        height={height}
        interactiveLayerIds={interactiveLayerIds}
        mapboxApiAccessToken={mapboxApiAccessToken}
        onMapViewportChange={handleViewportChange}
        onClick={handleClick}
      >
        {(map) => (
          <>
            <LayerManager
              map={map}
              plugin={PluginMapboxGl}
              providers={{ [cartoProvider.name]: cartoProvider.handleData }}
            >
              {layers.map((l) => (
                <Layer key={l.id} {...l} />
              ))}
            </LayerManager>

            {selectedFeature && (
              <Popup
                className="mapbox-custom-popup"
                latitude={selectedFeature.coordinates.latitude}
                longitude={selectedFeature.coordinates.longitude}
                closeOnClick={false}
                onClose={closePopup}
                captureScroll
                capturePointerMove
              >
                <div ref={popupRef}>
                  <Tooltip feature={selectedFeature.feature} />
                </div>
              </Popup>
            )}
          </>
        )}
      </Map>
      <Controls placement="bottom-left">
        <ZoomControl
          viewport={{
            ...viewport,
            minZoom,
            maxZoom,
          }}
          onZoomChange={handleZoomChange}
        />
      </Controls>
      <Controls placement="bottom-right">
        <Legend maxHeight={400} maxWidth={500}>
          {legendItems.map((i) => {
            const { type, items } = i;
            const Component = {
              basic: LegendTypeBasic,
              choropleth: LegendTypeChoropleth,
              gradient: LegendTypeGradient,
            }[type];
            return (
              <LegendItem
                key={i.id}
                {...i}
                onRemove={handleLegendItemRemove}
                onVisibilityChange={handleLegendItemVisibilityChange}
              >
                {Component && <Component items={items} />}
              </LegendItem>
            );
          })}
        </Legend>
      </Controls>
    </div>
  );
};

export default MainMap;
