import { useCallback, useState } from 'react';
import { Story } from '@storybook/react/types-6-0';

// Layer manager
import { LayerManager, Layer } from '@vizzuality/layer-manager-react';
import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';

// Controls
import Controls from 'components/map/controls';
import ZoomControl from 'components/map/controls/zoom';
import FitBoundsControl from 'components/map/controls/fit-bounds';

// Map
import Map, { MapProps } from './component';

const LAYERS = [
  // RASTER LAYER
  {
    id: 'gain',
    type: 'raster',
    source: {
      type: 'raster',
      tiles: ['http://earthengine.google.org/static/hansen_2013/gain_alpha/{z}/{x}/{y}.png'],
      minzoom: 3,
      maxzoom: 12,
    },
    render: {
      layers: [
        {
          minzoom: 3, // https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#minzoom
          maxzoom: 12, // https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#maxzoom
          paint: {
            'raster-saturation': -1,
          },
        },
      ],
    },
  },

  // DECODED RASTER LAYER
  {
    id: 'loss',
    type: 'raster',
    source: {
      type: 'raster',
      tiles: ['https://storage.googleapis.com/wri-public/Hansen_16/tiles/hansen_world/v1/tc30/{z}/{x}/{y}.png'],
      minzoom: 3,
      maxzoom: 12,
    },
    decodeParams: {
      startYear: 2001,
      endYear: 2018,
    },
    decodeFunction: `
      // values for creating power scale, domain (input), and range (output)
      float domainMin = 0.;
      float domainMax = 255.;
      float rangeMin = 0.;
      float rangeMax = 255.;

      float exponent = zoom < 13. ? 0.3 + (zoom - 3.) / 20. : 1.;
      float intensity = color.r * 255.;

      // get the min, max, and current values on the power scale
      float minPow = pow(domainMin, exponent - domainMin);
      float maxPow = pow(domainMax, exponent);
      float currentPow = pow(intensity, exponent);

      // get intensity value mapped to range
      float scaleIntensity = ((currentPow - minPow) / (maxPow - minPow) * (rangeMax - rangeMin)) + rangeMin;
      // a value between 0 and 255
      alpha = zoom < 13. ? scaleIntensity / 255. : color.g;

      float year = 2000.0 + (color.b * 255.);
      // map to years
      if (year >= startYear && year <= endYear && year >= 2001.) {
        color.r = 220. / 255.;
        color.g = (72. - zoom + 102. - 3. * scaleIntensity / zoom) / 255.;
        color.b = (33. - zoom + 153. - intensity / zoom) / 255.;
      } else {
        alpha = 0.;
      }
    `,
  },

  // GEOJSON DATA LAYER
  {
    id: 'multipolygon',
    type: 'geojson',
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [10.65673828125, 43.937461690316646],
                  [10.5194091796875, 43.87017822557581],
                  [10.52490234375, 43.757208878849376],
                  [10.6072998046875, 43.6499881760459],
                  [10.72540283203125, 43.71156424665851],
                  [10.75286865234375, 43.7968715826214],
                  [10.755615234375, 43.854335770789575],
                  [10.843505859375, 43.75125720420175],
                  [10.93963623046875, 43.8028187190472],
                  [10.9588623046875, 43.88997537383687],
                  [10.90118408203125, 44.01257086123085],
                  [10.7940673828125, 43.94339481559037],
                  [10.85174560546875, 43.872158236415416],
                  [10.8050537109375, 43.87017822557581],
                  [10.7281494140625, 43.87611806075357],
                  [10.73638916015625, 43.9058083561574],
                  [10.7391357421875, 43.95525928989669],
                  [10.65673828125, 44.008620115415354],
                  [10.65673828125, 43.937461690316646],
                ],
              ],
            },
          },
        ],
      },
    },
    render: {
      layers: [
        {
          type: 'fill',
          paint: {
            'fill-color': '#FFBB00',
            'fill-opacity': 1,
          },
        },
        {
          type: 'line',
          paint: {
            'line-color': '#000000',
            'line-opacity': 0.1,
          },
        },
      ],
    },
  },

  // VECTOR LAYER PROVIDER CARTO
  {
    params: {
      color: '#00BBFF',
    },
    id: 'protected-areas',
    type: 'vector',
    source: {
      type: 'vector',
      provider: {
        type: 'carto',
        account: 'wri-01',
        layers: [
          {
            options: {
              cartocss: '#wdpa_protected_areas {  polygon-opacity: 1.0; polygon-fill: #704489 }',
              cartocss_version: '2.3.0',
              sql: 'SELECT * FROM wdpa_protected_areas',
            },
            type: 'cartodb',
          },
        ],
      },
    },
    render: {
      layers: [
        {
          type: 'fill',
          'source-layer': 'layer0',
          paint: {
            'fill-color': '{color}',
            'fill-opacity': 1,
          },
        },
        {
          type: 'line',
          'source-layer': 'layer0',
          paint: {
            'line-color': '#000000',
            'line-opacity': 0.1,
          },
        },
      ],
    },
  },
];

