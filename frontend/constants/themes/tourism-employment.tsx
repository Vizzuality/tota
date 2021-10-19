import uniq from 'lodash/uniq';
import startCase from 'lodash/startCase';
import groupBy from 'lodash/groupBy';
import meanBy from 'lodash/meanBy';
import { IndicatorValue, Region, ThemeType } from 'types';

import forestImage from 'images/home/image-forest.png';

import {
  expandToFullYear,
  filterBySelectedYear,
  getAvailableYearsOptions,
  getWithMinMaxAreas,
  getColorsByRegionName,
  getOptions,
  getStackedBarsData,
  mergeForChart,
} from 'utils/charts';
import { shortMonthName, previousYear } from './utils';
import { defaultTooltip, bottomLegend } from 'constants/charts';
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
          includeTourismRegionLabels: false,
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
        let areas = [];
        if (state.year !== 'all_years') {
          chartData = expandToFullYear(chartData);
          [chartData, areas] = getWithMinMaxAreas(chartData, rawData, 'region', colorsByRegionName);
        }

        return {
          type: 'charts/composed',
          data: chartData,
          controls: [{ type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, true) }],
          lines: regions.map((x) => ({ dataKey: x, color: colorsByRegionName[x] })),
          areas,
          xAxis: {
            dataKey: 'date',
            tickFormatter: state.year !== 'all_years' && shortMonthName,
          },
          legend: {
            ...bottomLegend,
            payloadFilter: (y) => !y.value.includes('min-max'),
          },
          tooltip: {
            ...defaultTooltip,
            payloadFilter: (y) => !y.name.includes('min-max'),
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
        const colors = {
          Cariboo: '#BB9075',
          Kootenay: '#405E62',
          'Thompson-Okanagan': '#76ACA9',
          'Vancouver Island and Coast': '#4F91CD',
          'British Columbia': '#314057',
        };
        let areas = [];
        if (state.year !== 'all_years') chartData = expandToFullYear(chartData);
        if (state.year !== 'all_years' && state.selectedRegion.parent) {
          [chartData, areas] = getWithMinMaxAreas(chartData, rawData, 'category_2', colors);
        }

        return {
          type: 'charts/composed',
          data: chartData,
          controls: [{ type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, true) }],
          lines: regions.map((x) => ({ dataKey: x, color: colors[x] })),
          areas,
          xAxis: {
            dataKey: 'date',
            tickFormatter: state.year !== 'all_years' && shortMonthName,
          },
          yAxis: {
            tickFormatter: (val) => `${val}%`,
          },
          legend: {
            ...bottomLegend,
            payloadFilter: (y) => !y.value.includes('min-max'),
          },
          tooltip: {
            ...defaultTooltip,
            valueFormatter: (value) => `${value.toFixed(2)}%`,
            payloadFilter: (y) => !y.name.includes('min-max'),
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
        let areas = [];
        if (state.year !== 'all_years') chartData = expandToFullYear(chartData);
        if (state.year !== 'all_years' && state.selectedRegion.parent) {
          [chartData, areas] = getWithMinMaxAreas(chartData, rawData, 'region', colorsByRegionName);
        }

        return {
          type: 'charts/composed',
          data: chartData,
          controls: [{ type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, true) }],
          lines: regions.map((x) => ({ dataKey: x, color: colorsByRegionName[x] })),
          areas,
          xAxis: {
            dataKey: 'date',
            tickFormatter: state.year !== 'all_years' && shortMonthName,
          },
          legend: {
            ...bottomLegend,
            payloadFilter: (y) => !y.value.includes('min-max'),
          },
          tooltip: {
            ...defaultTooltip,
            payloadFilter: (y) => !y.name.includes('min-max'),
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
        const includeChildren = state.frequency === 'annually';

        return {
          slug: `tourism_to_total_employment_percentage_${state.frequency}`,
          region: [
            state.selectedRegion.name,
            ...(includeChildren ? state.selectedRegion.children?.map((x) => x.name) : []),
          ].filter((x) => x),
        };
      },
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const filtered = filterBySelectedYear(rawData, state.year);
        const controls = [
          { type: 'tabs', side: 'left', name: 'frequency', options: getOptions(['Annually', 'Monthly']) },
          { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, true) },
        ];
        if (state.frequency === 'annually') {
          const grouped = Object.values(groupBy(filtered, 'region')).map((grouped) => ({
            region: grouped[0].region,
            value: Number(meanBy(grouped, 'value').toFixed(2)),
          }));

          return {
            type: 'rank',
            data: grouped.map((x) => ({
              text: `${x.region} - {value}`,
              value: `${x.value}%`,
            })),
            hideNumber: true,
            controls,
          };
        }
        const chartData = mergeForChart({ data: filtered, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });
        const regions = uniq(rawData.map((x) => x.region));
        const colorsByRegionName = getColorsByRegionName(rawData);

        return {
          type: 'charts/bar',
          data: chartData,
          controls,
          bars: regions.map((x) => ({ dataKey: x, color: colorsByRegionName[x] })),
          xAxis: {
            dataKey: 'date',
            tickFormatter: state.year !== 'all_years' && shortMonthName,
          },
          yAxis: {
            tickFormatter: (val) => `${val}%`,
          },
          tooltip: {
            cursor: false,
            valueFormatter: (value) => `${value.toFixed(2)}%`,
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
        let chartData = mergeForChart({ data: filtered, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });
        const regions = uniq(rawData.map((x) => x.region));
        let areas = [];
        const colorsByRegionName = getColorsByRegionName(filtered);
        if (state.year !== 'all_years' && state.selectedRegion.parent) {
          chartData = expandToFullYear(chartData);
          [chartData, areas] = getWithMinMaxAreas(chartData, rawData, 'region', colorsByRegionName);
        }

        return {
          type: 'charts/composed',
          data: chartData,
          controls: [{ type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, true) }],
          lines: regions.map((x) => ({ dataKey: x, color: colorsByRegionName[x] })),
          areas,
          xAxis: {
            dataKey: 'date',
            tickFormatter: state.year !== 'all_years' && shortMonthName,
          },
          yAxis: {
            tickFormatter: (value) => `${value}$/h`,
            domain: [(dataMin) => Math.round(dataMin - 2), (dataMax) => Math.round(dataMax) + 2],
          },
          legend: {
            ...bottomLegend,
            payloadFilter: (y) => !y.value.includes('min-max'),
          },
          tooltip: {
            ...defaultTooltip,
            valueFormatter: (value) => `${value} CAD/h`,
            payloadFilter: (y) => !y.name.includes('min-max'),
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
        return true; //only for parent regions like british columbia
      },
      fetchParams: (state: any) => {
        return {
          slug: 'tourism_employment_by_job_status',
          region: state.selectedRegion.name,
          category_1: 'Tourism',
        };
      },
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const filtered = filterBySelectedYear(rawData, state.year).map((x) => ({
          ...x,
          category_2: startCase(x.category_2),
        }));
        let chartData = mergeForChart({ data: filtered, mergeBy: 'date', labelKey: 'category_2', valueKey: 'value' });
        if (state.year !== 'all_years') chartData = expandToFullYear(chartData);

        return {
          type: 'charts/bar',
          data: chartData,
          controls: [{ type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData) }],
          bars: getStackedBarsData(chartData, 'date'),
          xAxis: {
            dataKey: 'date',
            tickFormatter: state.year !== 'all_years' && shortMonthName,
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
