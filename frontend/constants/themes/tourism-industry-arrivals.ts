import uniq from 'lodash/uniq';
import {
  allMonths,
  expandToFullYear,
  filterBySelectedYear,
  getAvailableYearsOptions,
  getOptions,
  getPercentageTotalByLabel,
  getStackedBarsData,
  getTop10AndOthers,
  getTop10AndOthersByYear,
  getTopN,
  getWithMinMaxAreas,
  getYear,
  mergeForChart,
} from 'utils/charts';
import { shortMonthName, compactNumberTickFormatter, thisYear, previousYear, formatPercentage } from './utils';
import { bottomLegend } from 'constants/charts';
import { IndicatorValue, ThemeType } from 'types';
import { format, parseISO } from 'date-fns';

import mountainsImage from 'images/home/image-mountains.png';

const theme: ThemeType = {
  title: 'Tourism Industry & Arrivals',
  slug: 'tourism-industry-arrivals',
  image: mountainsImage,
  summary:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet.',
  sections: [
    {
      title: 'Tourism establishments',
      subTitle: '(by type)',
      description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
      fetchParams: (state: any) => ({
        slug: 'establishments_by_type',
        category_2: 'all',
        region: [state.selectedRegion.name, ...state.selectedRegion.children?.map((x) => x.name)],
      }),
      widget: {
        type: 'charts/pie',
        fetchProps(rawData: IndicatorValue[]): any {
          return {
            data: getTop10AndOthers(rawData, 'category_1'),
            pies: [
              {
                nameKey: 'category_1',
                dataKey: 'value',
              },
            ],
          };
        },
      },
    },
    {
      title: 'Biosphere committed & accessible businesses',
      subTitle: '(by type)',
      description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
      fetchParams: (state: any) => ({
        slug: 'establishments_by_type',
        category_2: state.type,
        region: [state.selectedRegion.name, ...state.selectedRegion.children?.map((x) => x.name)],
      }),
      initialState: {
        type: 'biosphere',
      },
      widget: {
        type: 'charts/pie',
        fetchProps(rawData: IndicatorValue[]): any {
          return {
            data: getTop10AndOthers(rawData, 'category_1'),
            controls: [
              { type: 'tabs', side: 'left', name: 'type', options: getOptions(['Biosphere', 'Accessibility']) },
            ],
            pies: [
              {
                nameKey: 'category_1',
                dataKey: 'value',
              },
            ],
          };
        },
      },
    },
    {
      title: 'Monthly domestic (Canadian) arrivals',
      description: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
      initialState: {
        group: 'visits',
        year: 'all_years',
      },
      fetchParams: (state: any) => ({
        slug: `${state.group}_by_origin_country_monthly`,
        region: [
          state.selectedRegion.name,
          state.selectedRegion.parent?.name,
          ...state.selectedRegion.children?.map((x) => x.name),
        ].filter((x) => x),
        category_1: 'Canada',
      }),
      widget: {
        type: 'charts/composed',
        fetchProps(rawData: IndicatorValue[] = [], state: any): any {
          const data = filterBySelectedYear(rawData, state.year);
          let chartData = mergeForChart({ data, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });
          let areas = [];
          const regions = uniq(rawData.map((x) => x.region));
          if (state.year !== 'all_years') {
            chartData = expandToFullYear(chartData);
            [chartData, areas] = getWithMinMaxAreas(chartData, rawData, 'region');
          }
          return {
            data: chartData,
            controls: [
              { type: 'tabs', side: 'left', name: 'group', options: getOptions(['Visits', 'Trips', 'Stays']) },
              { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData) },
            ],
            legend: {
              ...bottomLegend,
              payloadFilter: (y) => !y.value.includes('min-max'),
            },
            lines: regions.map((x) => ({ dataKey: x })),
            areas,
            xAxis: {
              dataKey: 'date',
              tickFormatter: state.year !== 'all_years' && shortMonthName,
            },
            yAxis: {
              tickFormatter: compactNumberTickFormatter,
            },
            tooltip: {
              cursor: { stroke: '#314057', strokeWidth: 1 },
              valueFormatter: compactNumberTickFormatter,
              payloadFilter: (y) => !y.name.includes('min-max'),
            },
          };
        },
      },
    },
    {
      title: '% of annual domestic overnight visitors occurring in peak month & quarter',
      description: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
      initialState: {
        year: previousYear,
        frequency: 'monthly',
      },
      fetchParams: (state: any) => ({
        slug: `domestic_visits_percentage_${state.frequency}`,
        region: state.selectedRegion.name,
      }),
      widget: {
        type: 'rank',
        fetchProps(rawData: IndicatorValue[] = [], state: any): any {
          const take = state.frequency === 'quarterly' ? 4 : 5;
          const formatDate = state.frequency === 'quarterly' ? (d) => d : shortMonthName;
          const filteredByYear = (rawData || []).filter((x: any) => getYear(x.date) === state.year);
          const data = getTopN(filteredByYear, take, 'value').map(
            (x) => `${formatDate(x.date)}: ${formatPercentage(x.value)} of visitors`,
          );

          return {
            data,
            controls: [
              { type: 'tabs', side: 'left', name: 'frequency', options: getOptions(['Monthly', 'Quarterly']) },
              { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, false) },
            ],
          };
        },
      },
    },
    {
      title: 'Ratio of number of domestic tourists in peak month to lowest month',
      description: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
      initialState: {
        year: previousYear,
      },
      fetchParams: (state: any) => ({
        slug: 'domestic_visits_peak_lowest_month_ratio',
        region: state.selectedRegion.name,
      }),
      widget: {
        type: 'text',
        fetchProps(rawData: IndicatorValue[] = [], state: any): any {
          const ratio = (rawData || []).filter((x: any) => getYear(x.date) === state.year)[0];

          let ratioText = '';
          if (ratio) {
            const ratioNumber = Number(ratio.value).toFixed(2);
            ratioText = `peak/lowest month (${shortMonthName(ratio.category_1)}/${shortMonthName(
              ratio.category_2,
            )}): ${ratioNumber} x visitors`;
          }

          return {
            data: ratioText,
            controls: [
              { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, false) },
            ],
          };
        },
      },
    },
    {
      title: 'Domestic (canadian) visitors by origin province',
      description: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula.Sed sodales aliquam nisl eget mollis.Quisque mollis nisi felis, eu convallis purus sagittis sit amet.Sed elementum scelerisque ipsum, at rhoncus eros venenatis at.Donec mattis quis massa ut viverra.In ullamcorper, magna non convallis ultricies. `,
      initialState: {
        frequency: 'monthly',
        year: previousYear,
      },
      fetchParams: (state: any) => ({
        slug: `visits_by_origin_province_${state.frequency}`,
        region: state.selectedRegion.name,
      }),
      widget: {
        type: 'charts/bar',
        fetchProps(rawData: IndicatorValue[] = [], state: any): any {
          const filteredByYear = rawData.filter((x: any) => getYear(x.date) === state.year);
          const data = mergeForChart({
            data: filteredByYear,
            mergeBy: 'date',
            labelKey: 'category_1',
            valueKey: 'value',
          });
          if (state.frequency === 'monthly') {
            data.forEach((d: any) => (d.date = shortMonthName(d.date)));
          }
          const bars = getStackedBarsData(data, 'date');
          const percentagePerPeriod = getPercentageTotalByLabel(data, 'date');

          return {
            data,
            controls: [
              { type: 'tabs', side: 'left', name: 'frequency', options: getOptions(['Monthly', 'Quarterly']) },
              { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, false) },
            ],
            bars,
            xAxis: {
              dataKey: 'date',
            },
            yAxis: {
              tickFormatter: compactNumberTickFormatter,
            },
            tooltip: {
              cursor: false,
              totalFormatter: (label) => `${percentagePerPeriod[label]}% of ${state.year} total`,
            },
          };
        },
      },
    },
    {
      title: 'Quarterly visits by origin city',
      subTitle: '(top 10)',
      description: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula.Sed sodales aliquam nisl eget mollis.Quisque mollis nisi felis, eu convallis purus sagittis sit amet.Sed elementum scelerisque ipsum, at rhoncus eros venenatis at.Donec mattis quis massa ut viverra.In ullamcorper, magna non convallis ultricies. `,
      initialState: {
        year: previousYear,
      },
      fetchParams: (state: any) => ({
        slug: 'visits_by_origin_city_quarterly',
        region: [state.selectedRegion.name, state.selectedRegion.parent?.name].filter((x) => x),
      }),
      widget: {
        type: 'charts/bar',
        fetchProps(rawData: IndicatorValue[] = [], state: any): any {
          const filteredByYear = rawData.filter((x: any) => getYear(x.date) === state.year);
          const top10 = getTop10AndOthersByYear(filteredByYear, 'category_1');
          const data = mergeForChart({
            data: top10,
            mergeBy: 'date',
            labelKey: 'category_1',
            valueKey: 'value',
          });
          const bars = getStackedBarsData(data, 'date');
          const percentagePerPeriod = getPercentageTotalByLabel(data, 'date');

          return {
            data,
            controls: [
              { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, false) },
            ],
            bars,
            xAxis: {
              dataKey: 'date',
            },
            yAxis: {
              tickFormatter: compactNumberTickFormatter,
            },
            tooltip: {
              cursor: false,
              totalFormatter: (label) => `${percentagePerPeriod[label]}% of ${state.year} total`,
            },
          };
        },
      },
    },
    {
      title: 'Monthly visits by PRIZM cluster',
      subTitle: '(top 10)',
      description: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula.Sed sodales aliquam nisl eget mollis.Quisque mollis nisi felis, eu convallis purus sagittis sit amet.Sed elementum scelerisque ipsum, at rhoncus eros venenatis at.Donec mattis quis massa ut viverra.In ullamcorper, magna non convallis ultricies. `,
      initialState: {
        year: previousYear,
      },
      fetchParams: (state: any) => ({ slug: 'visits_by_prizm_monthly', region: state.selectedRegion.name }),
      widget: {
        type: 'charts/bar',
        fetchProps(rawData: IndicatorValue[] = [], state: any): any {
          const filteredByYear = rawData.filter((x: any) => getYear(x.date) === state.year);
          const data = mergeForChart({
            data: filteredByYear,
            mergeBy: 'date',
            labelKey: 'category_2',
            valueKey: 'value',
          });
          data.forEach((d: any) => (d.date = shortMonthName(d.date)));
          const bars = getStackedBarsData(data, 'date');

          return {
            data,
            controls: [
              { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, false) },
            ],
            chartProps: {
              layout: 'vertical',
            },
            legend: {
              ...bottomLegend,
              removable: true,
            },
            bars,
            xAxis: {
              hide: true,
              type: 'number',
            },
            yAxis: {
              dataKey: 'date',
              type: 'category',
            },
            height: 250 + 50 * data.length,
          };
        },
      },
    },
    {
      title: 'Average length of stay of domestic (Canadian) overnight visitors',
      description: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
      initialState: {
        year: previousYear,
      },
      fetchParams: (state: any) => ({
        slug: 'nights_per_visitor_by_country_monthly',
        region: [state.selectedRegion.name, state.selectedRegion.parent?.name].filter((x) => x),
      }),
      widget: {
        type: 'charts/composed',
        fetchProps(rawData: IndicatorValue[] = [], state: any): any {
          const data = filterBySelectedYear(rawData, state.year);
          let chartData = mergeForChart({ data, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });
          let areas = [];
          const regions = uniq(rawData.map((x) => x.region));
          if (state.year !== 'all_years') {
            chartData = expandToFullYear(chartData);
            [chartData, areas] = getWithMinMaxAreas(chartData, rawData, 'region');
          }

          return {
            data: chartData,
            controls: [{ type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData) }],
            legend: {
              ...bottomLegend,
              payloadFilter: (y) => !y.value.includes('min-max'),
            },
            areas,
            lines: regions.map((x) => ({ dataKey: x })),
            xAxis: {
              dataKey: 'date',
              tickFormatter: state.year !== 'all_years' && shortMonthName,
            },
            yAxis: {},
            tooltip: {
              payloadFilter: (y) => !y.name.includes('min-max'),
            },
          };
        },
      },
    },
    {
      title: 'Weekly Canadian travel patterns',
      description: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
      initialState: {
        year: `compared_to_${previousYear}`,
      },
      fetchParams: (state: any) => ({
        slug: 'visits_change_weekly',
        region: [
          state.selectedRegion.name,
          state.selectedRegion.parent?.name,
          ...state.selectedRegion.children?.map((x) => x.name),
        ].filter((x) => x),
      }),
      widget: {
        type: 'charts/line',
        fetchProps(rawData: IndicatorValue[] = [], state: any): any {
          const yearsOptions = uniq(rawData.map((x: any) => x.category_1))
            .sort()
            .reverse()
            .map((cat1: string) => ({ label: cat1.replace('compared_to_', ''), value: cat1 }));
          let data = rawData.filter((x: any) => x.category_1 === state.year);
          const allDates = data.map((x) => parseISO(x.date).getTime());
          const months = allMonths.map((x) => new Date(`${thisYear} ${x}`).getTime());
          const minDate = Math.min(...allDates);
          data = data.map((x) => ({ ...x, date: parseISO(x.date).getTime().toString() }));
          const chartData = mergeForChart({ data, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });
          const regions = uniq(rawData.map((x) => x.region)).map((x) => ({ dataKey: x }));
          return {
            data: chartData,
            controls: [
              {
                type: 'select',
                side: 'right',
                name: 'year',
                options: yearsOptions,
                prefix: `${thisYear} Compared to: `,
              },
            ],
            lines: regions,
            xAxis: {
              dataKey: 'date',
              ticks: [minDate, ...months.slice(1)],
              tickFormatter: (date) => {
                const parsedDate = new Date(parseInt(date));
                if (isNaN(parsedDate.getTime())) return date;
                return format(parsedDate, 'MMM');
              },
              type: 'number',
              scale: 'time',
              domain: ['auto', 'auto'],
            },
            yAxis: {},
            tooltip: {
              labelFormatter: (value) => {
                const parsedDate = new Date(parseInt(value));
                return format(parsedDate, 'MMM d');
              },
            },
          };
        },
      },
    },
  ],
};

export default theme;