export default {
  title: 'Components/Map',
  component: Map,
  argTypes: {
    ReactMapGLAttributes: {
      name: 'All ReactMapGL props',
      description: 'http://visgl.github.io/react-map-gl/',
      table: {
        type: {
          summary: 'ReactMapGLAttributes',
        },
      },
      control: {
        disable: true,
      },
    },
    mapboxApiAccessToken: {
      description: 'http://visgl.github.io/react-map-gl/docs/api-reference/static-map#mapboxapiaccesstoken',
      table: {
        type: {
          summary: 'ReactMapGLAttributes',
        },
      },
      control: {
        disable: true,
      },
    },
    children: {
      control: {
        disable: true,
      },
    },
  },
};

const Template: Story<MapProps> = (args: MapProps) => {
  const { bounds: aBounds } = args;
  const minZoom = 2;
  const maxZoom = 10;
  const [viewport, setViewport] = useState({});
  const [bounds, setBounds] = useState(aBounds);

  const handleViewportChange = useCallback((vw) => {
    setViewport(vw);
  }, []);

  const handleZoomChange = useCallback(
    (zoom) => {
      setViewport({
        ...viewport,
        zoom,
        transitionDuration: 500,
      });
    },
    [viewport],
  );

  const handleFitBoundsChange = useCallback((b) => {
    setBounds(b);
  }, []);

  return (
    <div className="relative w-full h-96">
      <Map
        {...args}
        bounds={bounds}
        minZoom={minZoom}
        maxZoom={maxZoom}
        viewport={viewport}
        mapboxApiAccessToken={process.env.STORYBOOK_MAPBOX_API_TOKEN}
        mapStyle="mapbox://styles/marxan/ckn4fr7d71qg817kgd9vuom4s"
        onMapViewportChange={handleViewportChange}
      >
        {(map) => (
          <LayerManager map={map} plugin={PluginMapboxGl}>
            {LAYERS.map((l) => (
              <Layer key={l.id} {...l} />
            ))}
          </LayerManager>
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

        <FitBoundsControl
          bounds={{
            ...bounds,
            viewportOptions: {
              transitionDuration: 1500,
            },
          }}
          onFitBoundsChange={handleFitBoundsChange}
        />
      </Controls>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  className: '',
  viewport: {},
  bounds: {
    bbox: [10.5194091796875, 43.6499881760459, 10.9588623046875, 44.01257086123085],
    options: {
      padding: 50,
    },
    viewportOptions: {
      transitionDuration: 0,
    },
  },
  onMapViewportChange: (viewport) => {
    // eslint-disable-next-line no-console
    console.info('onMapViewportChange: ', viewport);
  },
  onMapReady: ({ map, mapContainer }) => {
    // eslint-disable-next-line no-console
    console.info('onMapReady: ', map, mapContainer);
  },
  onMapLoad: ({ map, mapContainer }) => {
    // eslint-disable-next-line no-console
    console.info('onMapLoad: ', map, mapContainer);
  },
};
