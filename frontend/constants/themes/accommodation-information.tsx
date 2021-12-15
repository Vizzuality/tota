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

function getFetchWidgetPropsFunction(indicatorPrefix: string, unit: string) {
  const changeIndicator = `${indicatorPrefix}_change_week`;
  const indicatorsMap = {
    [`${indicatorPrefix}_weekday`]: 'Weekday',
    [`${indicatorPrefix}_weekend`]: 'Weekend',
  };

  return function fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
    const regions = uniq(rawData.map((x) => x.region));
    const colorsByRegionName = getColorsByRegionName(rawData);

    if (state.type === 'weekly') {
      const weeks = uniq(rawData.map((x) => x.date))
        .sort()
        .reverse();
      const selectedWeek = state.week || weeks[0];
      const selectedYear = getYear(selectedWeek);
      const dataForWeek = rawData.filter((x) => x.date === selectedWeek);
      let data = dataForWeek.filter((x) => x.indicator !== changeIndicator);
      const changeData = dataForWeek.filter((x) => x.indicator === changeIndicator);
      data = data.map((x) => ({ ...x, indicator: indicatorsMap[x.indicator] }));
      return {
        type: 'compare',
        data,
        changeData,
        currentYear: parseInt(selectedYear, 10),
        controls: [
          { type: 'tabs', side: 'left', name: 'type', options: getOptions(['Weekly', 'Historical']) },
          { type: 'select', side: 'right', name: 'week', options: getWeekOptions(weeks) },
        ],
        mergeBy: 'indicator',
        labelKey: 'region',
        valueKey: 'value',
        unit,
      };
    }
    const withoutChange = rawData.filter((x) => x.indicator !== changeIndicator);
    let data = filterBySelectedYear(withoutChange, state.year);
    data = Object.values(groupBy(data, (d: IndicatorValue) => [d.date, d.region])).map((grouped: IndicatorValue[]) => ({
      ...grouped[0],
      value: Number((grouped.reduce((acc, v) => acc + v.value, 0) / grouped.length).toFixed(2)),
    }));
    const chartData = mergeForChart({ data, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });
    return {
      type: 'charts/line',
      data: chartData,
      controls: [
        { type: 'tabs', side: 'left', name: 'type', options: getOptions(['Weekly', 'Historical']) },
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
        week: undefined,
        type: 'weekly',
      },
      fetchParams: (state: any) => ({
        slug: ['occupancy_weekday', 'occupancy_weekend', 'occupancy_change_week'],
        region: [state.selectedRegion.slug, state.selectedRegion.parent?.slug].filter((x) => x),
      }),
      fetchWidgetProps: getFetchWidgetPropsFunction('occupancy', '%'),
    },
    {
      slug: 'average_daily_hotel_rate',
      initialState: {
        year: 'all_years',
        week: undefined,
        type: 'weekly',
      },
      fetchParams: (state: any) => ({
        slug: ['adr_weekday', 'adr_weekend', 'adr_change_week'],
        region: [state.selectedRegion.slug, state.selectedRegion.parent?.slug].filter((x) => x),
      }),
      fetchWidgetProps: getFetchWidgetPropsFunction('adr', '$'),
    },
    {
      slug: 'revenue_per_available_room',
      initialState: {
        year: 'all_years',
        week: undefined,
        type: 'weekly',
      },
      fetchParams: (state: any) => ({
        slug: ['revpar_weekday', 'revpar_weekend', 'revpar_change_week'],
        region: [state.selectedRegion.slug, state.selectedRegion.parent?.slug].filter((x) => x),
      }),
      fetchWidgetProps: getFetchWidgetPropsFunction('revpar', '$'),
    },
  ],
};

export default theme;
