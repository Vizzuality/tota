import uniq from 'lodash/uniq';
import zip from 'lodash/zip';
import flatten from 'lodash/flatten';

import DevelopmentFundsTooltip from 'components/widgets/map/tooltips/development-funds';

import type { ThemeType, IndicatorValue, WidgetWrapperProps } from 'types';

import { filterBySelectedYear, getAvailableYearsOptions, getYear, mergeForChart } from 'utils/charts';
import { getMapUrl } from 'hooks/map';
import { moneyTickFormatter } from './utils';

import mountains2Image from 'images/home/image-mountains2.png';

import { COLORS } from 'constants/charts';

const getDevelopmentFundsLayer = (fundSources, selectedRegion, selectedYear) => {
  if (!fundSources) return null;
  if (!fundSources.length) return null;

  const params = new URLSearchParams();

  if (selectedRegion) params.append('filter[regions.slug]', selectedRegion);
  if (selectedYear && selectedYear !== 'all_years') params.append('filter[funding_call_year]', selectedYear);
  const searchParams = Array.from(params).length > 0 ? `?${params.toString()}` : '';
  const developmentFundsGeoJSONUrl = `${process.env.NEXT_PUBLIC_TOTA_API}/development_funds.geojson${searchParams}`;

  const fundColors = flatten(zip(fundSources, COLORS).filter((s) => s[0]));

  return {
    id: 'development_funds',
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
      title: 'Total volume and projects awarded',
      description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
      initialState: {
        year: 'all_years',
      },
      fetchParams: (state: any) => ({
        slug: ['development_funds_by_source', 'development_funds_volume_by_source'],
        region: [state.selectedRegion.slug].filter((x) => x),
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const filtered = filterBySelectedYear(rawData, state.year, true).filter(
          (x) => x.indicator === 'development_funds_volume_by_source',
        );
        const filteredCount = filterBySelectedYear(rawData, state.year, true).filter(
          (x) => x.indicator === 'development_funds_by_source',
        );
        const chartData = mergeForChart({
          data: filtered,
          mergeBy: 'category_1',
          labelKey: 'category_1',
          valueKey: 'value',
        });
        const sources = uniq(rawData.map((x) => x.category_1)).filter((x) => x);

        return {
          type: 'charts/bar',
          data: chartData,
          controls: [{ type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData) }],
          bars: sources.map((x) => ({ dataKey: x, stackId: 1 })),
          chartProps: {
            margin: {
              left: 70,
            },
          },
          xAxis: {
            dataKey: 'category_1',
          },
          yAxis: {
            tickFormatter: moneyTickFormatter,
          },
          tooltip: {
            cursor: false,
            valueFormatter: moneyTickFormatter,
          },
          widgetWrapper: function WidgetWrapper({ children: widget }: WidgetWrapperProps) {
            return (
              <>
                <div className="w-1/2">{widget}</div>
                <div className="w-1/2 p-20 -mt-20 flex justify-center items-center">
                  <div className="flex flex-col justify-center items-center ">
                    <div className="font-bold text-lg text-blue-800">Projects</div>
                    <div className="font-bold text-lg text-white flex gap-3 mt-5">
                      {sources.map((source, index) => (
                        <div key={source} className="w-28 p-4 text-center" style={{ backgroundColor: COLORS[index] }}>
                          {filteredCount.find((x) => x.category_1 === source)?.value || 0}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            );
          },
        };
      },
    },
    {
      title: 'Volume and projects by region',
      description: `
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
      initialState: {
        year: 'all_years',
      },
      fetchParams: (state: any) => ({
        slug: ['development_funds_by_source', 'development_funds_volume_by_source'],
        region: [state.selectedRegion.slug, ...state.selectedRegion.children?.map((x) => x.slug)].filter((x) => x),
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const filteredByYear = filterBySelectedYear(rawData, state.year, true);
        const fundSources = uniq(rawData.map((x) => x.category_1)).filter((x) => x);
        const selectedRegion = state.selectedRegion.slug === 'british_columbia' ? null : state.selectedRegion.slug;
        const allYears = uniq(rawData.filter((x) => x.date).map((x) => parseInt(getYear(x.date), 10)));
        const tooltipYears =
          state.year === 'all_years'
            ? [Math.min(...allYears).toString(), Math.max(...allYears).toString()]
            : [state.year];

        return {
          viewOnMap: {
            title: 'View Projects on Map',
            link: getMapUrl(state.selectedRegion.slug, ['tourism_regions', 'development_funds']),
          },
          type: 'map',
          data: filteredByYear,
          controls: [{ type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData) }],
          selectedRegion,
          extraLayers: [getDevelopmentFundsLayer(fundSources, selectedRegion, state.year)].filter((x) => x),
          featureTooltip: function FeatureTooltip(feature: any, regions) {
            const region = regions.find((r) => r.slug === feature.properties.TOURISM_REGION_NAME);
            if (!region) return null;
            const regionData = filteredByYear.filter((x) => x.region_slug === region.slug);
            const volumes = regionData.filter((x) => x.indicator === 'development_funds_volume_by_source');
            const counts = regionData.filter((x) => x.indicator === 'development_funds_by_source');
            const funds = fundSources.map((source, index) => ({
              name: source,
              color: COLORS[index],
              count: counts.find((x) => x.category_1 === source)?.value || 0,
              volume: volumes.find((x) => x.category_1 === source)?.value || 0,
            }));

            return <DevelopmentFundsTooltip years={tooltipYears} regionName={region.name} funds={funds} />;
          },
        };
      },
    },
  ],
};

export default theme;
