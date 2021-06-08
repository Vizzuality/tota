import { Layer } from '@vizzuality/layer-manager-react';

const layers: Layer = [
  {
    id: 'ski_resorts',
    version: '0.0.1',
    type: 'vector',
    source: {
      url: 'mapbox://totadata.be78g4xu',
    },
    render: {
      layers: [
        {
          'source-layer': 'ski_resorts',
          type: 'line',
          paint: {
            'line-color': 'black',
          },
        },
        {
          'source-layer': 'ski_resorts',
          type: 'fill',
          paint: {
            'fill-color': 'transparent',
          },
        },
      ],
    },
  },
  {
    id: 'tourism_regions',
    version: '0.0.1',
    type: 'vector',
    source: {
      url: 'mapbox://totadata.cb1lvmde',
    },
    render: {
      layers: [
        {
          'source-layer': 'tourism_regions',
          type: 'line',
          paint: {
            'line-color': 'red',
          },
        },
        {
          'source-layer': 'tourism_regions',
          type: 'fill',
          paint: {
            'fill-color': 'blue',
          },
        },
      ],
    },
  },
];

export default layers;
