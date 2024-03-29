import uniq from 'lodash/uniq';
import startCase from 'lodash/startCase';
import groupBy from 'lodash/groupBy';
import meanBy from 'lodash/meanBy';
import { IndicatorValue, ThemeFrontendDefinition } from 'types';

import BoxImage from 'images/home/box-employment.png';

import {
  expandToFullYear,
  filterBySelectedYear,
  getAvailableYearsOptions,
  getWithMinMaxAreas,
  getColorsByRegionName,
  getOptions,
  getStackedBarsData,
  getUnitLabel,
  mergeForChart,
} from 'utils/charts';
import { compactNumberTickFormatter, shortMonthName, thisYear, previousYear } from './utils';
import { defaultTooltip, bottomLegend } from 'constants/charts';
import { getMapUrl } from 'hooks/map';
import { getEconomicRegionsLayer } from 'hooks/layers';

const theme: ThemeFrontendDefinition = {
  slug: 'tourism_employment',
  image: BoxImage,
  widgets: [
    {
      slug: 'economic_vs_tourism_region',
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
      slug: 'total_employment',
      initialState: {
        year: thisYear,
      },
      fetchParams: (state: any) => {
        const anySubRegions = state.selectedRegion.children && state.selectedRegion.children.length > 0;
        const region = anySubRegions
          ? state.selectedRegion.children.map((x) => x.slug)
          : [state.selectedRegion.slug, state.selectedRegion.parent?.slug].filter((x) => x);

        return {
          slug: 'total_employment_by_economic_region',
          region,
        };
      },
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const filtered = filterBySelectedYear(rawData, state.year);
        const regions = uniq(rawData.map((x) => x.region));
        const colorsByRegionName = getColorsByRegionName(rawData);
        const chartData = mergeForChart({ data: filtered, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });

        const isLineChart = state.year === 'all_years' && state.selectedRegion.slug === 'british_columbia';
        const formatter = (date: string) => (state.year !== 'all_years' ? shortMonthName(date) : date);
        const regionData = regions.map((x) => ({ dataKey: x, color: colorsByRegionName[x] }));
        return {
          type: isLineChart ? 'charts/line' : 'charts/bar',
          data: chartData,
          controls: [{ type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, true) }],
          bars: regionData,
          lines: regionData,
          chartProps: {
            margin: {
              top: 35,
              left: 10,
            },
          },
          xAxis: {
            dataKey: 'date',
            tickFormatter: formatter,
          },
          yAxis: {
            tickFormatter: compactNumberTickFormatter,
            label: getUnitLabel('Nr. of people'),
          },
          legend: {
            ...bottomLegend,
            payloadFilter: (y) => !y.value.includes('min-max'),
          },
          tooltip: {
            ...defaultTooltip,
            cursor: false,
            labelFormatter: formatter,
          },
        };
      },
    },
    {
      slug: 'unemployment_rate',
      initialState: {
        year: thisYear,
      },
      fetchParams: (state: any) => {
        const anySubRegions = state.selectedRegion.children && state.selectedRegion.children.length > 0;
        const region = anySubRegions
          ? state.selectedRegion.children.map((x) => x.slug)
          : [state.selectedRegion.slug, state.selectedRegion.parent?.slug].filter((x) => x);

        return {
          slug: 'total_unemployment_rate_by_economic_region',
          region,
        };
      },
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const filtered = filterBySelectedYear(rawData, state.year);
        const regions = uniq(rawData.map((x) => x.region));
        const colorsByRegionName = getColorsByRegionName(rawData);

        const chartData = mergeForChart({ data: filtered, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });

        const isLineChart = state.year === 'all_years' && state.selectedRegion.slug === 'british_columbia';
        const formatter = (date: string) => (state.year !== 'all_years' ? shortMonthName(date) : date);
        const regionData = regions.map((x) => ({ dataKey: x, color: colorsByRegionName[x] }));
        return {
          type: isLineChart ? 'charts/line' : 'charts/bar',
          data: chartData,
          controls: [{ type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, true) }],
          bars: regionData,
          lines: regionData,
          xAxis: {
            dataKey: 'date',
            tickFormatter: formatter,
          },
          yAxis: {
            tickFormatter: (val) => `${val}%`,
          },
          legend: {
            ...bottomLegend,
          },
          tooltip: {
            ...defaultTooltip,
            cursor: false,
            valueFormatter: (value: number) => `${value.toFixed(2)}%`,
            labelFormatter: formatter,
          },
        };
      },
    },
    {
      slug: 'total_tourism_employment',
      initialState: {
        year: thisYear,
      },
      fetchParams: (state: any) => {
        const anySubRegions = state.selectedRegion.children && state.selectedRegion.children.length > 0;
        const region = anySubRegions
          ? state.selectedRegion.children.map((x) => x.slug)
          : [state.selectedRegion.slug, state.selectedRegion.parent?.slug].filter((x) => x);

        return {
          slug: 'tourism_employment_by_tourism_region_monthly',
          region,
        };
      },
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const filtered = filterBySelectedYear(rawData, state.year);
        const chartData = mergeForChart({ data: filtered, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });
        const regions = uniq(rawData.map((x) => x.region));
        const colorsByRegionName = getColorsByRegionName(rawData);

        const isLineChart = state.year === 'all_years' && state.selectedRegion.slug === 'british_columbia';

        const formatter = (date: string) => (state.year !== 'all_years' ? shortMonthName(date) : date);
        const regionData = regions.map((x) => ({ dataKey: x, color: colorsByRegionName[x] }));
        return {
          type: isLineChart ? 'charts/line' : 'charts/bar',
          data: chartData,
          controls: [{ type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, true) }],
          bars: regionData,
          lines: regionData,
          xAxis: {
            dataKey: 'date',
            tickFormatter: formatter,
          },
          yAxis: {
            tickFormatter: compactNumberTickFormatter,
          },
          legend: {
            ...bottomLegend,
          },
          tooltip: {
            ...defaultTooltip,
            cursor: false,
            labelFormatter: formatter,
          },
        };
      },
    },
    {
      slug: 'tourism_to_total_employment',
      initialState: {
        frequency: 'monthly',
        year: previousYear,
      },
      fetchParams: (state: any) => {
        const includeChildren = state.frequency === 'annually';

        return {
          slug: `tourism_to_total_employment_percentage_${state.frequency}`,
          region: [
            state.selectedRegion.slug,
            ...(includeChildren ? state.selectedRegion.children?.map((x) => x.slug) : []),
          ].filter((x) => x),
        };
      },
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const filtered = filterBySelectedYear(rawData, state.year);
        const controls = [
          { type: 'tabs', side: 'left', name: 'frequency', options: getOptions(['Monthly', 'Annually']) },
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
      slug: 'tourism_employment_by_sector',
      initialState: {
        year: previousYear,
      },
      fetchParams: (state: any) => ({
        slug: 'tourism_employment_by_sector_by_economic_region',
        region: state.selectedRegion.slug,
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
      slug: 'average_tourism_wages',
      initialState: {
        year: thisYear,
      },
      fetchParams: (state: any) => {
        return {
          slug: 'tourism_employment_hourly_earnings_by_economic_region',
          region: [
            state.selectedRegion.slug,
            state.selectedRegion.parent?.slug,
            ...state.selectedRegion.children.map((x) => x.slug),
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
            valueFormatter: (value) => `${value}$/h`,
            payloadFilter: (y) => !y.name.includes('min-max'),
          },
        };
      },
    },
    {
      slug: 'employment_by_job_status',
      initialState: {
        year: thisYear,
        sector: 'Tourism',
      },
      fetchParams: (state: any) => {
        return {
          slug: 'tourism_employment_by_job_status',
          region: state.selectedRegion.slug,
        };
      },
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const sectors = uniq(rawData.map((x) => x.category_1));
        const filtered = filterBySelectedYear(rawData, state.year)
          .filter((x) => x.category_1 === state.sector)
          .map((x) => ({
            ...x,
            category_2: startCase(x.category_2),
          }));
        let chartData = mergeForChart({ data: filtered, mergeBy: 'date', labelKey: 'category_2', valueKey: 'value' });
        if (state.year !== 'all_years') chartData = expandToFullYear(chartData);

        return {
          type: 'charts/bar',
          data: chartData,
          controls: [
            { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData) },
            { type: 'select', side: 'right', name: 'sector', options: getOptions(sectors, false) },
          ],
          bars: getStackedBarsData(chartData, 'date'),
          xAxis: {
            dataKey: 'date',
            tickFormatter: state.year !== 'all_years' && shortMonthName,
          },
          yAxis: {
            tickFormatter: (val) => `${val * 100}%`,
          },
          tooltip: {
            cursor: false,
            valueFormatter: (value) => `${(value * 100).toFixed(0)}%`,
          },
        };
      },
    },
  ],
};

export default theme;
