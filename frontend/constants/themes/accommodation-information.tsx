import { IndicatorValue, ThemeFrontendDefinition } from 'types';
import uniq from 'lodash/uniq';
import groupBy from 'lodash/groupBy';
import { parseISO, format } from 'date-fns';

import {
  filterBySelectedYear,
  getAvailableYearsOptions,
  getColorsByRegionName,
  getOptions,
  mergeForChart,
  getYear,
} from 'utils/charts';
import { defaultTooltip } from 'constants/charts';

import BoxImage from 'images/home/box-accommodation-information.png';

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
  const indicatorsMap = {
    [`${indicatorPrefix}_weekday`]: 'Weekday',
    [`${indicatorPrefix}_weekend`]: 'Weekend',
    [`${indicatorPrefix}_month`]: 'Month',
  };
  const changeMap = {
    [`${indicatorPrefix}_change_weekday`]: 'Weekday',
    [`${indicatorPrefix}_change_weekend`]: 'Weekend',
    [`${indicatorPrefix}_change_month`]: `${indicatorPrefix}_month`,
  };

  return function fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
    const regions = uniq(rawData.map((x) => x.region));
    const colorsByRegionName = getColorsByRegionName(rawData);

    if (['weekly', 'monthly'].includes(state.type)) {
      const periods = uniq(rawData.map((x) => x.date))
        .sort()
        .reverse();
      const selectedPeriod = state.period || periods[0];
      const selectedYear = getYear(selectedPeriod);
      const data = rawData.filter((x) => x.date === selectedPeriod);
      data.forEach((d) => {
        d.indicator = indicatorsMap[d.indicator] || d.indicator;
      });
      return {
        type: 'compare',
        data,
        changeMap,
        colors: getColorsByRegionName(data),
        currentYear: parseInt(selectedYear, 10),
        controls: [
          { type: 'tabs', side: 'left', name: 'type', options: getOptions(['Weekly', 'Monthly', 'Historical']) },
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
    const data = filterBySelectedYear(rawData, state.year);
    const chartData = mergeForChart({ data, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });
    return {
      type: 'charts/line',
      data: chartData,
      controls: [
        { type: 'tabs', side: 'left', name: 'type', options: getOptions(['Weekly', 'Monthly', 'Historical']) },
        { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData) },
      ],
      lines: regions.map((x) => ({ dataKey: x, color: colorsByRegionName[x] })),
      xAxis: {
        dataKey: 'date',
      },
      yAxis: {
        tickFormatter: (val) => `${val}${unit}`,
      },
      tooltip: {
        ...defaultTooltip,
        valueFormatter: (val) => `${val}${unit}`,
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
        year: 'all_years',
        period: undefined,
        type: 'weekly',
      },
      fetchParams: getFetchParamsFunction('occupancy'),
      fetchWidgetProps: getFetchWidgetPropsFunction('occupancy', '%'),
    },
    {
      slug: 'average_daily_hotel_rate',
      initialState: {
        year: 'all_years',
        period: undefined,
        type: 'weekly',
      },
      fetchParams: getFetchParamsFunction('adr'),
      fetchWidgetProps: getFetchWidgetPropsFunction('adr', '$'),
    },
    {
      slug: 'revenue_per_available_room',
      initialState: {
        year: 'all_years',
        period: undefined,
        type: 'weekly',
      },
      fetchParams: getFetchParamsFunction('revpar'),
      fetchWidgetProps: getFetchWidgetPropsFunction('revpar', '$'),
    },
  ],
};

export default theme;
