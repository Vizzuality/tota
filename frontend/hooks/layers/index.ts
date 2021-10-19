import { useMemo } from 'react';
import { Layer } from '@vizzuality/layer-manager-react';

import { REGION_COLORS } from 'constants/regions';
import { useRegions } from 'hooks/regions';

export const CATEGORY = {
  ADMIN_BOUNDARIES: 'Admin boundaries',
  TOURISM_BUSINESSES: 'Tourism businesses',
  ENVIRONMENT: 'Environment',
  INFRASTRUCTURES: 'Infrastructures',
};

export const getEconomicRegionsLayer = (selectedRegion: string): Layer => {
  return {
    id: 'economic_regions',
    name: 'Economic Regions',
    category: CATEGORY.ADMIN_BOUNDARIES,
    type: 'vector',
    source: {
      url: 'mapbox://totadata.1gw3u20m',
    },
    render: {
      layers: [
        {
          'source-layer': 'dev_region',
          type: 'line',
          paint: {
            'line-width': 2,
            'line-color': '#000',
          },
          ...(selectedRegion && { filter: ['match', ['get', 'TOURISM_REGION_NAME'], selectedRegion, true, false] }),
        },
        {
          'source-layer': 'dev_region',
          type: 'fill',
          paint: {
            'fill-color': '#000',
            'fill-opacity': 0.2,
          },
          ...(selectedRegion && { filter: ['match', ['get', 'TOURISM_REGION_NAME'], selectedRegion, true, false] }),
        },
        {
          'source-layer': 'dev_region',
          type: 'symbol',
          layout: {
            'text-field': ['get', 'ECONOMIC_REGION_NAME'],
            'text-justify': 'auto',
            'text-size': 14,
            'text-allow-overlap': true,
          },
          paint: {
            'text-halo-color': '#fff',
            'text-halo-width': 1,
          },
          ...(selectedRegion && { filter: ['match', ['get', 'TOURISM_REGION_NAME'], selectedRegion, true, false] }),
        },
      ],
    },
  };
};

export const useEconomicRegionsLayer = getEconomicRegionsLayer;

export const useTourismRegionsLayer = (selectedRegion: string, selectedRegionOpacity = 0): Layer => {
  const includeOutlineLayer = Boolean(selectedRegion);
  const { regions } = useRegions();

  const regionHoverOpacity = selectedRegion ? 0.8 : 1;
  const regionOpacity = selectedRegion ? selectedRegionOpacity : 0.8;

  return useMemo(() => {
    return {
      id: 'tourism_regions',
      category: CATEGORY.ADMIN_BOUNDARIES,
      name: 'Regions',
      version: '0.0.1',
      type: 'vector',
      source: {
        url: 'mapbox://totadata.8tgd889y',
        promoteId: 'TOURISM_REGION_NAME',
      },
      legendConfig: {
        type: 'basic',
        items: [
          { value: 'Cariboo Chilcotin Coast', color: REGION_COLORS.cariboo_chilcotin_coast },
          { value: 'Thompson Okanagan', color: REGION_COLORS.thompson_okanagan },
          { value: 'Vancouver Island', color: REGION_COLORS.vancouver_island },
          { value: 'Kootenay Rockies', color: REGION_COLORS.kootenay_rockies },
          { value: 'Northern British Columbia', color: REGION_COLORS.northern_british_columbia },
        ],
      },
      render: {
        layers: [
          {
            id: 'tourism_regions_fill',
            'source-layer': 'tourism_regions',
            type: 'fill',
            ...(selectedRegion && { filter: ['match', ['get', 'TOURISM_REGION_NAME'], selectedRegion, true, false] }),
            paint: {
              'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                regionHoverOpacity,
                regionOpacity,
              ],
              'fill-color': [
                'match',
                ['get', 'TOURISM_REGION_NAME'],
                'cariboo_chilcotin_coast',
                REGION_COLORS.cariboo_chilcotin_coast,
                'thompson_okanagan',
                REGION_COLORS.thompson_okanagan,
                'vancouver_island',
                REGION_COLORS.vancouver_island,
                'kootenay_rockies',
                REGION_COLORS.kootenay_rockies,
                'northern_british_columbia',
                REGION_COLORS.northern_british_columbia,
                /* other */ '#DDDDDD',
              ],
            },
          },
          includeOutlineLayer && {
            id: 'tourism_regions_outline',
            'source-layer': 'tourism_regions',
            type: 'line',
            ...(selectedRegion && { filter: ['match', ['get', 'TOURISM_REGION_NAME'], selectedRegion, true, false] }),
            paint: {
              'line-width': 3,
              'line-color': [
                'match',
                ['get', 'TOURISM_REGION_NAME'],
                'cariboo_chilcotin_coast',
                REGION_COLORS.cariboo_chilcotin_coast,
                'thompson_okanagan',
                REGION_COLORS.thompson_okanagan,
                'vancouver_island',
                REGION_COLORS.vancouver_island,
                'kootenay_rockies',
                REGION_COLORS.kootenay_rockies,
                'northern_british_columbia',
                REGION_COLORS.northern_british_columbia,
                /* other */ '#DDDDDD',
              ],
            },
          },
          {
            'source-layer': 'tourism_regions',
            type: 'symbol',
            layout: {
              'text-field': ['match', ['get', 'TOURISM_REGION_NAME'], ...regions.flatMap((r) => [r.slug, r.name]), ''],
              'text-justify': 'auto',
              'text-size': 14,
              'text-allow-overlap': true,
            },
            paint: {
              'text-halo-color': '#fff',
              'text-halo-width': 1,
            },
            ...(selectedRegion && { filter: ['match', ['get', 'TOURISM_REGION_NAME'], selectedRegion, true, false] }),
          },
        ].filter((x) => x),
      },
    };
  }, [selectedRegion]);
};

