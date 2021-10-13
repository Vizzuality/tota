import uniq from 'lodash/uniq';
import { IndicatorValue, Region, ThemeType } from 'types';
import { format, parseISO } from 'date-fns';

import forestImage from 'images/home/image-forest.png';

import {
  expandToFullYear,
  filterBySelectedYear,
  getAvailableYearsOptions,
  getColorsByRegionName,
  getOptions,
  getStackedBarsData,
  mergeForChart,
} from 'utils/charts';
import { shortMonthName, compactNumberTickFormatter, thisYear, previousYear, formatPercentage } from './utils';
import { defaultTooltip } from 'constants/charts';
import { REGION_COLORS } from 'constants/regions';
import { getMapUrl } from 'hooks/map';
import { getEconomicRegionsLayer } from 'hooks/layers';

const theme: ThemeType = {
  title: 'Tourism Employment',
  slug: 'tourism-employment',
  image: forestImage,
  sections: [
    {
      title: 'Economic region vs Tourism region',
      description: `
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
      fetchParams: () => false,
      fetchWidgetProps(_rawData: IndicatorValue[] = [], state: any): any {
        const selectedRegion = state.selectedRegion.slug === 'british_columbia' ? null : state.selectedRegion.slug;

        return {
          viewOnMap: {
            title: 'View Region on Map',
            link: getMapUrl(selectedRegion, ['tourism_regions', 'economic_regions']),
          },
          type: 'map',
          data: {},
          selectedRegion,
          disableHighlight: true,
          extraLayers: [getEconomicRegionsLayer(selectedRegion)].filter((x) => x),
          prependExtraLayers: true,
        };
      },
    },
    {
      title: 'Total employment',
      description: `To be defined.`,
      initialState: {
        year: 'all_years',
      },
      fetchParams: (state: any) => {
        const anySubRegions = state.selectedRegion.children && state.selectedRegion.children.length > 0;
        const region = anySubRegions
          ? state.selectedRegion.children.map((x) => x.name)
          : [state.selectedRegion.name, state.selectedRegion.parent?.name].filter((x) => x);

        return {
          slug: 'total_employment_by_tourism_region_monthly',
          region,
        };
      },
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const filtered = filterBySelectedYear(rawData, state.year);
        let chartData = mergeForChart({ data: filtered, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });
        const regions = uniq(rawData.map((x) => x.region));
        const colorsByRegionName = getColorsByRegionName(rawData);
        if (state.year !== 'all_years') chartData = expandToFullYear(chartData);

        return {
          type: 'charts/line',
          data: chartData,
          controls: [{ type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, true) }],
          lines: regions.map((x) => ({ dataKey: x, color: colorsByRegionName[x] })),
          xAxis: {
            dataKey: 'date',
            tickFormatter: state.year !== 'all_years' && shortMonthName,
          },
        };
      },
    },
    {
      title: 'Unemployment rate',
      description: `To be defined.`,
      initialState: {
        year: 'all_years',
      },
      fetchParams: (state: any) => {
        const anySubRegions = state.selectedRegion.children && state.selectedRegion.children.length > 0;
        const region = anySubRegions
          ? state.selectedRegion.children.map((x) => x.name)
          : [state.selectedRegion.name, state.selectedRegion.parent?.name].filter((x) => x);

        return {
          slug: 'total_unemployment_rate_by_economic_region',
          region,
        };
      },
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const filtered = filterBySelectedYear(rawData, state.year);
        let chartData = mergeForChart({ data: filtered, mergeBy: 'date', labelKey: 'category_2', valueKey: 'value' });
        const regions = uniq(rawData.map((x) => x.category_2));
        if (state.year !== 'all_years') chartData = expandToFullYear(chartData);

        return {
          type: 'charts/line',
          data: chartData,
          controls: [{ type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, true) }],
          lines: regions.map((x) => ({ dataKey: x })),
          xAxis: {
            dataKey: 'date',
            tickFormatter: state.year !== 'all_years' && shortMonthName,
          },
        };
      },
    },
    {
      title: 'Total tourism employment',
      description: `To be defined.`,
      initialState: {
        year: 'all_years',
      },
      fetchParams: (state: any) => {
        const anySubRegions = state.selectedRegion.children && state.selectedRegion.children.length > 0;
        const region = anySubRegions
          ? state.selectedRegion.children.map((x) => x.name)
          : [state.selectedRegion.name, state.selectedRegion.parent?.name].filter((x) => x);

        return {
          slug: 'tourism_employment_by_tourism_region_monthly',
          region,
        };
      },
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const filtered = filterBySelectedYear(rawData, state.year);
        let chartData = mergeForChart({ data: filtered, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });
        const regions = uniq(rawData.map((x) => x.region));
        const colorsByRegionName = getColorsByRegionName(rawData);
        if (state.year !== 'all_years') chartData = expandToFullYear(chartData);

        return {
          type: 'charts/line',
          data: chartData,
          controls: [{ type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, true) }],
          lines: regions.map((x) => ({ dataKey: x, color: colorsByRegionName[x] })),
          xAxis: {
            dataKey: 'date',
            tickFormatter: state.year !== 'all_years' && shortMonthName,
          },
        };
      },
    },
    {
      title: 'Percentage of tourism employment to total employment',
      description: `To be defined.`,
      initialState: {
        frequency: 'annually',
        year: previousYear,
      },
      fetchParams: (state: any) => {
        const anySubRegions = state.selectedRegion.children && state.selectedRegion.children.length > 0;
        const region = anySubRegions
          ? state.selectedRegion.children.map((x) => x.name)
          : [state.selectedRegion.name, state.selectedRegion.parent?.name].filter((x) => x);

        return {
          slug: `tourism_to_total_employment_percentage_${state.frequency}`,
          region,
        };
      },
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const filtered = filterBySelectedYear(rawData, state.year);
        if (state.frequency === 'annually') {
          return {
            type: 'rank',
            controls: [
              { type: 'tabs', side: 'left', name: 'frequency', options: getOptions(['Annually', 'Monthly']) },
              { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, true) },
            ],
          };
        }
        const chartData = mergeForChart({ data: filtered, mergeBy: 'date', labelKey: 'category_2', valueKey: 'value' });
        const regions = uniq(rawData.map((x) => x.category_2));

        return {
          type: 'charts/bar',
          data: chartData,
          controls: [
            { type: 'tabs', side: 'left', name: 'frequency', options: getOptions(['Annually', 'Monthly']) },
            { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, true) },
          ],
          lines: regions.map((x) => ({ dataKey: x })),
          xAxis: {
            dataKey: 'date',
            tickFormatter: state.year !== 'all_years' && shortMonthName,
          },
        };
      },
    },
    {
      title: 'Tourism employment by subsector',
      description: `To be defined`,
      initialState: {
        year: previousYear,
      },
      fetchParams: (state: any) => ({
        slug: 'tourism_employment_by_sector_by_economic_region',
        region: [state.selectedRegion.name, ...state.selectedRegion.children?.map((x) => x.name)].filter((x) => x),
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const filtered = filterBySelectedYear(rawData, state.year);
        let chartData = mergeForChart({ data: filtered, mergeBy: 'date', labelKey: 'category_1', valueKey: 'value' });
        if (state.year !== 'all_years') chartData = expandToFullYear(chartData);

        return {
          type: 'charts/bar',
          data: chartData,
          controls: [{ type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData) }],
          bars: getStackedBarsData(chartData, 'date'),
          chartProps: {
            stackOffset: 'expand',
          },
          xAxis: {
            dataKey: 'date',
            tickFormatter: state.year !== 'all_years' && shortMonthName,
          },
          yAxis: {
            tickFormatter: (val) => `${val * 100}%`,
          },
          tooltip: {
            cursor: false,
            valueFormatter: (value) => `${value.toFixed(2)}%`,
          },
        };
      },
    },
    {
      title: 'Average tourism related wages',
      description: `To be defined.`,
      initialState: {
        year: 'all_years',
      },
      fetchParams: (state: any) => {
        return {
          slug: 'tourism_employment_hourly_earnings_by_economic_region',
          region: [
            state.selectedRegion.name,
            state.selectedRegion.parent?.name,
            ...state.selectedRegion.children.map((x) => x.name),
          ].filter((x) => x),
        };
      },
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const filtered = filterBySelectedYear(rawData, state.year);
        let chartData = mergeForChart({ data: filtered, mergeBy: 'date', labelKey: 'category_2', valueKey: 'value' });
        const regions = uniq(rawData.map((x) => x.category_2));
        if (state.year !== 'all_years') chartData = expandToFullYear(chartData);

        return {
          type: 'charts/line',
          data: chartData,
          controls: [{ type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, true) }],
          lines: regions.map((x) => ({ dataKey: x })),
          xAxis: {
            dataKey: 'date',
            tickFormatter: state.year !== 'all_years' && shortMonthName,
          },
        };
      },
    },
    {
      title: 'Employment by job status',
      description: `To be defined.`,
      initialState: {
        year: 'all_years',
      },
      display: (selectedRegion: Region) => {
        if (selectedRegion.parent) return false;
        return true;
      },
      fetchParams: (state: any) => {
        return {
          slug: 'tourism_employment_by_job_status',
          region: state.selectedRegion.name,
        };
      },
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const filtered = filterBySelectedYear(rawData, state.year);
        let chartData = mergeForChart({ data: filtered, mergeBy: 'date', labelKey: 'category_2', valueKey: 'value' });
        if (state.year !== 'all_years') chartData = expandToFullYear(chartData);

        return {
          type: 'charts/bar',
          data: chartData,
          controls: [{ type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData) }],
          bars: getStackedBarsData(chartData, 'date'),
          xAxis: {
            dataKey: 'date',
          },
          tooltip: {
            cursor: false,
          },
        };
      },
    },
  ],
};

export default theme;
