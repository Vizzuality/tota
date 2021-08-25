import { Layer } from '@vizzuality/layer-manager-react';

const layers: Layer = [
  {
    id: 'ski_resorts',
    name: 'Ski Resorts',
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
    id: 'campgrounds',
    name: 'Campgrounds',
    version: '0.0.1',
    type: 'vector',
    source: {
      url: 'mapbox://totadata.3521qubk',
    },
    render: {
      layers: [
        {
          'source-layer': 'campgrounds',
          type: 'circle',
          paint: {
            'circle-color': '#34444c',
            'circle-radius': 4,
            'circle-stroke-color': '#fff',
            'circle-stroke-width': 3,
          },
        },
        {
          'source-layer': 'campgrounds',
          type: 'fill',
          paint: {
            'fill-color': 'transparent',
          },
        },
      ],
    },
  },
  {
    id: 'airports',
    name: 'Airports',
    version: '0.0.1',
    type: 'vector',
    source: {
      url: 'mapbox://totadata.1oumvy1n',
    },
    render: {
      layers: [
        {
          'source-layer': 'airports',
          type: 'circle',
          paint: {
            'circle-color': '#34444c',
            'circle-radius': 4,
            'circle-stroke-color': '#fff',
            'circle-stroke-width': 3,
          },
        },
        {
          'source-layer': 'airports',
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
    name: 'Regions',
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
  {
    id: 'trails',
    name: 'Trails',
    version: '0.0.1',
    type: 'vector',
    source: {
      url: 'mapbox://totadata.1mtxwqap',
    },
    render: {
      layers: [
        {
          'source-layer': 'trails',
          type: 'line',
          paint: {
            'line-color': '#000000',
            'line-opacity': 0.4,
          },
        },
      ],
    },
  },
];

export default layers;
