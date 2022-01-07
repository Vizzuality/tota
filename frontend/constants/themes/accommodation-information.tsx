import { IndicatorValue, ThemeFrontendDefinition } from 'types';
import uniq from 'lodash/uniq';
import { parseISO, format } from 'date-fns';

import {
  filterBySelectedYear,
  getAvailableYearsOptions,
  getColorsByRegionName,
  getOptions,
  mergeForChart,
  getYear,
  getMonth,
  allMonths,
} from 'utils/charts';
import { thisYear, shortMonthName } from './utils';
import { defaultTooltip } from 'constants/charts';

import BoxImage from 'images/home/box-accommodation-information.png';

const TABS = ['Historical', 'Weekly', 'Monthly'];

function monthWeekFormatter(date: string) {
  const d = parseISO(date);
  return format(d, "MMM 'W'II");
}

function getWeekOptions(weeks: string[]) {
  return weeks.map((weekString) => {
    const date = parseISO(weekString);

    return {
      value: weekString,
      label: format(date, "'Week' I / MMMM / y"),
    };
  });
}

function getFetchParamsFunction(prefix: string) {
  return (state: any) => {
    const indicators = {
      weekly: [`${prefix}_weekday`, `${prefix}_weekend`, `${prefix}_change_weekday`, `${prefix}_change_weekend`],
      monthly: [`${prefix}_month`, `${prefix}_change_month`],
      historical: `${prefix}_week`,
    };

    return {
      slug: indicators[state.type],
      region: [state.selectedRegion.slug, state.selectedRegion.parent?.slug].filter((x) => x),
    };
  };
}

function getFetchWidgetPropsFunction(indicatorPrefix: string, unit: string) {
  return function fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
    const regions = uniq(rawData.map((x) => x.region));
    const colorsByRegionName = getColorsByRegionName(rawData);

    if (['weekly', 'monthly'].includes(state.type)) {
      const periods = uniq(rawData.map((x) => x.date))
        .sort()
        .reverse();
      const selectedPeriod = state.period || periods[0];
      const selectedYear = getYear(selectedPeriod);
      const selectedMonth = allMonths[getMonth(selectedPeriod) - 1];
      const indicatorsMap = {
        [`${indicatorPrefix}_weekday`]: 'Weekday',
        [`${indicatorPrefix}_weekend`]: 'Weekend',
        [`${indicatorPrefix}_month`]: selectedMonth,
      };
      const changeMap = {
        [`${indicatorPrefix}_change_weekday`]: 'Weekday',
        [`${indicatorPrefix}_change_weekend`]: 'Weekend',
        [`${indicatorPrefix}_change_month`]: selectedMonth,
      };
      const data = rawData
        .filter((x) => x.date === selectedPeriod)
        .map((x) => ({ ...x, indicator: indicatorsMap[x.indicator] || x.indicator }));
      return {
        type: 'compare',
        data,
        changeMap,
        colors: getColorsByRegionName(data),
        currentYear: parseInt(selectedYear, 10),
        controls: [
          { type: 'tabs', side: 'left', name: 'type', options: getOptions(TABS) },
          {
            type: 'select',
            side: 'right',
            name: 'period',
            options: state.type === 'weekly' ? getWeekOptions(periods) : getOptions(periods),
          },
        ],
        mergeBy: 'indicator',
        labelKey: 'region',
        valueKey: 'value',
        unit,
      };
    }
    let data = filterBySelectedYear(rawData, state.year);
    data = data.map((x) => ({ ...x, date: parseISO(x.date).getTime().toString() }));
    let xAxis = {
      dataKey: 'date',
      tickFormatter: (date) => {
        const parsedDate = new Date(parseInt(date));
        if (isNaN(parsedDate.getTime())) return date;
        return format(parsedDate, "yyyy 'W'II");
      },
    } as any;
    if (state.year !== 'all_years') {
      const allDates = data.map((x) => parseInt(x.date));
      const minDate = Math.min(...allDates);
      const months = allMonths.map((x) => new Date(`${state.year} ${x}`).getTime());
      xAxis = {
        dataKey: 'date',
        ticks: [minDate, ...months.filter((x) => x > minDate)],
        tickFormatter: (date) => {
          const parsedDate = new Date(parseInt(date));
          if (isNaN(parsedDate.getTime())) return date;
          return format(parsedDate, 'MMM');
        },
        type: 'number',
        scale: 'time',
        domain: ['auto', 'auto'],
      };
    }
    const chartData = mergeForChart({ data, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });
    return {
      type: 'charts/line',
      data: chartData,
      controls: [
        { type: 'tabs', side: 'left', name: 'type', options: getOptions(TABS) },
        { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData) },
      ],
      lines: regions.map((x) => ({ dataKey: x, color: colorsByRegionName[x] })),
      xAxis,
      yAxis: {
        tickFormatter: (val) => `${val}${unit}`,
      },
      tooltip: {
        ...defaultTooltip,
        valueFormatter: (val) => `${val}${unit}`,
        labelFormatter: (value) => {
          const parsedDate = new Date(parseInt(value));
          return format(parsedDate, "yyyy MMM - Io 'week of the year'");
        },
      },
    };
  };
}

const theme: ThemeFrontendDefinition = {
  slug: 'accommodation_information',
  image: BoxImage,
  widgets: [
    {
      slug: 'occupancy_rates',
      initialState: {
        year: thisYear,
        period: undefined,
        type: 'historical',
      },
      fetchParams: getFetchParamsFunction('occupancy'),
      fetchWidgetProps: getFetchWidgetPropsFunction('occupancy', '%'),
    },
    {
      slug: 'average_daily_hotel_rate',
      initialState: {
        year: thisYear,
        period: undefined,
        type: 'historical',
      },
      fetchParams: getFetchParamsFunction('adr'),
      fetchWidgetProps: getFetchWidgetPropsFunction('adr', '$'),
    },
    {
      slug: 'revenue_per_available_room',
      initialState: {
        year: thisYear,
        period: undefined,
        type: 'historical',
      },
      fetchParams: getFetchParamsFunction('revpar'),
      fetchWidgetProps: getFetchWidgetPropsFunction('revpar', '$'),
    },
  ],
};

export default theme;