export const useTOTAMembersLayer = (selectedRegion: string): Layer => {
  const params = new URLSearchParams();

  if (selectedRegion) params.append('filter[regions.slug]', selectedRegion);
  const searchParams = Array.from(params).length > 0 ? `?${params.toString()}` : '';
  const organizationsGeoJSONUrl = `${process.env.NEXT_PUBLIC_TOTA_API}/organizations.geojson${searchParams}`;

  return {
    id: 'organizations',
    category: CATEGORY.TOURISM_BUSINESSES,
    name: 'TOTA members',
    type: 'geojson',
    source: {
      type: 'geojson',
      data: organizationsGeoJSONUrl,
    },
    render: {
      layers: [
        {
          type: 'circle',
          paint: {
            'circle-color': '#34444c',
            'circle-radius': 4,
            'circle-stroke-color': '#fff',
            'circle-stroke-width': 3,
          },
        },
      ],
    },
  };
};

export const useDevelopmentFundsLayer = (selectedRegion: string): Layer => {
  const params = new URLSearchParams();
  if (selectedRegion) params.append('filter[regions.slug]', selectedRegion);
  const searchParams = Array.from(params).length > 0 ? `?${params.toString()}` : '';
  const developmentFundsGeoJSONUrl = `${process.env.NEXT_PUBLIC_TOTA_API}/development_funds.geojson${searchParams}`;

  return {
    id: 'development_funds',
    category: CATEGORY.TOURISM_BUSINESSES,
    name: 'Development Funds',
    type: 'geojson',
    source: {
      type: 'geojson',
      data: developmentFundsGeoJSONUrl,
    },
    render: {
      layers: [
        {
          type: 'circle',
          paint: {
            'circle-color': '#34444c',
            'circle-radius': 4,
            'circle-stroke-color': '#fff',
            'circle-stroke-width': 3,
          },
        },
      ],
    },
  };
};

