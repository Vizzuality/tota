import React, { FC, useState, useCallback, useEffect } from 'react';
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
import FitBoundsControl from 'components/map/controls/fit-bounds';

import { REGION_BBOX } from 'constants/regions';
import { useMap, useTourismRegionsLayer } from 'hooks/map';
import LAYERS from 'components/main-map/layers';

const cartoProvider = new CartoProvider();

export interface MapProps {
  width?: string | number;
  height?: string | number;
  mapboxApiAccessToken: string;
}

export const MainMap: FC<MapProps> = ({
  width = '100%',
  height = '100%',
  mapboxApiAccessToken,
}: MapProps): JSX.Element => {
  const minZoom = 2;
  const maxZoom = 10;
  const [viewport, setViewport] = useState({
    latitude: 54.123389,
    longitude: -124.950408,
    zoom: 5,
    minZoom,
    maxZoom,
  });
  const { activeLayers, layerSettings, changeActiveLayers, changeLayerSettings, selectedRegion } = useMap();
  const showSingleRegionSlug = selectedRegion?.slug === 'british_columbia' ? null : selectedRegion?.slug;
  const tourismRegionLayer = useTourismRegionsLayer(showSingleRegionSlug);
  const layers = [...LAYERS, tourismRegionLayer]
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

  const handleViewportChange = useCallback((vw) => {
    setViewport(vw);
  }, []);

  const handleZoomChange = useCallback(
    (zoom) => {
      setViewport({
        ...viewport,
        zoom,
      });
    },
    [viewport],
  );

  const handleFitBoundsChange = useCallback((b) => {
    setBounds(b);
  }, []);

  const handleLegendItemRemove = (layerId) => {
    changeActiveLayers(activeLayers.filter((x) => x !== layerId));
  };
  const handleLegendItemVisibilityChange = (id, visibility) => {
    changeLayerSettings(id, { visibility });
  };

  const legendItems = layers.map((layer) => ({
    id: layer.id,
    name: layer.name,
    removable: layer.id !== 'tourism_regions',
    visibility: layerSettings[layer.id]?.visibility ?? false,
    opacity: layerSettings[layer.id]?.opacity ?? 0,
    ...(layer.legendConfig || {}),
  }));

  useEffect(() => {
    if (selectedRegion) {
      setBounds({
        ...bounds,
        bbox: REGION_BBOX[selectedRegion.slug],
      });
    }
  }, [selectedRegion]);

  console.log(legendItems);

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
        mapboxApiAccessToken={mapboxApiAccessToken}
        onMapViewportChange={handleViewportChange}
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
        <FitBoundsControl bounds={bounds} onFitBoundsChange={handleFitBoundsChange} />
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
