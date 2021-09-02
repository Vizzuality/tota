import { Layer } from '@vizzuality/layer-manager-react';

const CATEGORY = {
  INFRASTRUCTURES: 'Infrastructures',
  ADMIN_BOUNDARIES: 'Admin boundaries',
  TOURISM_BUSINESSES: 'Tourism businesses',
  ENVIRONMENT: 'Environment',
};

const layers: Layer[] = [
  {
    id: 'ski_resorts',
    name: 'Ski Resorts',
    category: CATEGORY.INFRASTRUCTURES,
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
    category: CATEGORY.TOURISM_BUSINESSES,
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
    category: CATEGORY.INFRASTRUCTURES,
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
    id: 'trails',
    name: 'Trails',
    category: CATEGORY.INFRASTRUCTURES,
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
  {
    id: 'traffic',
    name: 'Traffic',
    category: CATEGORY.INFRASTRUCTURES,
    type: 'vector',
    source: {
      url: 'mapbox://mapbox.mapbox-traffic-v1',
    },
    render: {
      layers: [
        {
          id: 'traffic',
          source: 'mapbox-traffic',
          'source-layer': 'traffic',
          type: 'line',
          paint: {
            'line-width': 1.5,
            'line-color': [
              'case',
              ['==', 'low', ['get', 'congestion']],
              '#aab7ef',
              ['==', 'moderate', ['get', 'congestion']],
              '#4264fb',
              ['==', 'heavy', ['get', 'congestion']],
              '#ee4e8b',
              ['==', 'severe', ['get', 'congestion']],
              '#b43b71',
              '#000000',
            ],
          },
        },
      ],
    },
    legendConfig: {
      type: 'choropleth',
      items: [
        {
          name: 'low',
          color: '#aab7ef',
          id: 0,
        },
        {
          name: 'moderate',
          color: '#4264fb',
          id: 1,
        },
        {
          name: 'heavy',
          color: '#ee4e8b',
          id: 2,
        },
        {
          name: 'severe',
          color: '#b43b71',
          id: 3,
        },
      ],
    },
  },
];

export default layers;
