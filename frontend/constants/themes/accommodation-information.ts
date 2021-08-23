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
        slug: ['occupancy_weekday', 'occupancy_weekend'],
        region: [
          state.selectedRegion.name,
          state.selectedRegion.parent?.name,
          ...state.selectedRegion.children?.map((x) => x.name),
        ].filter((x) => x),
      }),
      widget: {
        type: 'compare',
        fetchProps(rawData: IndicatorValue[] = [], state: any): any {
          const regions = uniq(rawData.map((x) => x.region));
          if (state.type === 'weekly') {
            const indicatorsMap = {
              occupancy_weekday: 'Weekday',
              occupancy_weekend: 'Weekend',
            };
            const weeks = uniq(rawData.map((x) => x.date))
              .sort()
              .reverse();
            const data = rawData.filter((x) => x.date === (state.week || weeks[0]));
            const changed = data.map((x) => ({ ...x, indicator: indicatorsMap[x.indicator] }));
            const chartData = mergeForChart({
              data: changed,
              mergeBy: 'indicator',
              labelKey: 'region',
              valueKey: 'value',
            });
            return {
              data: chartData,
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
          const data = filterBySelectedYear(rawData, state.year);
          const chartData = mergeForChart({ data, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });
          return {
            data: chartData,
            widgetTypeOverride: 'charts/line',
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
    },
  ],
};

export default theme;
