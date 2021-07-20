import uniq from 'lodash/uniq';
import TotaAPI from 'services/api';
import {
  getAvailableYearsOptions,
  getOptions,
  getStackedBarsData,
  getTop10AndOthers,
  getTop10AndOthersByYear,
  getYear,
  mergeRawData,
} from 'utils/charts';

const commonChartConfig = {
  margin: {
    top: 20,
    right: 0,
    left: 20,
    bottom: 0,
  },
};
const commonPieChartConfig = {
  chartProps: commonChartConfig,
  legend: {
    width: 250,
    layout: 'vertical',
    verticalAlign: 'middle',
    align: 'right',
  },
  tooltip: {},
};

export interface ThemeSectionType {
  title: string;
  subTitle?: string;
  description: string;
  initialState?: any;
  fetchDataKey?: string;
  fetchData?: any;
  widget: any;
}

export interface ThemeType {
  title: string;
  slug: string;
  summary?: string;
  sections: ThemeSectionType[];
}

const monthNameFormatter = new Intl.DateTimeFormat('en', { month: 'short' });
const shortMonthName = (date: string) => monthNameFormatter.format(new Date(date));
const formatPercentage = (value: number) =>
  value.toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2 });
const previousYear = (new Date().getFullYear() - 1).toString();

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
        fetchDataKey: 'indicator-establishments-by-type-all',
        fetchData: () => TotaAPI.getSingleIndicator({ slug: 'establishments_by_type', category_2: 'all' }),
        widget: {
          transformData(rawData: any[], _state: any): any[] {
            return getTop10AndOthers(rawData, 'category_1');
          },
          type: 'charts/pie',
          config: {
            ...commonPieChartConfig,
            pies: [
              {
                nameKey: 'category_1',
                dataKey: 'value',
              },
            ],
          },
        },
      },
      {
        title: 'Biosphere committed & accessible businesses',
        subTitle: '(by type)',
        description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
        fetchDataKey: 'indicator-establishments-by-type',
        fetchData: (state: any) =>
          TotaAPI.getSingleIndicator({ slug: 'establishments_by_type', category_2: state.switchSelectedValue }),
        initialState: {
          switchSelectedValue: 'biosphere',
        },
        widget: {
          transformData(rawData: any[]): any[] {
            return getTop10AndOthers(rawData, 'category_1');
          },
          type: 'charts/pie',
          config: {
            ...commonPieChartConfig,
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
        fetchData: (state: any) => {
          const indicatorSlug = {
            visits: 'visits_by_origin_country_monthly',
            stays: 'stays_by_origin_country_monthly',
            trips: 'trips_by_origin_country_monthly',
          }[state.switchSelectedValue];

          return TotaAPI.getSingleIndicator({
            slug: indicatorSlug,
            region: ['British Columbia', 'Thompson Okanagan'],
            category_1: 'Canada',
          });
        },
        widget: {
          transformData(rawData: any[], state: any): any[] {
            let data = rawData;
            if (state.selectSelectedValue !== 'all_years') {
              data = (rawData || []).filter((x: any) => getYear(x.date) === state.selectSelectedValue);
            }
            const merged = mergeRawData({ rawData: data, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });
            if (state.selectSelectedValue !== 'all_years') {
              merged.forEach((d: any) => (d.date = shortMonthName(d.date)));
            }
            return merged;
          },
          type: 'charts/composed',
          config(data: any[]): any {
            const yearsOptions = getAvailableYearsOptions(data);

            return {
              chartProps: {
                ...commonChartConfig,
              },
              controls: {
                switch: {
                  options: getOptions(['Visits', 'Trips', 'Stays']),
                },
                select: {
                  options: yearsOptions,
                },
              },
              cartesianGrid: {
                vertical: false,
                height: '1px',
                strokeDasharray: '10 5',
              },
              lines: [
                {
                  dataKey: 'Thompson Okanagan',
                },
                {
                  dataKey: 'British Columbia',
                },
              ],
              xAxis: {
                dataKey: 'date',
              },
              yAxis: {},
              tooltip: {},
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

          return TotaAPI.getSingleIndicator({ slug: indicatorSlug, region: 'Thompson Okanagan' });
        },
        widget: {
          transformData(rawData: any[], state: any): any[] {
            let take = 5;
            let formatDate = shortMonthName;

            if (state.switchSelectedValue === 'quarterly') {
              take = 4;
              formatDate = (date) => date;
            }

            return (rawData || [])
              .filter((x: any) => getYear(x.date) === state.selectSelectedValue)
              .sort((a, b) => b['value'] - a['value'])
              .slice(0, take)
              .filter((x) => x)
              .map((x) => `${formatDate(x['date'])}: ${formatPercentage(x['value'])} of visitors`);
          },
          type: 'rank',
          config(data: any[]): any {
            const yearsOptions = getAvailableYearsOptions(data, false);

            return {
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
        fetchData: () =>
          TotaAPI.getSingleIndicator({ slug: 'domestic_visits_peak_lowest_month_ratio', region: 'Thompson Okanagan' }),
        widget: {
          transformData(rawData: any[], state: any): string {
            const ratio = (rawData || []).filter((x: any) => getYear(x.date) === state.selectSelectedValue)[0];
            if (!ratio) return '';

            const ratioNumber = Number(ratio.value).toFixed(2);

            return `peak/lowest month (${shortMonthName(ratio.category_1)}/${shortMonthName(
              ratio.category_2,
            )}): ${ratioNumber} x visitors`;
          },
          type: 'text',
          config(data: any[]): any {
            const yearsOptions = getAvailableYearsOptions(data, false);

            return {
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

          return TotaAPI.getSingleIndicator({ slug: indicatorSlug, region: 'Thompson Okanagan' });
        },
        widget: {
          transformData(rawData: any[], state: any): any[] {
            if (!rawData) return [];

            const filteredByYear = (rawData || []).filter((x: any) => getYear(x.date) === state.selectSelectedValue);
            const merged = mergeRawData({
              rawData: filteredByYear,
              mergeBy: 'date',
              labelKey: 'category_1',
              valueKey: 'value',
            });
            if (state.switchSelectedValue === 'monthly') {
              merged.forEach((d: any) => (d.date = shortMonthName(d.date)));
            }
            return merged;
          },
          type: 'charts/bar',
          config(data: any[], transformedData: any[]): any {
            const yearsOptions = getAvailableYearsOptions(data, false);
            const bars = getStackedBarsData(transformedData, 'date');

            return {
              chartProps: {
                ...commonChartConfig,
              },
              controls: {
                switch: {
                  options: getOptions(['Monthly', 'Quarterly']),
                },
                select: {
                  options: yearsOptions,
                },
              },
              cartesianGrid: {
                vertical: false,
                height: '1px',
                strokeDasharray: '10 5',
              },
              bars,
              xAxis: {
                dataKey: 'date',
              },
              tooltip: { cursor: false },
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
          transformData(rawData: any[], state: any): any[] {
            if (!rawData) return [];

            const filteredByYear = (rawData || []).filter((x: any) => getYear(x.date) === state.selectSelectedValue);
            const top10 = getTop10AndOthersByYear(filteredByYear, 'category_1');

            const merged = mergeRawData({
              rawData: top10,
              mergeBy: 'date',
              labelKey: 'category_1',
              valueKey: 'value',
            });
            return merged;
          },
          type: 'charts/bar',
          config(data: any[], transformedData: any[]): any {
            const yearsOptions = getAvailableYearsOptions(data, false);
            const bars = getStackedBarsData(transformedData, 'date');

            return {
              chartProps: {
                ...commonChartConfig,
              },
              controls: {
                select: {
                  options: yearsOptions,
                },
              },
              cartesianGrid: {
                vertical: false,
                height: '1px',
                strokeDasharray: '10 5',
              },
              bars,
              xAxis: {
                dataKey: 'date',
              },
              tooltip: { cursor: false },
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
        fetchData: () => TotaAPI.getSingleIndicator({ slug: 'visits_by_prizm_monthly', region: 'Thompson Okanagan' }),
        widget: {
          transformData(rawData: any[], state: any): any[] {
            if (!rawData) return [];

            const filteredByYear = (rawData || []).filter((x: any) => getYear(x.date) === state.selectSelectedValue);
            const merged = mergeRawData({
              rawData: filteredByYear,
              mergeBy: 'date',
              labelKey: 'category_2',
              valueKey: 'value',
            });
            merged.forEach((d: any) => (d.date = shortMonthName(d.date)));
            return merged;
          },
          type: 'charts/bar',
          config(data: any[], transformedData: any[]): any {
            const yearsOptions = getAvailableYearsOptions(data, false);
            const bars = getStackedBarsData(transformedData, 'date');

            return {
              controls: {
                select: {
                  options: yearsOptions,
                },
              },
              chartProps: {
                ...commonChartConfig,
                layout: 'vertical',
              },
              cartesianGrid: {
                vertical: false,
                height: '1px',
                strokeDasharray: '10 5',
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
              tooltip: { cursor: false },
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
        fetchData: () =>
          TotaAPI.getSingleIndicator({
            slug: 'nights_per_visitor_by_country_monthly',
            region: ['Thompson Okanagan', 'British Columbia'],
          }),
        widget: {
          transformData(rawData: any[], state: any): any[] {
            let data = rawData;
            if (state.selectSelectedValue !== 'all_years') {
              data = (rawData || []).filter((x: any) => getYear(x.date) === state.selectSelectedValue);
            }
            const merged = mergeRawData({ rawData: data, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });
            if (state.selectSelectedValue !== 'all_years') {
              merged.forEach((d: any) => (d.date = shortMonthName(d.date)));
            }
            return merged;
          },
          type: 'charts/line',
          config(data: any[]): any {
            const yearsOptions = getAvailableYearsOptions(data);

            return {
              chartProps: {
                ...commonChartConfig,
              },
              controls: {
                select: {
                  options: yearsOptions,
                },
              },
              cartesianGrid: {
                vertical: false,
                height: '1px',
                strokeDasharray: '10 5',
              },
              lines: [
                {
                  dataKey: 'Thompson Okanagan',
                },
                {
                  dataKey: 'British Columbia',
                },
              ],
              xAxis: {
                dataKey: 'date',
              },
              yAxis: {},
              tooltip: {},
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
        fetchData: () =>
          TotaAPI.getSingleIndicator({
            slug: 'visits_change_weekly',
            region: ['British Columbia', 'Thompson Okanagan'],
          }),
        widget: {
          transformData(rawData: any[], state: any): any[] {
            const data = (rawData || []).filter((x: any) => x.category_1 === state.selectSelectedValue);
            return mergeRawData({ rawData: data, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });
          },
          type: 'charts/line',
          config(data: any[]): any {
            const yearsOptions = uniq((data || []).map((x: any) => x.category_1))
              .sort()
              .reverse()
              .map((cat1: string) => ({ name: cat1.replace('compared_to_', ''), value: cat1 }));

            return {
              chartProps: {
                ...commonChartConfig,
              },
              controls: {
                select: {
                  label: 'Compared to: ',
                  options: yearsOptions,
                },
              },
              cartesianGrid: {
                vertical: false,
                height: '1px',
                strokeDasharray: '10 5',
              },
              lines: [
                {
                  dataKey: 'Thompson Okanagan',
                },
                {
                  dataKey: 'British Columbia',
                },
              ],
              xAxis: {
                dataKey: 'date',
              },
              yAxis: {},
              tooltip: {},
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
