import uniq from 'lodash/uniq';
import { IndicatorValue, ThemeType } from 'types';
import {
  expandToFullYear,
  filterBySelectedYear,
  getAvailableYearsOptions,
  getOptions,
  getTopN,
  getWithMinMaxAreas,
  mergeForChart,
} from 'utils/charts';
import { bottomLegend } from 'constants/charts';
import { shortMonthName, compactNumberTickFormatter, previousYear } from './utils';

import airportImage from 'images/home/image-airport.png';

const theme: ThemeType = {
  title: 'Airport Information',
  slug: 'airport-information',
  image: airportImage,
  sections: [
    {
      title: 'Total number of arriving flights per month',
      description: `
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
      initialState: {
        year: previousYear,
      },
      fetchParams: (state: any) => ({
        slug: 'airport_arrivals_monthly',
        region: [state.selectedRegion.name, ...state.selectedRegion.children?.map((x) => x.name)].filter((x) => x),
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const data = filterBySelectedYear(rawData, state.year);
        let chartData = mergeForChart({ data, mergeBy: 'date', labelKey: 'category_2', valueKey: 'value' });
        const airports = uniq(rawData.map((x) => x.category_2));
        let areas = [];
        if (state.year !== 'all_years') {
          chartData = expandToFullYear(chartData);
          [chartData, areas] = getWithMinMaxAreas(chartData, rawData, 'category_2');
        }

        return {
          type: 'charts/composed',
          data: chartData,
          controls: [{ type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData) }],
          lines: airports.map((x) => ({ dataKey: x })),
          areas,
          legend: {
            ...bottomLegend,
            payloadFilter: (y) => !y.value.includes('min-max'),
          },
          xAxis: {
            dataKey: 'date',
            tickFormatter: state.year !== 'all_years' && shortMonthName,
          },
          tooltip: {
            cursor: { stroke: '#314057', strokeWidth: 1 },
            valueFormatter: compactNumberTickFormatter,
            payloadFilter: (y) => !y.name.includes('min-max'),
          },
        };
      },
    },
    {
      title: 'Total passenger volume',
      description: `
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
      initialState: {
        year: previousYear,
        airport: undefined,
      },
      fetchParams: (state: any) => ({
        slug: ['airport_domestic_pax_monthly', 'airport_international_pax_monthly'],
        region: [state.selectedRegion.name, ...state.selectedRegion.children?.map((x) => x.name)].filter((x) => x),
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const airports = uniq(rawData.map((x) => x.category_2));
        let data = filterBySelectedYear(rawData, state.year);
        data = data.filter((x) => x.category_2 === (state.airport || airports[0]));
        const indicatorsMap = {
          airport_domestic_pax_monthly: 'Domestic Flights',
          airport_international_pax_monthly: 'International Flights',
        };
        const changed = data.map((x) => ({ ...x, indicator: indicatorsMap[x.indicator] }));
        let chartData = mergeForChart({ data: changed, mergeBy: 'date', labelKey: 'indicator', valueKey: 'value' });

        if (state.year !== 'all_years') {
          chartData = expandToFullYear(chartData);
        }

        return {
          type: 'charts/bar',
          data: chartData,
          controls: [
            { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData) },
            { type: 'select', side: 'right', name: 'airport', options: getOptions(airports, false) },
          ],
          bars: Object.values(indicatorsMap).map((x) => ({ dataKey: x })),
          xAxis: {
            dataKey: 'date',
            tickFormatter: state.year !== 'all_years' && shortMonthName,
          },
          yAxis: {
            tickFormatter: compactNumberTickFormatter,
          },
        };
      },
    },
    {
      title: 'Share of international & domestic arrivals',
      description: `
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
      initialState: {
        year: previousYear,
        airport: undefined,
      },
      fetchParams: (state: any) => ({
        slug: ['airport_dom_arrivals_monthly', 'airport_int_arrivals_monthly'],
        region: [state.selectedRegion.name, ...state.selectedRegion.children?.map((x) => x.name)].filter((x) => x),
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const airports = uniq(rawData.map((x) => x.category_2));
        let data = filterBySelectedYear(rawData, state.year);
        data = data.filter((x) => x.category_2 === (state.airport || airports[0]));
        const indicatorsMap = {
          airport_dom_arrivals_monthly: 'Domestic Flights',
          airport_int_arrivals_monthly: 'International Flights',
        };
        const changed = data.map((x) => ({ ...x, indicator: indicatorsMap[x.indicator] }));
        let chartData = mergeForChart({ data: changed, mergeBy: 'date', labelKey: 'indicator', valueKey: 'value' });

        if (state.year !== 'all_years') {
          chartData = expandToFullYear(chartData);
        }

        return {
          type: 'charts/bar',
          data: chartData,
          controls: [
            { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData) },
            { type: 'select', side: 'right', name: 'airport', options: getOptions(airports, false) },
          ],
          chartProps: {
            stackOffset: 'expand',
          },
          bars: Object.values(indicatorsMap).map((x) => ({ dataKey: x, stackId: 1 })),
          xAxis: {
            dataKey: 'date',
            tickFormatter: state.year !== 'all_years' && shortMonthName,
          },
          yAxis: {
            tickFormatter: (val) => `${val * 100}%`,
          },
          tooltip: {
            cursor: false,
            valueFormatter: (value) => `${(value * 100).toFixed(2)}%`,
          },
        };
      },
    },
    {
      title: 'Total number of destinations per year',
      description: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
      initialState: {
        year: previousYear,
      },
      fetchParams: (state: any) => ({
        slug: 'airport_total_destinations',
        region: [state.selectedRegion.name, ...state.selectedRegion.children?.map((x) => x.name)].filter((x) => x),
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const data = filterBySelectedYear(rawData, state.year);
        const top5 = getTopN(data, 5, 'value');

        return {
          type: 'rank',
          data: top5.map((x) => ({
            text: `${x.category_2} - {value} destinations`,
            value: x.value,
          })),
          controls: [
            { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, false) },
          ],
        };
      },
    },
    {
      title: 'Top average connections per week',
      description: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
      initialState: {
        year: previousYear,
      },
      fetchParams: (state: any) => ({
        slug: 'airport_top_average_connections_per_week',
        region: [state.selectedRegion.name, ...state.selectedRegion.children?.map((x) => x.name)].filter((x) => x),
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const data = filterBySelectedYear(rawData, state.year);

        return {
          type: 'charts/sankey',
          data,
          sourceKey: 'category_1',
          targetKey: 'category_2',
          controls: [
            { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, false) },
          ],
          tooltip: {
            cursor: false,
            valueFormatter: (value: number) => value.toFixed(2),
          },
        };
      },
    },
    {
      title: 'Daily arrivals by origin airport',
      description: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
      initialState: {
        year: previousYear,
        airport: undefined,
      },
      fetchParams: (state: any) => ({
        slug: 'airport_arrivals_by_origin_daily',
        region: [state.selectedRegion.name, ...state.selectedRegion.children?.map((x) => x.name)].filter((x) => x),
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        let data = filterBySelectedYear(rawData, state.year);

        const originAirports = uniq(data.map((x) => x.category_1));
        const destinationAirports = uniq(rawData.map((x) => x.category_2));

        data = data.filter((x) => x.category_2 === (state.airport || destinationAirports[0]));

        let chartData = mergeForChart({ data, mergeBy: 'date', labelKey: 'category_1', valueKey: 'value' });

        if (state.year !== 'all_years') {
          chartData = expandToFullYear(chartData);
        }

        return {
          type: 'charts/bar',
          data: chartData,
          controls: [
            { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData) },
            { type: 'select', side: 'right', name: 'airport', options: getOptions(destinationAirports, false) },
          ],
          bars: originAirports.map((x) => ({ dataKey: x, stackId: 1 })),
          xAxis: {
            dataKey: 'date',
            tickFormatter: state.year !== 'all_years' && shortMonthName,
          },
          tooltip: {
            cursor: false,
            valueFormatter: (value) => value.toFixed(2),
          },
        };
      },
    },
  ],
};

export default theme;
