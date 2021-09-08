import { IndicatorValue, ThemeType } from 'types';
import uniq from 'lodash/uniq';
import { filterBySelectedYear, getAvailableYearsOptions, getOptions, mergeForChart, getYear } from 'utils/charts';
import { previousYear } from './utils';

import mountains3Image from 'images/home/image-mountains3.png';

function getFetchWidgetPropsFunction(indicatorPrefix: string) {
  const changeIndicator = `${indicatorPrefix}_change_week`;
  const indicatorsMap = {
    [`${indicatorPrefix}_weekday`]: 'Weekday',
    [`${indicatorPrefix}_weekend`]: 'Weekend',
  };

  return function fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
    const regions = uniq(rawData.map((x) => x.region));

    if (state.type === 'weekly') {
      const weeks = uniq(rawData.map((x) => x.date))
        .sort()
        .reverse();
      const selectedWeek = state.week || weeks[0];
      const selectedYear = getYear(selectedWeek);
      const dataForWeek = rawData.filter((x) => x.date === selectedWeek);
      let data = dataForWeek.filter((x) => x.indicator !== changeIndicator);
      const changeData = dataForWeek.filter((x) => x.indicator === changeIndicator);
      const changeToPreviousYear = regions.reduce(
        (acc, region) => ({ ...acc, [region]: changeData.find((x) => x.region === region)?.value }),
        {},
      );
      data = data.map((x) => ({ ...x, indicator: indicatorsMap[x.indicator] }));
      const chartData = mergeForChart({
        data,
        mergeBy: 'indicator',
        labelKey: 'region',
        valueKey: 'value',
      });
      return {
        type: 'compare',
        data: chartData,
        changeToPreviousYear,
        currentYear: parseInt(selectedYear, 10),
        controls: [
          { type: 'tabs', side: 'left', name: 'type', options: getOptions(['Weekly', 'Historical']) },
          { type: 'select', side: 'right', name: 'week', options: getOptions(weeks, false) },
        ],
        chartType: 'bar',
        chartConfig: {
          bars: regions.map((x) => ({ dataKey: x })),
          xAxis: {
            dataKey: 'indicator',
          },
        },
      };
    }
    const withoutChange = rawData.filter((x) => x.indicator !== changeIndicator);
    const data = filterBySelectedYear(withoutChange, state.year);
    const chartData = mergeForChart({ data, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });
    return {
      type: 'charts/line',
      data: chartData,
      controls: [
        { type: 'tabs', side: 'left', name: 'type', options: getOptions(['Weekly', 'Historical']) },
        { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData) },
      ],
      lines: regions.map((x) => ({ dataKey: x })),
      xAxis: {
        dataKey: 'date',
      },
    };
  };
}

const theme: ThemeType = {
  title: 'Accommodation Information',
  slug: 'accommodation-information',
  image: mountains3Image,
  sections: [
    {
      title: 'Occupancy rates',
      description: `
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula.Sed sodales aliquam nisl eget mollis.Quisque mollis nisi felis, eu convallis purus sagittis sit amet.Sed elementum scelerisque ipsum, at rhoncus eros venenatis at.Donec mattis quis massa ut viverra.In ullamcorper, magna non convallis ultricies. `,
      initialState: {
        year: previousYear,
        week: undefined,
        type: 'weekly',
      },
      fetchParams: (state: any) => ({
        slug: ['occupancy_weekday', 'occupancy_weekend', 'occupancy_change_week'],
        region: [
          state.selectedRegion.name,
          state.selectedRegion.parent?.name,
          ...state.selectedRegion.children?.map((x) => x.name),
        ].filter((x) => x),
      }),
      fetchWidgetProps: getFetchWidgetPropsFunction('occupancy'),
    },
    {
      title: 'Average daily hotel rate (ADR)',
      description: `
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula.Sed sodales aliquam nisl eget mollis.Quisque mollis nisi felis, eu convallis purus sagittis sit amet.Sed elementum scelerisque ipsum, at rhoncus eros venenatis at.Donec mattis quis massa ut viverra.In ullamcorper, magna non convallis ultricies. `,
      initialState: {
        year: previousYear,
        week: undefined,
        type: 'weekly',
      },
      fetchParams: (state: any) => ({
        slug: ['adr_weekday', 'adr_weekend', 'adr_change_week'],
        region: [
          state.selectedRegion.name,
          state.selectedRegion.parent?.name,
          ...state.selectedRegion.children?.map((x) => x.name),
        ].filter((x) => x),
      }),
      fetchWidgetProps: getFetchWidgetPropsFunction('adr'),
    },
    {
      title: 'Hotel revenue per available room',
      description: `
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula.Sed sodales aliquam nisl eget mollis.Quisque mollis nisi felis, eu convallis purus sagittis sit amet.Sed elementum scelerisque ipsum, at rhoncus eros venenatis at.Donec mattis quis massa ut viverra.In ullamcorper, magna non convallis ultricies. `,
      initialState: {
        year: previousYear,
        week: undefined,
        type: 'weekly',
      },
      fetchParams: (state: any) => ({
        slug: ['revpar_weekday', 'revpar_weekend', 'revpar_change_week'],
        region: [
          state.selectedRegion.name,
          state.selectedRegion.parent?.name,
          ...state.selectedRegion.children?.map((x) => x.name),
        ].filter((x) => x),
      }),
      fetchWidgetProps: getFetchWidgetPropsFunction('revpar'),
    },
  ],
};

export default theme;
