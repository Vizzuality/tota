import React, { useState, useRef, FC } from 'react';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
import { LayerManager, Layer } from 'layer-manager/dist/components';
import { PluginMapboxGl } from 'layer-manager';

import layers from './layers';

export interface MapProps {
  width?: string | number;
  height?: string | number;
  mapboxApiAccessToken: string;
}

const Map: FC<MapProps> = ({ width = '100%', height = '100%', mapboxApiAccessToken }: MapProps) => {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 4,
  });
  const [loaded, setLoaded] = useState(false);
  const mapRef = useRef(null);
  const controlStyle = {
    right: 10,
    top: 10,
  };

  return (
    <div className="w-full h-screen">
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        width={width}
        height={height}
        mapboxApiAccessToken={mapboxApiAccessToken}
        onLoad={() => setLoaded(true)}
        onViewportChange={setViewport}
      >
        <NavigationControl style={controlStyle} />
        {loaded && mapRef.current && (
          <LayerManager map={mapRef.current.getMap()} plugin={PluginMapboxGl}>
            {layers.map((l) => (
              <Layer key={l.id} {...l} />
            ))}
          </LayerManager>
        )}
      </ReactMapGL>
    </div>
  );
};

export default Map;
