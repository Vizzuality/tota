import { IndicatorValue, ThemeType } from 'types';
import uniq from 'lodash/uniq';
import { filterBySelectedYear, getAvailableYearsOptions, getOptions, mergeForChart } from 'utils/charts';
import { previousYear } from './utils';

import mountains3Image from 'images/home/image-mountains3.png';

const theme: ThemeType = {
  title: 'Accommodation Information',
  slug: 'accommodation-information',
  image: mountains3Image,
  sections: [
    {
      title: 'Occupancy rates',
      description: `
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
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
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const regions = uniq(rawData.map((x) => x.region));
        if (state.type === 'weekly') {
          const indicatorsMap = {
            occupancy_weekday: 'Weekday',
            occupancy_weekend: 'Weekend',
          };
          const weeks = uniq(rawData.map((x) => x.date))
            .sort()
            .reverse();
          const dataForWeek = rawData.filter((x) => x.date === (state.week || weeks[0]));
          let data = dataForWeek.filter((x) => x.indicator !== 'occupancy_change_week');
          const changeData = dataForWeek.filter((x) => x.indicator === 'occupancy_change_week');
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
            currentYear: state.year,
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
        const withoutChange = rawData.filter((x) => x.indicator !== 'occupancy_change_week');
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
      },
    },
  ],
};

export default theme;
