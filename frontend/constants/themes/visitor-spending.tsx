import uniq from 'lodash/uniq';
import orderBy from 'lodash/orderBy';
import {
  allMonths,
  expandToFullYear,
  filterBySelectedYear,
  getAvailableYearsOptions,
  getColorsByRegionName,
  getOptions,
  getPercentageTotalByLabel,
  getStackedBarsData,
  getTop10AndOthersByYear,
  getTopN,
  getWithMinMaxAreas,
  getYear,
  getUnitLabel,
  mergeForChart,
} from 'utils/charts';
import {
  shortMonthName,
  compactNumberTickFormatter,
  compactMoneyTickFormatter,
  thisYear,
  previousYear,
  formatPercentage,
} from './utils';
import { bottomLegend, defaultTooltip } from 'constants/charts';
import { IndicatorValue, ThemeFrontendDefinition } from 'types';
import { format, parseISO } from 'date-fns';

import BoxImage from 'images/home/box-tourism-industry.png';
import { getMapUrl } from 'hooks/map';

const theme: ThemeFrontendDefinition = {
  slug: 'visitor_spending',
  image: BoxImage,
  widgets: [
    {
      slug: 'spend_by_region',
      initialState: {
        year: previousYear,
        origin: undefined,
      },
      fetchParams: (state: any) => ({
        slug: ['spend_by_region'],
        region: [state.selectedRegion.slug, ...state.selectedRegion.children?.map((x) => x.slug)].filter((x) => x),
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const origins = uniq(rawData.map((x) => x.category_1)); // origin
        const filteredByOrigin = rawData.filter((x) => x.category_1 === (state.origin || origins[0]));
        const data = filterBySelectedYear(filteredByOrigin, state.year);
        let chartData = mergeForChart({ data, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });
        let areas = [];
        const colorsByRegionName = getColorsByRegionName(filteredByOrigin);
        const regions = uniq(rawData.map((x) => x.region));
        if (state.year !== 'all_years') {
          chartData = expandToFullYear(chartData);
          [chartData, areas] = getWithMinMaxAreas(chartData, filteredByOrigin, 'region', colorsByRegionName);
        }
        return {
          data: chartData,
          type: 'charts/composed',
          controls: [
            { type: 'tabs', side: 'left', name: 'origin', options: getOptions(origins, false) },
            { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(filteredByOrigin) },
          ],
          legend: {
            ...bottomLegend,
            payloadFilter: (y) => !y.value.includes('min-max'),
          },
          lines: regions.map((x) => ({ dataKey: x, color: colorsByRegionName[x] })),
          areas,
          xAxis: {
            dataKey: 'date',
            tickFormatter: state.year !== 'all_years' && shortMonthName,
          },
          yAxis: {
            tickFormatter: compactMoneyTickFormatter,
          },
          tooltip: {
            ...defaultTooltip,
            valueFormatter: compactMoneyTickFormatter,
            payloadFilter: (y) => !y.name.includes('min-max'),
          },
        };
      },
    },
    {
      slug: 'spend_by_origin',
      initialState: {
        year: previousYear,
      },
      fetchParams: (state: any) => ({
        slug: ['spend_by_origin'],
        region: [state.selectedRegion.slug, ...state.selectedRegion.children?.map((x) => x.slug)].filter((x) => x),
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const origins = uniq(rawData.map((x) => x.category_1)); // domestic, international
        const data = filterBySelectedYear(rawData, state.year);
        let chartData = mergeForChart({ data, mergeBy: 'date', labelKey: 'category_1', valueKey: 'value' });
        if (state.year !== 'all_years') chartData = expandToFullYear(chartData);

        return {
          type: 'charts/bar',
          data: chartData,
          controls: [{ type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData) }],
          bars: origins.map((x) => ({ dataKey: x })),
          xAxis: {
            dataKey: 'date',
            tickFormatter: state.year !== 'all_years' && shortMonthName,
          },
          yAxis: {
            tickFormatter: compactMoneyTickFormatter,
          },
          tooltip: {
            cursor: false,
            valueFormatter: compactMoneyTickFormatter,
          },
        };
      },
    },
    {
      slug: 'spend_by_market',
      initialState: {
        year: previousYear,
        origin: undefined,
        frequency: 'monthly',
      },
      fetchParams: (state: any) => ({
        slug: `spend_by_market_${state.frequency}`,
        region: [state.selectedRegion.slug, ...state.selectedRegion.children?.map((x) => x.slug)].filter((x) => x),
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const origins = uniq(rawData.map((x) => x.category_1)); // origin
        const filteredByOrigin = rawData.filter((x) => x.category_1 === (state.origin || origins[0]));
        const data = filterBySelectedYear(filteredByOrigin, state.year);
        const formatDate = state.frequency === 'quarterly' ? (d) => d : shortMonthName;
        let chartData = mergeForChart({ data, mergeBy: 'date', labelKey: 'category_2', valueKey: 'value' });
        if (state.year !== 'all_years') chartData = expandToFullYear(chartData);

        return {
          type: 'charts/bar',
          data: chartData,
          controls: [
            { type: 'tabs', side: 'left', name: 'origin', options: getOptions(origins, false) },
            { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(filteredByOrigin) },
            { type: 'select', side: 'right', name: 'frequency', options: getOptions(['Monthly', 'Quarterly']) },
          ],
          bars: getStackedBarsData(chartData, 'date'),
          xAxis: {
            dataKey: 'date',
            tickFormatter: state.year !== 'all_years' && formatDate,
          },
          yAxis: {
            tickFormatter: compactMoneyTickFormatter,
          },
          tooltip: {
            cursor: false,
            valueFormatter: compactMoneyTickFormatter,
          },
        };
      },
    },
    {
      slug: 'spend_by_item',
      initialState: {
        year: previousYear,
        origin: undefined,
      },
      fetchParams: (state: any) => ({
        slug: ['spend_by_item'],
        region: [state.selectedRegion.slug, ...state.selectedRegion.children?.map((x) => x.slug)].filter((x) => x),
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const origins = uniq(rawData.map((x) => x.category_1)); // origin
        const filteredByOrigin = rawData.filter((x) => x.category_1 === (state.origin || origins[0]));
        const data = filterBySelectedYear(filteredByOrigin, state.year);
        let chartData = mergeForChart({ data, mergeBy: 'date', labelKey: 'category_2', valueKey: 'value' });
        if (state.year !== 'all_years') chartData = expandToFullYear(chartData);

        return {
          type: 'charts/bar',
          data: chartData,
          chartProps: {
            stackOffset: 'expand',
          },
          controls: [
            { type: 'tabs', side: 'left', name: 'origin', options: getOptions(origins, false) },
            { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(filteredByOrigin) },
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
            showPercentageOfTotal: true,
            valueFormatter: compactMoneyTickFormatter,
          },
        };
      },
    },
  ],
};

export default theme;
