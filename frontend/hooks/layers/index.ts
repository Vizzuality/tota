import { useMemo } from 'react';
import { Layer } from '@vizzuality/layer-manager-react';

import ACCESSIBLE_BUSINESSES_SVG from 'svgs/map/markers/accessible-businesses.svg?url';
import AIRPORTS_SVG from 'svgs/map/markers/airports.svg?url';
import BC_INDIGENOUS_BUSINESSES_SVG from 'svgs/map/markers/bc-indigenous-businesses.svg?url';
import VISITORS_CENTERS_SVG from 'svgs/map/markers/visitors-centers.svg?url';
import BIOSPHERE_PROGRAM_SVG from 'svgs/map/markers/biosphere-program.svg?url';
import CAMPSITES_SVG from 'svgs/map/markers/campsites.svg?url';
import DEVELOPMENT_FUNDS_SVG from 'svgs/map/markers/development-funds.svg?url';
import FIRES_1_SVG from 'svgs/map/markers/fires-1.svg?url';
import FIRES_2_SVG from 'svgs/map/markers/fires-2.svg?url';
import FIRES_3_SVG from 'svgs/map/markers/fires-3.svg?url';
import FIRES_4_SVG from 'svgs/map/markers/fires-4.svg?url';
import FIRES_5_SVG from 'svgs/map/markers/fires-5.svg?url';
import FIRES_6_SVG from 'svgs/map/markers/fires-6.svg?url';
import FIRES_7_SVG from 'svgs/map/markers/fires-7.svg?url';
import FIRST_NATION_COMMUNITY_SVG from 'svgs/map/markers/first-nation-community.svg?url';
import ACCOMMODATIONS_SVG from 'svgs/map/markers/accommodations.svg?url';
import INDIGENOUS_BUSINESSES_SVG from 'svgs/map/markers/indigenous-businesses.svg?url';
import ORGANIZATIONS_2_SVG from 'svgs/map/markers/organizations-2.svg?url';
import ORGANIZATIONS_3_SVG from 'svgs/map/markers/organizations-3.svg?url';
import ORGANIZATIONS_SVG from 'svgs/map/markers/organizations.svg?url';
import SKI_RESORTS_SVG from 'svgs/map/markers/ski-resorts.svg?url';
import STOPS_OF_INTEREST_SVG from 'svgs/map/markers/stops-of-interest.svg?url';

import { REGION_COLORS } from 'constants/regions';
import { useRegions } from 'hooks/regions';

const MARKER_ALLOW_OVERLAP = true;

export const CATEGORY = {
  ADMIN_BOUNDARIES: 'Admin Boundaries',
  TOURISM_SUPPLY_SIDE: 'Tourism Supply Side',
  ENVIRONMENT: 'Environment',
  INFRASTRUCTURES: 'Infrastructures',
};

const TRAFFIC_COLORS = {
  low: '#93C761',
  moderate: '#E08331',
  heavy: '#D22D1F',
  severe: '#91241D',
};

const FIRE_COLORS = {
  days1: '#D72D20',
  days2: '#EB4025',
  days3: '#ED702E',
  days4: '#F09236',
  days5: '#F4B53F',
  days6: '#F9DB4A',
  days7: '#FFFF55',
};

