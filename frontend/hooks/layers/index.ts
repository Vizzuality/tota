import { useMemo } from 'react';
import { Layer } from '@vizzuality/layer-manager-react';

export const CATEGORY = {
  ADMIN_BOUNDARIES: 'Admin boundaries',
  TOURISM_BUSINESSES: 'Tourism businesses',
  ENVIRONMENT: 'Environment',
  INFRASTRUCTURES: 'Infrastructures',
};

export const useTourismRegionsLayer = (selectedRegion: string): Layer => {
  /* const includeFillLayer = !Boolean(selectedRegion); */
  const includeOutlineLayer = Boolean(selectedRegion);

  const regionHoverOpacity = selectedRegion ? 0.8 : 1;
  const regionOpacity = selectedRegion ? 0 : 0.8;

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
          { value: 'Cariboo Chilcotin Coast', color: '#9B6014' },
          { value: 'Thompson Okanagan', color: '#76ACA9' },
          { value: 'Vancouver Island', color: '#4F91CD' },
          { value: 'Kootenay Rockies', color: '#405E62' },
          { value: 'Northern British Columbia', color: '#A9B937' },
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

export const useLayers = (selectedRegion: string): Layer[] => {
  const totaMembers = useTOTAMembersLayer(selectedRegion);
  const tourismRegions = useTourismRegionsLayer(selectedRegion);

  return useMemo(
    () => [
      {
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
            },
            {
              'source-layer': 'dev_region',
              type: 'fill',
              paint: {
                'fill-color': '#000',
                'fill-opacity': 0.2,
              },
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
            },
          ],
        },
      },
      totaMembers,
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
            },
          ],
        },
      },
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
            },
            {
              'source-layer': 'wildlife_habitats',
              type: 'fill',
              paint: {
                'fill-color': '#aab7ef',
                'fill-opacity': 0.5,
              },
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
      tourismRegions,
    ],
    [selectedRegion],
  );
};
