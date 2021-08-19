import { Layer } from '@vizzuality/layer-manager-react';

const layers: Layer = [
  {
    id: 'ski_resorts',
    version: '0.0.1',
    type: 'vector',
    source: {
      url: 'mapbox://totadata.arvkb438',
    },
    render: {
      layers: [
        {
          'source-layer': 'ski_resorts',
          type: 'circle',
          paint: {
            'circle-color': '#34444c',
            'circle-radius': 4,
            'circle-stroke-color': '#fff',
            'circle-stroke-width': 3,
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
      url: 'mapbox://totadata.8tgd889y',
    },
    render: {
      layers: [
        {
          'source-layer': 'tourism_regions',
          type: 'fill',
          paint: {
            'fill-opacity': 0.8,
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

export default layers;
