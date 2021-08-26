import { Layer } from '@vizzuality/layer-manager-react';

const layers: Layer[] = [
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
  {
    id: 'fires',
    name: 'July 05, 2021 - July 11, 2021 All Fires',
    description: 'This layer shows fires detected in the past week.',
    type: 'vector',
    version: '3.0',
    source: {
      type: 'vector',
      promoteId: 'cartodb_id',
      provider: {
        type: 'carto',
        account: 'rw-nrt',
        layers: [
          {
            type: 'cartodb',
            options: {
              sql: "SELECT cartodb_id, the_geom, acq_date, acq_time, acq_date::text as date_str, acq_time::text as time_str, frp, latitude, longitude, the_geom_webmercator, CASE WHEN acq_date>= (CURRENT_DATE - interval '7 day') AND acq_date< (CURRENT_DATE - interval '6 day') THEN 7 WHEN acq_date>= (CURRENT_DATE - interval '6 day') AND acq_date< (CURRENT_DATE - interval '5 day') THEN 6 WHEN acq_date>= (CURRENT_DATE - interval '5 day') AND acq_date< (CURRENT_DATE - interval '4 day') THEN 5 WHEN acq_date>= (CURRENT_DATE - interval '4 day') AND acq_date< (CURRENT_DATE - interval '3 day') THEN 4 WHEN acq_date>= (CURRENT_DATE - interval '3 day') AND acq_date< (CURRENT_DATE - interval '2 day') THEN 3 WHEN acq_date>= (CURRENT_DATE - interval '2 day') AND acq_date< (CURRENT_DATE - interval '1 day') THEN 2 WHEN acq_date>= (CURRENT_DATE - interval '1 day') THEN 1 ELSE -1 END AS days_ago FROM vnp14imgtdl_nrt_global_7d where (acq_date> (CURRENT_DATE - interval '7 day')) ORDER BY acq_date asc, frp asc",
              cartocss:
                '#layer { marker-width: 4; marker-fill-opacity: 1; marker-line-color: #FFF; marker-line-width: 0; marker-line-opacity: 1; marker-placement: point; marker-type: ellipse; marker-allow-overlap: true; }[days_ago=7]{marker-fill: #EA0000;}[days_ago=6]{marker-fill: #FF2600;}[days_ago=5]{marker-fill: #FF6600;}[days_ago=4]{marker-fill: #FF8C00;}[days_ago=3]{marker-fill: #FFB200;}[days_ago=2]{marker-fill: #FFD900;}[days_ago=1]{marker-fill: #FFFF00;}',
              cartocss_version: '2.3.0',
            },
          },
        ],
      },
    },
    render: {
      layers: [
        {
          type: 'circle',
          'source-layer': 'layer0',
          paint: {
            'circle-color': [
              'step',
              ['to-number', ['get', 'days_ago']],
              '#FFFF00',
              2,
              '#FFD900',
              3,
              '#FFB200',
              4,
              '#FF8C00',
              5,
              '#FF6600',
              6,
              '#FF2600',
              7,
              '#EA0000',
            ],
            'circle-stroke-color': '#ccc',
            'circle-opacity': 0.9,
            'circle-stroke-opacity': 0.3,
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 0, 1, 6, 4, 12, 12, 16, 90],
          },
          filter: ['all'],
        },
      ],
    },
    legendConfig: {
      type: 'choropleth',
      items: [
        {
          name: '7 days ago',
          color: '#EA0000',
          id: 0,
        },
        {
          name: '6 days ago',
          color: '#FF2600',
          id: 1,
        },
        {
          name: '5 days ago',
          color: '#FF6600',
          id: 2,
        },
        {
          name: '4 days ago',
          color: '#FF8C00',
          id: 3,
        },
        {
          name: '3 days ago',
          color: '#FFB200',
          id: 4,
        },
        {
          name: '2 days ago',
          color: '#FFD900',
          id: 5,
        },
        {
          name: '1 day ago',
          color: '#FFFF00',
          id: 6,
        },
      ],
    },
  },
];

export default layers;
