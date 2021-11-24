import { IndicatorValue, ThemeType } from 'types';
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

const theme: ThemeType = {
  title: 'Accommodation Information',
  slug: 'accommodation-information',
  image: BoxImage,
  sections: [
    {
      title: 'Occupancy rates',
      description: `Occupancy rate of hotels in the selected region. Shown are the average rates during the week vs. weekends (%) and the percentage change to the previous year. The historical data shows the development over time per year.`,
      note: 'Insights of hotels participating in the STR report. Occupancy rates are calculated by dividing the the number of occupied rooms by the number of available rooms that physically exist in a hotel. To participate in the STR "STAR" Report, hotels can submit data and receive free reports benchmarking performance against market trends. To enroll, see here.',
      sources: [
        {
          text: 'STR/NCHA/BCRTS Destination Weekly Reports',
        },
      ],
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
      title: 'Average daily hotel rate (ADR)',
      description: `Average daily hotel rate (ADRs) of hotels in the selected region during the week vs. weekends (%) and the percentage change to the previous year. The historical data shows the development over time per year.`,
      note: ' Insights of hotels participating in the STR report. Occupancy rates are calculated by dividing the the number of occupied rooms by the number of available rooms that physically exist in a hotel. To participate in the STR "STAR" Report, hotels can submit data and receive free reports benchmarking performance against market trends. To enroll, see here.',
      sources: [
        {
          text: 'STR/NCHA/BCRTS Destination Weekly Reports',
        },
      ],
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
      title: 'Revenue per available room (RevPAR)',
      description: `Revenue per available room (RevPAR) of hotels in the selected region during the week vs. weekends (%) and the percentage change to the previous year. The historical data shows the development over time per year.`,
      note: ' Insights of hotels participating in the STR report. Occupancy rates are calculated by dividing the the number of occupied rooms by the number of available rooms that physically exist in a hotel. To participate in the STR "STAR" Report, hotels can submit data and receive free reports benchmarking performance against market trends. To enroll, see here.',
      sources: [
        {
          text: 'STR/NCHA/BCRTS Destination Weekly Reports',
        },
      ],
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