export const useLayers = (selectedRegion: string): Layer[] => {
  const totaMembers = useTOTAMembersLayer(selectedRegion);
  const developmentFunds = useDevelopmentFundsLayer(selectedRegion);
  const tourismRegions = useTourismRegionsLayer(selectedRegion);
  const economicRegions = useEconomicRegionsLayer(selectedRegion);

  return useMemo(
    () => [
      economicRegions,
      totaMembers,
      developmentFunds,
      {
        id: 'visitor_centres',
        name: 'BC Tourism Centers',
        category: CATEGORY.TOURISM_BUSINESSES,
        type: 'vector',
        source: {
          url: 'mapbox://totadata.a7fetiq7',
        },
        render: {
          layers: [
            {
              'source-layer': 'visitor_centres',
              type: 'circle',
              paint: {
                'circle-color': '#34444c',
                'circle-radius': 4,
                'circle-stroke-color': '#fff',
                'circle-stroke-width': 3,
              },
              ...(selectedRegion && { filter: ['match', ['get', 'TOURISM_REGION_NAME'], selectedRegion, true, false] }),
            },
          ],
        },
      },
      {
        id: 'ski_resorts',
        name: 'BC Ski resorts',
        category: CATEGORY.TOURISM_BUSINESSES,
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
              ...(selectedRegion && { filter: ['match', ['get', 'TOURISM_REGION_NAME'], selectedRegion, true, false] }),
            },
          ],
        },
      },
      {
        id: 'accommodations',
        name: 'Hello BC Accommodations Listing',
        category: CATEGORY.TOURISM_BUSINESSES,
        type: 'vector',
        source: {
          url: 'mapbox://totadata.4y0iosdv',
        },
        render: {
          layers: [
            {
              'source-layer': 'accommodations',
              type: 'circle',
              paint: {
                'circle-color': '#34444c',
                'circle-radius': 4,
                'circle-stroke-color': '#fff',
                'circle-stroke-width': 3,
              },
              ...(selectedRegion && { filter: ['match', ['get', 'TOURISM_REGION_NAME'], selectedRegion, true, false] }),
            },
          ],
        },
      },
      {
        id: 'campgrounds',
        name: 'Campsites',
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
              ...(selectedRegion && { filter: ['match', ['get', 'TOURISM_REGION_NAME'], selectedRegion, true, false] }),
            },
            {
              'source-layer': 'campgrounds',
              type: 'fill',
              paint: {
                'fill-color': 'transparent',
              },
              ...(selectedRegion && { filter: ['match', ['get', 'TOURISM_REGION_NAME'], selectedRegion, true, false] }),
            },
          ],
        },
      },
      {
        id: 'first_nations_communities',
        name: 'First Nation Community locations',
        category: CATEGORY.TOURISM_BUSINESSES,
        type: 'vector',
        source: {
          url: 'mapbox://totadata.7q627o47',
        },
        render: {
          layers: [
            {
              'source-layer': 'first_nations_communities',
              type: 'circle',
              paint: {
                'circle-color': '#34444c',
                'circle-radius': 4,
                'circle-stroke-color': '#fff',
                'circle-stroke-width': 3,
              },
              ...(selectedRegion && { filter: ['match', ['get', 'TOURISM_REGION_NAME'], selectedRegion, true, false] }),
            },
          ],
        },
      },
      {
        id: 'first_nations_business',
        name: 'BC Indigenous Business Listings',
        category: CATEGORY.TOURISM_BUSINESSES,
        type: 'vector',
        source: {
          url: 'mapbox://totadata.3pqlvqwr',
        },
        render: {
          layers: [
            {
              'source-layer': 'first_nations_business',
              type: 'circle',
              paint: {
                'circle-color': '#34444c',
                'circle-radius': 4,
                'circle-stroke-color': '#fff',
                'circle-stroke-width': 3,
              },
              ...(selectedRegion && { filter: ['match', ['get', 'TOURISM_REGION_NAME'], selectedRegion, true, false] }),
            },
          ],
        },
      },
      {
        id: 'wildlife_habitats',
        name: 'Wildlife Habitats',
        category: CATEGORY.ENVIRONMENT,
        type: 'vector',
        source: {
          url: 'mapbox://totadata.d4oseqxz',
        },
        render: {
          layers: [
            {
              'source-layer': 'wildlife_habitats',
              type: 'line',
              paint: {
                'line-width': 1,
                'line-color': '#aab7ef',
              },
              ...(selectedRegion && { filter: ['match', ['get', 'TOURISM_REGION_NAME'], selectedRegion, true, false] }),
            },
            {
              'source-layer': 'wildlife_habitats',
              type: 'fill',
              paint: {
                'fill-color': '#aab7ef',
                'fill-opacity': 0.5,
              },
              ...(selectedRegion && { filter: ['match', ['get', 'TOURISM_REGION_NAME'], selectedRegion, true, false] }),
            },
          ],
        },
      },
      {
        id: 'fires',
        name: 'All Fires Past Week',
        category: CATEGORY.ENVIRONMENT,
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
                  sql: "SELECT cartodb_id, the_geom, acq_date, acq_time, acq_date::text as date_str, acq_time::text as time_str, frp, latitude, longitude, the_geom_webmercator, CASE WHEN acq_date>= (CURRENT_DATE - interval '7 day') AND acq_date< (CURRENT_DATE - interval '6 day') THEN 7 WHEN acq_date>= (CURRENT_DATE - interval '6 day') AND acq_date< (CURRENT_DATE - interval '5 day') THEN 6 WHEN acq_date>= (CURRENT_DATE - interval '5 day') AND acq_date< (CURRENT_DATE - interval '4 day') THEN 5 WHEN acq_date>= (CURRENT_DATE - interval '4 day') AND acq_date< (CURRENT_DATE - interval '3 day') THEN 4 WHEN acq_date>= (CURRENT_DATE - interval '3 day') AND acq_date< (CURRENT_DATE - interval '2 day') THEN 3 WHEN acq_date>= (CURRENT_DATE - interval '2 day') AND acq_date< (CURRENT_DATE - interval '1 day') THEN 2 WHEN acq_date>= (CURRENT_DATE - interval '1 day') THEN 1 ELSE -1 END AS days_ago FROM suomi_viirs_c2_global_7d where (acq_date> (CURRENT_DATE - interval '7 day')) ORDER BY acq_date asc, frp asc",
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
              value: '7 days ago',
              color: '#EA0000',
              id: 0,
            },
            {
              value: '6 days ago',
              color: '#FF2600',
              id: 1,
            },
            {
              value: '5 days ago',
              color: '#FF6600',
              id: 2,
            },
            {
              value: '4 days ago',
              color: '#FF8C00',
              id: 3,
            },
            {
              value: '3 days ago',
              color: '#FFB200',
              id: 4,
            },
            {
              value: '2 days ago',
              color: '#FFD900',
              id: 5,
            },
            {
              value: '1 day ago',
              color: '#FFFF00',
              id: 6,
            },
          ],
        },
      },
      {
        id: 'stops',
        name: 'Stops of Interest',
        category: CATEGORY.INFRASTRUCTURES,
        type: 'vector',
        source: {
          url: 'mapbox://totadata.00a7vg81',
        },
        render: {
          layers: [
            {
              'source-layer': 'stops',
              type: 'circle',
              paint: {
                'circle-color': '#34444c',
                'circle-radius': 4,
                'circle-stroke-color': '#fff',
                'circle-stroke-width': 3,
              },
              ...(selectedRegion && { filter: ['match', ['get', 'TOURISM_REGION_NAME'], selectedRegion, true, false] }),
            },
          ],
        },
      },
      {
        id: 'airports',
        name: 'BC Airports',
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
              ...(selectedRegion && { filter: ['match', ['get', 'TOURISM_REGION_NAME'], selectedRegion, true, false] }),
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
              ...(selectedRegion && { filter: ['match', ['get', 'TOURISM_REGION_NAME'], selectedRegion, true, false] }),
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
              value: 'low',
              color: '#aab7ef',
              id: 0,
            },
            {
              value: 'moderate',
              color: '#4264fb',
              id: 1,
            },
            {
              value: 'heavy',
              color: '#ee4e8b',
              id: 2,
            },
            {
              value: 'severe',
              color: '#b43b71',
              id: 3,
            },
          ],
        },
      },
      tourismRegions,
    ],
    [selectedRegion],
  );
};
