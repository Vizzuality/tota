import uniq from 'lodash/uniq';
import TotaAPI from 'services/api';
import {
  getAvailableYearsOptions,
  getOptions,
  getStackedBarsData,
  getTop10AndOthers,
  getTop10AndOthersByYear,
  getTopN,
  getYear,
  mergeRawData,
} from 'utils/charts';
import { IndicatorValue, ThemeType } from 'types';
import { format, parseISO } from 'date-fns';

const bottomLegend = {
  iconType: 'square',
  layout: 'horizontal',
  verticalAlign: 'bottom',
  align: 'left',
};

const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthNameFormatter = new Intl.DateTimeFormat('en', { month: 'short' });
const shortMonthName = (date: string) => monthNameFormatter.format(new Date(date));
const formatPercentage = (value: number) =>
  value.toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2 });
const previousYear = (new Date().getFullYear() - 1).toString();
const thisYear = new Date().getFullYear().toString();

const compactNumberTickFormatter = (value) =>
  new Intl.NumberFormat('en', { notation: 'compact', compactDisplay: 'short' }).format(value);

const themes: ThemeType[] = [
  {
    title: 'Tourism Industry & Arrivals',
    slug: 'tourism-industry-arrivals',
    summary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet.',
    sections: [
      {
        title: 'Tourism establishments',
        subTitle: '(by type)',
        description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
        fetchData: (state: any) =>
          TotaAPI.getSingleIndicator({
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
        fetchData: (state: any) =>
          TotaAPI.getSingleIndicator({
            slug: 'establishments_by_type',
            category_2: state.switchSelectedValue,
            region: [state.selectedRegion.name, ...state.selectedRegion.children?.map((x) => x.name)],
          }),
        initialState: {
          switchSelectedValue: 'biosphere',
        },
        widget: {
          type: 'charts/pie',
          fetchProps(rawData: IndicatorValue[]): any {
            return {
              data: getTop10AndOthers(rawData, 'category_1'),
              controls: {
                switch: {
                  options: getOptions(['Biosphere', 'Accessibility']),
                },
              },
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
          switchSelectedValue: 'visits',
          selectSelectedValue: 'all_years',
        },
        fetchData(state: any): any {
          const indicatorSlug = {
            visits: 'visits_by_origin_country_monthly',
            stays: 'stays_by_origin_country_monthly',
            trips: 'trips_by_origin_country_monthly',
          }[state.switchSelectedValue];

          return TotaAPI.getSingleIndicator({
            slug: indicatorSlug,
            region: [state.selectedRegion.name, state.selectedRegion.parent?.name].filter((x) => x),
            category_1: 'Canada',
          });
        },
        widget: {
          type: 'charts/composed',
          fetchProps(rawData: IndicatorValue[] = [], state: any): any {
            const yearsOptions = getAvailableYearsOptions(rawData);
            let data = rawData;
            if (state.selectSelectedValue !== 'all_years') {
              data = (rawData || []).filter((x: any) => getYear(x.date) === state.selectSelectedValue);
            }
            let merged = mergeRawData({ rawData: data, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });
            let areas = {};
            const regions = uniq(rawData.map((x) => x.region));
            if (state.selectSelectedValue !== 'all_years') {
              merged.forEach((d: any) => (d.date = shortMonthName(d.date)));
              merged = allMonths.map((month) => ({
                date: month,
                ...(merged.find((d) => d.date === month) || {}),
              }));
              merged.forEach((d: any) => {
                regions.forEach((region: string) => {
                  const valuesForMonth = rawData
                    .filter((rd: any) => rd.region === region && shortMonthName(rd.date) === d.date)
                    .map((rd: any) => rd.value);
                  d[`${region} min-max`] = [Math.min(...valuesForMonth), Math.max(...valuesForMonth)];
                });
              });
              areas = {
                areas: regions.map((region: string) => ({
                  dataKey: `${region} min-max`,
                  fillOpacity: 0.07,
                  stroke: 'none',
                })),
              };
            }
            return {
              data: merged,
              controls: {
                switch: {
                  options: getOptions(['Visits', 'Trips', 'Stays']),
                },
                select: {
                  options: yearsOptions,
                },
              },
              legend: bottomLegend,
              lines: regions.map((x) => ({ dataKey: x })),
              ...areas,
              xAxis: {
                dataKey: 'date',
              },
              yAxis: {
                tickFormatter: compactNumberTickFormatter,
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
          switchSelectedValue: 'monthly',
          selectSelectedValue: previousYear,
        },
        fetchData: (state: any) => {
          const indicatorSlug = {
            monthly: 'domestic_visits_percentage_monthly',
            quarterly: 'domestic_visits_percentage_quarterly',
          }[state.switchSelectedValue];

          return TotaAPI.getSingleIndicator({ slug: indicatorSlug, region: state.selectedRegion.name });
        },
        widget: {
          type: 'rank',
          fetchProps(rawData: IndicatorValue[] = [], state: any): any {
            const yearsOptions = getAvailableYearsOptions(rawData, false);
            let take = 5;
            let formatDate = shortMonthName;

            if (state.switchSelectedValue === 'quarterly') {
              take = 4;
              formatDate = (date) => date;
            }

            const filteredByYear = (rawData || []).filter((x: any) => getYear(x.date) === state.selectSelectedValue);
            const data = getTopN(filteredByYear, take, 'value').map(
              (x) => `${formatDate(x['date'])}: ${formatPercentage(x['value'])} of visitors`,
            );

            return {
              data,
              controls: {
                switch: {
                  options: getOptions(['Monthly', 'Quarterly']),
                },
                select: {
                  options: yearsOptions,
                },
              },
            };
          },
        },
      },
      {
        title: 'Ratio of number of domestic tourists in peak month to lowest month',
        description: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
        initialState: {
          selectSelectedValue: previousYear,
        },
        fetchData: (state: any) =>
          TotaAPI.getSingleIndicator({
            slug: 'domestic_visits_peak_lowest_month_ratio',
            region: state.selectedRegion.name,
          }),
        widget: {
          type: 'text',
          fetchProps(rawData: IndicatorValue[] = [], state: any): any {
            const yearsOptions = getAvailableYearsOptions(rawData, false);
            const ratio = (rawData || []).filter((x: any) => getYear(x.date) === state.selectSelectedValue)[0];

            let ratioText = '';
            if (ratio) {
              const ratioNumber = Number(ratio.value).toFixed(2);
              ratioText = `peak/lowest month (${shortMonthName(ratio.category_1)}/${shortMonthName(
                ratio.category_2,
              )}): ${ratioNumber} x visitors`;
            }

            return {
              data: ratioText,
              controls: {
                select: {
                  options: yearsOptions,
                },
              },
            };
          },
        },
      },
      {
        title: 'Domestic (canadian) visitors by origin province',
        description: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula.Sed sodales aliquam nisl eget mollis.Quisque mollis nisi felis, eu convallis purus sagittis sit amet.Sed elementum scelerisque ipsum, at rhoncus eros venenatis at.Donec mattis quis massa ut viverra.In ullamcorper, magna non convallis ultricies. `,
        initialState: {
          switchSelectedValue: 'monthly',
          selectSelectedValue: previousYear,
        },
        fetchData: (state: any) => {
          const indicatorSlug = {
            monthly: 'visits_by_origin_province_monthly',
            quarterly: 'visits_by_origin_province_quarterly',
          }[state.switchSelectedValue];

          return TotaAPI.getSingleIndicator({ slug: indicatorSlug, region: state.selectedRegion.name });
        },
        widget: {
          type: 'charts/bar',
          fetchProps(rawData: IndicatorValue[] = [], state: any): any {
            const yearsOptions = getAvailableYearsOptions(rawData, false);
            const filteredByYear = rawData.filter((x: any) => getYear(x.date) === state.selectSelectedValue);
            const data = mergeRawData({
              rawData: filteredByYear,
              mergeBy: 'date',
              labelKey: 'category_1',
              valueKey: 'value',
            });
            if (state.switchSelectedValue === 'monthly') {
              data.forEach((d: any) => (d.date = shortMonthName(d.date)));
            }
            const bars = getStackedBarsData(data, 'date');

            return {
              data,
              controls: {
                switch: {
                  options: getOptions(['Monthly', 'Quarterly']),
                },
                select: {
                  options: yearsOptions,
                },
              },
              legend: bottomLegend,
              bars,
              xAxis: {
                dataKey: 'date',
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
          selectSelectedValue: previousYear,
        },
        fetchData: () =>
          TotaAPI.getSingleIndicator({
            slug: 'visits_by_origin_city_quarterly',
            region: ['British Columbia', 'Thompson Okanagan'],
          }),
        widget: {
          type: 'charts/bar',
          fetchProps(rawData: IndicatorValue[] = [], state: any): any {
            const yearsOptions = getAvailableYearsOptions(rawData, false);
            const filteredByYear = rawData.filter((x: any) => getYear(x.date) === state.selectSelectedValue);
            const top10 = getTop10AndOthersByYear(filteredByYear, 'category_1');
            const data = mergeRawData({
              rawData: top10,
              mergeBy: 'date',
              labelKey: 'category_1',
              valueKey: 'value',
            });
            const bars = getStackedBarsData(data, 'date');

            return {
              data,
              controls: {
                select: {
                  options: yearsOptions,
                },
              },
              legend: bottomLegend,
              bars,
              xAxis: {
                dataKey: 'date',
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
          selectSelectedValue: previousYear,
        },
        fetchData: (state: any) =>
          TotaAPI.getSingleIndicator({ slug: 'visits_by_prizm_monthly', region: state.selectedRegion.name }),
        widget: {
          type: 'charts/bar',
          fetchProps(rawData: IndicatorValue[] = [], state: any): any {
            const yearsOptions = getAvailableYearsOptions(rawData, false);
            const filteredByYear = rawData.filter((x: any) => getYear(x.date) === state.selectSelectedValue);
            const data = mergeRawData({
              rawData: filteredByYear,
              mergeBy: 'date',
              labelKey: 'category_2',
              valueKey: 'value',
            });
            data.forEach((d: any) => (d.date = shortMonthName(d.date)));
            const bars = getStackedBarsData(data, 'date');

            return {
              data,
              controls: {
                select: {
                  options: yearsOptions,
                },
              },
              chartProps: {
                layout: 'vertical',
              },
              legend: bottomLegend,
              bars,
              xAxis: {
                hide: true,
                type: 'number',
              },
              yAxis: {
                dataKey: 'date',
                type: 'category',
              },
            };
          },
        },
      },
      {
        title: 'Average length of stay of domestic (Canadian) overnight visitors',
        description: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
        initialState: {
          selectSelectedValue: previousYear,
        },
        fetchData: (state: any) =>
          TotaAPI.getSingleIndicator({
            slug: 'nights_per_visitor_by_country_monthly',
            region: [state.selectedRegion.name, state.selectedRegion.parent?.name].filter((x) => x),
          }),
        widget: {
          type: 'charts/composed',
          fetchProps(rawData: IndicatorValue[] = [], state: any): any {
            const yearsOptions = getAvailableYearsOptions(rawData);
            let data = rawData;
            if (state.selectSelectedValue !== 'all_years') {
              data = rawData.filter((x: any) => getYear(x.date) === state.selectSelectedValue);
            }
            let merged = mergeRawData({ rawData: data, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });
            let areas = {};
            const regions = uniq(rawData.map((x) => x.region));
            if (state.selectSelectedValue !== 'all_years') {
              merged.forEach((d: any) => (d.date = shortMonthName(d.date)));
              merged = allMonths.map((month) => ({
                date: month,
                ...(merged.find((d) => d.date === month) || {}),
              }));
              merged.forEach((d: any) => {
                regions.forEach((region: string) => {
                  const valuesForMonth = rawData
                    .filter((rd: any) => rd.region === region && shortMonthName(rd.date) === d.date)
                    .map((rd: any) => rd.value);
                  d[`${region} min-max`] = [Math.min(...valuesForMonth), Math.max(...valuesForMonth)];
                });
              });
              areas = {
                areas: regions.map((region: string) => ({
                  dataKey: `${region} min-max`,
                  fillOpacity: 0.07,
                  stroke: 'none',
                })),
              };
            }

            return {
              data: merged,
              controls: {
                select: {
                  options: yearsOptions,
                },
              },
              legend: bottomLegend,
              ...areas,
              lines: regions.map((x) => ({ dataKey: x })),
              xAxis: {
                dataKey: 'date',
              },
              yAxis: {},
            };
          },
        },
      },
      {
        title: 'Weekly Canadian travel patterns',
        description: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
        initialState: {
          selectSelectedValue: `compared_to_${previousYear}`,
        },
        fetchData: (state: any) =>
          TotaAPI.getSingleIndicator({
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
            let data = rawData.filter((x: any) => x.category_1 === state.selectSelectedValue);
            const allDates = data.map((x) => parseISO(x.date).getTime());
            const months = allMonths.map((x) => new Date(`${thisYear} ${x}`).getTime());
            const minDate = Math.min(...allDates);
            data = data.map((x) => ({ ...x, date: parseISO(x.date).getTime().toString() }));
            const merged = mergeRawData({ rawData: data, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });
            const regions = uniq(rawData.map((x) => x.region)).map((x) => ({ dataKey: x }));
            return {
              data: merged,
              controls: {
                select: {
                  prefix: `${thisYear} Compared to: `,
                  options: yearsOptions,
                },
              },
              legend: bottomLegend,
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
  },
  {
    title: 'Tourism Arrivals & Seasonality',
    slug: 'tourism-arrivals-seasonality',
    sections: [],
  },
  {
    title: 'Tourism Revenues & Expenditures',
    slug: 'tourism-revenues-expenditures',
    sections: [],
  },
  {
    title: 'Indigenous & Accessibility',
    slug: 'indigenous-accessibility',
    sections: [],
  },
  {
    title: 'Climate Change & Mobility',
    slug: 'climate-change-mobility',
    sections: [],
  },
];

export default themes;
