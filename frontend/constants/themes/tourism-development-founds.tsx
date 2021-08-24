import uniq from 'lodash/uniq';
import zip from 'lodash/zip';
import flatten from 'lodash/flatten';

import DevelopmentFundsTooltip from 'components/widgets/map/tooltips/development-funds';
import type { ThemeType, IndicatorValue } from 'types';
import { getAvailableYearsOptions, getYear } from 'utils/charts';
import { COLORS } from 'constants/charts';

import mountains2Image from 'images/home/image-mountains2.png';

// TODO: That will be removed when I clean up mess with regions and connect with API
const regionsMap = {
  thompson_okanagan: 'Thompson Okanagan',
  british_columbia: 'British Columbia',
  cariboo_chilcotin_coast: 'Cariboo Chilcotin Coast',
  northern_british_columbia: 'Northern BC',
  vancouver_island: 'Vancouver Island',
  kootenay_rockies: 'Kootenay Rockies',
};

const getDevelopmentFundsLayer = (fundSources, selectedRegion, selectedYear) => {
  if (!fundSources) return null;
  if (!fundSources.length) return null;

  const params = new URLSearchParams();

  if (selectedRegion) params.append('filter[regions.slug]', selectedRegion);
  if (selectedYear) params.append('filter[funding_call_year]', selectedYear);
  const searchParams = Array.from(params).length > 0 ? `?${params.toString()}` : '';
  const developmentFundsGeoJSONUrl = `${process.env.NEXT_PUBLIC_TOTA_API}/development_funds.geojson${searchParams}`;

  const fundColors = flatten(zip(fundSources, COLORS).filter((s) => s[0]));

  return {
    id: 'development-funds',
    name: 'Development Funds',
    type: 'geojson',
    images: [{ id: 'marker', src: '/images/map/marker.svg', options: { sdf: true } }],
    source: {
      type: 'geojson',
      data: developmentFundsGeoJSONUrl,
    },
    render: {
      metadata: {
        position: 'top',
      },
      layers: [
        {
          type: 'symbol',
          paint: {
            'icon-color': [
              'match',
              ['get', 'key_funding_source'],
              ...fundColors,
              '#000', //other
            ],
          },
          layout: {
            'icon-image': 'marker',
            'icon-size': 1,
          },
          // It will put the layer on the top
          metadata: {
            position: 'top',
          },
        },
      ],
    },
  };
};

const theme: ThemeType = {
  title: 'Tourism Development Funds',
  slug: 'tourism-development-funds',
  image: mountains2Image,
  sections: [
    {
      title: 'Volume and projects by region',
      description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
      initialState: {
        year: '2020',
      },
      fetchParams: (state: any) => ({
        slug: ['development_funds_by_source', 'development_funds_volume_by_source'],
        region: [state.selectedRegion.name, ...state.selectedRegion.children?.map((x) => x.name)].filter((x) => x),
      }),
      widget: {
        type: 'map',
        fetchProps(rawData: IndicatorValue[] = [], state: any): any {
          const filteredByYear = rawData.filter((x: any) => getYear(x.date) === state.year);
          const fundSources = uniq(rawData.map((x) => x.category_1)).filter((x) => x);
          const selectedRegion =
            state.selectedRegion.name === 'British Columbia'
              ? null
              : Object.keys(regionsMap).find((key) => regionsMap[key] === state.selectedRegion.name);

          return {
            data: filteredByYear,
            controls: [
              { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, false) },
            ],
            selectedRegion,
            extraLayers: [getDevelopmentFundsLayer(fundSources, selectedRegion, state.year)].filter((x) => x),
            featureTooltip: function FeatureTooltip(feature: any) {
              const regionName = regionsMap[feature.properties.TOURISM_REGION_NAME];
              if (!regionName) return null;
              const regionData = filteredByYear.filter((x) => x.region === regionName);
              const volumes = regionData.filter((x) => x.indicator === 'development_funds_volume_by_source');
              const counts = regionData.filter((x) => x.indicator === 'development_funds_by_source');
              const funds = fundSources.map((source, index) => ({
                name: source,
                color: COLORS[index],
                count: counts.find((x) => x.category_1 === source)?.value || 0,
                volume: volumes.find((x) => x.category_1 === source)?.value || 0,
              }));

              return <DevelopmentFundsTooltip year={state.year} regionName={regionName} funds={funds} />;
            },
          };
        },
      },
    },
  ],
};

export default theme;
