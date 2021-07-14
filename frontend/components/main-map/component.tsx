import { FC, useState, useCallback } from 'react';
import { LayerManager, Layer } from '@vizzuality/layer-manager-react';
import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { Marker } from 'react-map-gl';
import Map from 'components/map';
import Controls from 'components/map/controls';
import ZoomControl from 'components/map/controls/zoom';
import FitBoundsControl from 'components/map/controls/fit-bounds';
import layers from './layers';

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
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 4,
    minZoom,
    maxZoom,
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
        onClick={(e) => {
          if (e && e.features) {
            console.log('e', e.features);
          }
        }}
      >
        {(map) => (
          <>
            <LayerManager map={map} plugin={PluginMapboxGl}>
              {layers.map((l) => (
                <Layer key={l.id} {...l} />
              ))}
            </LayerManager>
            {/* Marker needs to be reprojected */}
            <Marker latitude={-58.66} longitude={-66.27} offsetLeft={-20} offsetTop={-10}>
              <div className="w-3 h-3 rounded-full bg-black" />
            </Marker>
          </>
        )}
      </Map>
      <Controls>
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
    </div>
  );
};

export default MainMap;