const BC_FIRES_POLYGON_GEOJSON = {
  type: 'Polygon',
  coordinates: [
    [
      [-139.39453125, 60.08676274626006],
      [-137.5048828125, 58.74540696858028],
      [-135.6591796875, 59.489726035537075],
      [-132.275390625, 56.65622649350222],
      [-130.60546875, 55.801280971180454],
      [-131.7041015625, 54.54657953840501],
      [-134.0771484375, 54.213861000644926],
      [-131.4404296875, 51.6180165487737],
      [-124.1015625, 47.989921667414194],
      [-121.9921875, 48.42920055556841],
      [-121.06933593749999, 48.8936153614802],
      [-113.3349609375, 48.8936153614802],
      [-115.4443359375, 51.17934297928927],
      [-119.61914062499999, 53.9560855309879],
      [-119.70703125, 60.174306261926034],
      [-139.39453125, 60.08676274626006],
    ],
  ],
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

export const useTourismRegionsLayer = (
  selectedRegion: string,
  selectedRegionOpacity = 0,
  includeLabels = true,
): Layer => {
  const includeOutlineLayer = Boolean(selectedRegion);
  const { data: regions } = useRegions();

  const regionHoverOpacity = selectedRegion ? 0.8 : 1;
  const regionOpacity = selectedRegion ? selectedRegionOpacity : 0.8;

  return useMemo(() => {
    return {
      id: 'tourism_regions',
      category: CATEGORY.ADMIN_BOUNDARIES,
      name: 'Tourism Regions',
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
          { value: 'Northern British Columbia', color: REGION_COLORS.northern_british_columbia },
          { value: 'Kootenay Rockies', color: REGION_COLORS.kootenay_rockies },
          { value: 'Thompson Okanagan', color: REGION_COLORS.thompson_okanagan },
          { value: 'Vancouver Coast and Mountains', color: REGION_COLORS.vancouver_coast_and_mountains },
          { value: 'Vancouver Island', color: REGION_COLORS.vancouver_island },
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
                'vancouver_coast_and_mountains',
                REGION_COLORS.vancouver_coast_and_mountains,
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
                'vancouver_coast_and_mountains',
                REGION_COLORS.vancouver_coast_and_mountains,
                /* other */ '#DDDDDD',
              ],
            },
          },
          includeLabels && {
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
  params.append(
    'fields',
    'id,latitude,longitude,indigenous_ownership,biosphere_program_member,accessibility,features_number',
  );
  const searchParams = Array.from(params).length > 0 ? `?${params.toString()}` : '';
  const organizationsGeoJSONUrl = `${process.env.NEXT_PUBLIC_TOTA_API_PATH}/organizations.geojson${searchParams}`;

  return {
    id: 'organizations',
    category: CATEGORY.TOURISM_SUPPLY_SIDE,
    name: 'Tourism Businesses',
    type: 'geojson',
    source: {
      type: 'geojson',
      data: organizationsGeoJSONUrl,
    },
    images: [
      { id: 'organizations_accessibility', src: ACCESSIBLE_BUSINESSES_SVG },
      { id: 'organizations_indigenous', src: INDIGENOUS_BUSINESSES_SVG },
      { id: 'organizations_biosphere', src: BIOSPHERE_PROGRAM_SVG },
      { id: 'organizations_2', src: ORGANIZATIONS_2_SVG },
      { id: 'organizations_3', src: ORGANIZATIONS_3_SVG },
      { id: 'organizations_default', src: ORGANIZATIONS_SVG },
    ],
    legendConfig: {
      type: 'basic',
      items: [
        { value: 'Tourism business', icon: ORGANIZATIONS_SVG },
        { value: 'Biosphere program', icon: BIOSPHERE_PROGRAM_SVG },
        { value: 'Indigenous ownership', icon: INDIGENOUS_BUSINESSES_SVG },
        { value: 'Accessible businesses', icon: ACCESSIBLE_BUSINESSES_SVG },
      ],
    },
    render: {
      layers: [
        {
          id: 'organizations',
          type: 'symbol',
          layout: {
            'icon-image': [
              'case',
              ['==', ['get', 'features_number'], 2],
              'organizations_2',
              ['==', ['get', 'features_number'], 3],
              'organizations_3',
              [
                'case',
                ['==', ['get', 'indigenous_ownership'], true],
                'organizations_indigenous',
                ['==', ['get', 'biosphere_program_member'], true],
                'organizations_biosphere',
                ['==', ['get', 'accessibility'], true],
                'organizations_accessibility',
                'organizations_default',
              ],
            ],
            'icon-size': 1,
            'icon-anchor': 'bottom',
            'icon-allow-overlap': MARKER_ALLOW_OVERLAP,
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
  const developmentFundsGeoJSONUrl = `${process.env.NEXT_PUBLIC_TOTA_API_PATH}/development_funds.geojson${searchParams}`;

  return {
    id: 'development_funds',
    category: CATEGORY.TOURISM_SUPPLY_SIDE,
    name: 'Development Funds',
    type: 'geojson',
    source: {
      type: 'geojson',
      data: developmentFundsGeoJSONUrl,
    },
    legendConfig: {
      type: 'basic',
      items: [{ value: 'Development Funds', icon: DEVELOPMENT_FUNDS_SVG }],
    },
    images: [{ id: 'development_funds_marker', src: DEVELOPMENT_FUNDS_SVG }],
    render: {
      layers: [
        {
          id: 'development_funds',
          type: 'symbol',
          layout: {
            'icon-image': 'development_funds_marker',
            'icon-size': 1,
            'icon-anchor': 'bottom',
            'icon-allow-overlap': MARKER_ALLOW_OVERLAP,
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
        id: 'visitor_centers',
        name: 'Visitor Centres',
        category: CATEGORY.TOURISM_SUPPLY_SIDE,
        type: 'vector',
        source: {
          url: 'mapbox://totadata.a7fetiq7',
        },
        images: [{ id: 'visitors_centers_marker', src: VISITORS_CENTERS_SVG }],
        legendConfig: {
          type: 'basic',
          items: [{ value: 'Visitor Centers', icon: VISITORS_CENTERS_SVG }],
        },
        render: {
          layers: [
            {
              id: 'visitor_centers',
              'source-layer': 'visitor_centres',
              type: 'symbol',
              layout: {
                'icon-image': 'visitors_centers_marker',
                'icon-size': 1,
                'icon-anchor': 'bottom',
                'icon-allow-overlap': MARKER_ALLOW_OVERLAP,
              },
              ...(selectedRegion && { filter: ['match', ['get', 'TOURISM_REGION_NAME'], selectedRegion, true, false] }),
            },
          ],
        },
      },
      {
        id: 'ski_resorts',
        name: 'Ski Resorts',
        category: CATEGORY.TOURISM_SUPPLY_SIDE,
        version: '0.0.1',
        type: 'vector',
        source: {
          url: 'mapbox://totadata.arvkb438',
        },
        images: [{ id: 'ski_resorts_marker', src: SKI_RESORTS_SVG }],
        legendConfig: {
          type: 'basic',
          items: [{ value: 'Ski Resorts', icon: SKI_RESORTS_SVG }],
        },
        render: {
          layers: [
            {
              id: 'ski_resorts',
              'source-layer': 'ski_resorts',
              type: 'symbol',
              layout: {
                'icon-image': 'ski_resorts_marker',
                'icon-size': 1,
                'icon-anchor': 'bottom',
                'icon-allow-overlap': MARKER_ALLOW_OVERLAP,
              },
              ...(selectedRegion && { filter: ['match', ['get', 'TOURISM_REGION_NAME'], selectedRegion, true, false] }),
            },
          ],
        },
      },
      {
        id: 'accommodations',
        name: 'Accommodation Listing',
        category: CATEGORY.TOURISM_SUPPLY_SIDE,
        type: 'vector',
        source: {
          url: 'mapbox://totadata.4y0iosdv',
        },
        images: [{ id: 'accommodations_marker', src: ACCOMMODATIONS_SVG }],
        legendConfig: {
          type: 'basic',
          items: [{ value: 'Accommodation Listing', icon: ACCOMMODATIONS_SVG }],
        },
        render: {
          layers: [
            {
              id: 'accommodations',
              'source-layer': 'accommodations',
              type: 'symbol',
              layout: {
                'icon-image': 'accommodations_marker',
                'icon-size': 1,
                'icon-anchor': 'bottom',
                'icon-allow-overlap': MARKER_ALLOW_OVERLAP,
              },
              ...(selectedRegion && { filter: ['match', ['get', 'TOURISM_REGION_NAME'], selectedRegion, true, false] }),
            },
          ],
        },
      },
      {
        id: 'campgrounds',
        name: 'Campsites',
        category: CATEGORY.TOURISM_SUPPLY_SIDE,
        version: '0.0.1',
        type: 'vector',
        source: {
          url: 'mapbox://totadata.3521qubk',
        },
        images: [{ id: 'campsites_marker', src: CAMPSITES_SVG }],
        legendConfig: {
          type: 'basic',
          items: [{ value: 'Campsites', icon: CAMPSITES_SVG }],
        },
        render: {
          layers: [
            {
              id: 'campgrounds',
              'source-layer': 'campgrounds',
              type: 'symbol',
              layout: {
                'icon-image': 'campsites_marker',
                'icon-size': 1,
                'icon-anchor': 'bottom',
                'icon-allow-overlap': MARKER_ALLOW_OVERLAP,
              },
              ...(selectedRegion && { filter: ['match', ['get', 'TOURISM_REGION_NAME'], selectedRegion, true, false] }),
            },
          ],
        },
      },
      {
        id: 'first_nations_communities',
        name: 'First Nation Communities',
        category: CATEGORY.TOURISM_SUPPLY_SIDE,
        type: 'vector',
        source: {
          url: 'mapbox://totadata.7q627o47',
        },
        images: [{ id: 'first_nation_community_marker', src: FIRST_NATION_COMMUNITY_SVG }],
        legendConfig: {
          type: 'basic',
          items: [{ value: 'First Nation Communities', icon: FIRST_NATION_COMMUNITY_SVG }],
        },
        render: {
          layers: [
            {
              id: 'first_nations_communities',
              'source-layer': 'first_nations_communities',
              type: 'symbol',
              layout: {
                'icon-image': 'first_nation_community_marker',
                'icon-size': 1,
                'icon-anchor': 'bottom',
                'icon-allow-overlap': MARKER_ALLOW_OVERLAP,
              },
              ...(selectedRegion && { filter: ['match', ['get', 'TOURISM_REGION_NAME'], selectedRegion, true, false] }),
            },
          ],
        },
      },
      {
        id: 'first_nations_business',
        name: 'Indigenous Businesses',
        category: CATEGORY.TOURISM_SUPPLY_SIDE,
        type: 'vector',
        source: {
          url: 'mapbox://totadata.3pqlvqwr',
        },
        images: [{ id: 'indigenous_businesses_marker', src: BC_INDIGENOUS_BUSINESSES_SVG }],
        legendConfig: {
          type: 'basic',
          items: [{ value: 'Indigenous Businesses', icon: BC_INDIGENOUS_BUSINESSES_SVG }],
        },
        render: {
          layers: [
            {
              id: 'first_nations_business',
              'source-layer': 'first_nations_business',
              type: 'symbol',
              layout: {
                'icon-image': 'indigenous_businesses_marker',
                'icon-size': 1,
                'icon-anchor': 'bottom',
                'icon-allow-overlap': MARKER_ALLOW_OVERLAP,
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
        legendConfig: {
          type: 'basic',
          items: [{ value: 'Wildlife Habitats', color: '#aab7ef' }],
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
              id: 'wildlife_habitats',
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
                  sql: `
                    SELECT cartodb_id, the_geom, acq_date, acq_time,
                      acq_date:: text as date_str, acq_time:: text as time_str, frp, latitude, longitude, the_geom_webmercator,
                      CASE
                        WHEN acq_date >= (CURRENT_DATE - interval '7 day') AND acq_date < (CURRENT_DATE - interval '6 day') THEN 7
                        WHEN acq_date >= (CURRENT_DATE - interval '6 day') AND acq_date < (CURRENT_DATE - interval '5 day') THEN 6
                        WHEN acq_date >= (CURRENT_DATE - interval '5 day') AND acq_date < (CURRENT_DATE - interval '4 day') THEN 5
                        WHEN acq_date >= (CURRENT_DATE - interval '4 day') AND acq_date < (CURRENT_DATE - interval '3 day') THEN 4
                        WHEN acq_date >= (CURRENT_DATE - interval '3 day') AND acq_date < (CURRENT_DATE - interval '2 day') THEN 3
                        WHEN acq_date >= (CURRENT_DATE - interval '2 day') AND acq_date < (CURRENT_DATE - interval '1 day') THEN 2
                        WHEN acq_date >= (CURRENT_DATE - interval '1 day') THEN 1
                        ELSE - 1
                      END AS days_ago
                    FROM suomi_viirs_c2_global_7d
                    WHERE
                      acq_date > (CURRENT_DATE - interval '7 day')
                      AND ST_CONTAINS(
                        ST_GeomFromGeoJSON('${JSON.stringify(BC_FIRES_POLYGON_GEOJSON)}'),
                        the_geom
                      )
                    ORDER BY acq_date asc, frp asc`,
                  cartocss: `#layer {}`, // not sure why this is needed as colors are set below, I removed all of existing styles - check git blame for this line
                  cartocss_version: '2.3.0',
                },
              },
            ],
          },
        },
        images: [
          { id: 'fires_marker_1', src: FIRES_1_SVG },
          { id: 'fires_marker_2', src: FIRES_2_SVG },
          { id: 'fires_marker_3', src: FIRES_3_SVG },
          { id: 'fires_marker_4', src: FIRES_4_SVG },
          { id: 'fires_marker_5', src: FIRES_5_SVG },
          { id: 'fires_marker_6', src: FIRES_6_SVG },
          { id: 'fires_marker_7', src: FIRES_7_SVG },
        ],
        render: {
          layers: [
            {
              id: 'fires',
              'source-layer': 'layer0',
              type: 'symbol',
              layout: {
                'icon-image': [
                  'step',
                  ['to-number', ['get', 'days_ago']],
                  'fires_marker_1',
                  2,
                  'fires_marker_2',
                  3,
                  'fires_marker_3',
                  4,
                  'fires_marker_4',
                  5,
                  'fires_marker_5',
                  6,
                  'fires_marker_6',
                  7,
                  'fires_marker_7',
                ],
                'icon-size': 1,
                'icon-anchor': 'bottom',
                'icon-allow-overlap': MARKER_ALLOW_OVERLAP,
              },
              filter: ['all'],
            },
          ],
        },
        legendConfig: {
          type: 'choropleth',
          source: {
            text: 'Resource Watch',
            link: 'https://resourcewatch.org/data/explore/for006nrt-Active-Fires-VIIRS_old_replacement?section=Discover&selectedCollection=&zoom=3&lat=0&lng=0&pitch=0&bearing=0&basemap=dark&labels=light&layers=%255B%257B%2522dataset%2522%253A%252264c948a6-5e34-4ef2-bb69-6a6535967bd5%2522%252C%2522opacity%2522%253A1%252C%2522layer%2522%253A%25222d7882f4-0e42-429c-9951-b29ccc16409e%2522%257D%255D&aoi=&page=1&sort=most-viewed&sortDirection=-1',
          },
          items: [
            {
              value: '7 days ago',
              color: FIRE_COLORS.days7,
              id: 0,
            },
            {
              value: '6 days ago',
              color: FIRE_COLORS.days6,
              id: 1,
            },
            {
              value: '5 days ago',
              color: FIRE_COLORS.days5,
              id: 2,
            },
            {
              value: '4 days ago',
              color: FIRE_COLORS.days4,
              id: 3,
            },
            {
              value: '3 days ago',
              color: FIRE_COLORS.days3,
              id: 4,
            },
            {
              value: '2 days ago',
              color: FIRE_COLORS.days2,
              id: 5,
            },
            {
              value: '1 day ago',
              color: FIRE_COLORS.days1,
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
        images: [{ id: 'stops_of_interest_marker', src: STOPS_OF_INTEREST_SVG }],
        legendConfig: {
          type: 'basic',
          items: [{ value: 'Stops of Interest', icon: STOPS_OF_INTEREST_SVG }],
        },
        render: {
          layers: [
            {
              id: 'stops',
              'source-layer': 'stops',
              type: 'symbol',
              layout: {
                'icon-image': 'stops_of_interest_marker',
                'icon-size': 1,
                'icon-anchor': 'bottom',
                'icon-allow-overlap': MARKER_ALLOW_OVERLAP,
              },
              ...(selectedRegion && { filter: ['match', ['get', 'TOURISM_REGION_NAME'], selectedRegion, true, false] }),
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
        images: [{ id: 'airports_marker', src: AIRPORTS_SVG }],
        legendConfig: {
          type: 'basic',
          items: [{ value: 'Airports', icon: AIRPORTS_SVG }],
        },
        render: {
          layers: [
            {
              id: 'airports',
              'source-layer': 'airports',
              type: 'symbol',
              layout: {
                'icon-image': 'airports_marker',
                'icon-size': 1,
                'icon-anchor': 'bottom',
                'icon-allow-overlap': MARKER_ALLOW_OVERLAP,
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
        legendConfig: {
          type: 'basic',
          items: [{ value: 'Trails', color: '#000' }],
        },
        render: {
          layers: [
            {
              id: 'trails',
              'source-layer': 'trails',
              type: 'line',
              paint: {
                'line-color': '#000000',
                'line-width': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  // zoom is 6 (or less) -> line width will be 1px
                  6,
                  1,
                  // zoom is 10 (or greater) -> line width will be 3px
                  10,
                  3,
                ],
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
                  TRAFFIC_COLORS.low,
                  ['==', 'moderate', ['get', 'congestion']],
                  TRAFFIC_COLORS.moderate,
                  ['==', 'heavy', ['get', 'congestion']],
                  TRAFFIC_COLORS.heavy,
                  ['==', 'severe', ['get', 'congestion']],
                  TRAFFIC_COLORS.severe,
                  '#000000',
                ],
              },
            },
          ],
        },
        legendConfig: {
          type: 'choropleth',
          description:
            'Current traffic volumes. You can also check road conditions and recent events at <a href="https://www.drivebc.ca" rel="noreferrer noopener" target="_blank">Drive BC</a>.',
          source: {
            text: 'Mapbox Traffic v1',
            link: 'https://docs.mapbox.com/data/tilesets/reference/mapbox-traffic-v1/#overview',
          },
          items: [
            {
              value: 'low',
              color: TRAFFIC_COLORS.low,
              id: 0,
            },
            {
              value: 'moderate',
              color: TRAFFIC_COLORS.moderate,
              id: 1,
            },
            {
              value: 'heavy',
              color: TRAFFIC_COLORS.heavy,
              id: 2,
            },
            {
              value: 'severe',
              color: TRAFFIC_COLORS.severe,
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
