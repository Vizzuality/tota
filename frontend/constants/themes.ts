import TotaAPI from 'services/api';
import { mergeRawData, getTop10AndOthers, getTop10AndOthersByDate, getAvailableYearsOptions } from 'utils/charts';

const commonChartConfig = {
  margin: {
    top: 20,
    right: 0,
    left: 0,
    bottom: 0,
  },
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
        fetchData: () =>
          TotaAPI.get('indicators?filter[slug]=establishments_by_type&filter[indicator_values.category_2]=all').then(
            (data) => data.filter((x: any) => x.slug === 'establishments_by_type')[0]?.['indicator_values'] || [],
          ),
        widget: {
          transformData(rawData: any[], _state: any): any[] {
            return getTop10AndOthers(rawData, 'category_1');
          },
          type: 'charts/pie',
          config: {
            ...commonChartConfig,
            pies: [
              {
                nameKey: 'category_1',
                dataKey: 'value',
                innerRadius: '50%',
                outerRadius: '70%',
                label: true,
              },
            ],
            legend: {
              width: 250,
              layout: 'vertical',
              verticalAlign: 'middle',
              align: 'right',
            },
            tooltip: {},
          },
        },
      },
      {
        title: 'Biosphere committed & accessible businesses',
        subTitle: '(by type)',
        description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
        fetchDataKey: 'indicator-establishments-by-type',
        fetchData: () =>
          TotaAPI.get('indicators?filter[slug]=establishments_by_type').then(
            (data) => data.filter((x: any) => x.slug === 'establishments_by_type')[0]?.['indicator_values'] || [],
          ),
        initialState: {
          switchSelectedValue: 'biosphere',
        },
        widget: {
          transformData(rawData: any[], state: any): any[] {
            const data = rawData?.filter((x: any) => x['category_2'] === state.switchSelectedValue);
            return getTop10AndOthers(data, 'category_1');
          },
          type: 'charts/pie',
          config: {
            ...commonChartConfig,
            controls: {
              switch: {
                options: [
                  {
                    name: 'Biosphere',
                    value: 'biosphere',
                  },
                  {
                    name: 'Accessibility',
                    value: 'accessibility',
                  },
                ],
              },
            },
            pies: [
              {
                nameKey: 'category_1',
                dataKey: 'value',
                innerRadius: '50%',
                outerRadius: '70%',
              },
            ],
            legend: {
              width: 250,
              layout: 'vertical',
              verticalAlign: 'middle',
              align: 'right',
            },
            tooltip: {},
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

          return TotaAPI.get(
            `indicators?
               filter[slug]=${indicatorSlug}&
               filter[indicator_values.region]=${encodeURIComponent('British Columbia,Thompson Okanagan')}&
               filter[indicator_values.category_1]=Canada`,
          ).then((data) => data.filter((x: any) => x.slug === indicatorSlug)[0]?.['indicator_values'] || []);
        },
        widget: {
          transformData(rawData: any[], state: any): any[] {
            let data = rawData;
            if (state.selectSelectedValue !== 'all_years') {
              data = (rawData || []).filter(
                (x: any) => new Date(x['date']).getFullYear().toString() === state.selectSelectedValue,
              );
            }
            return mergeRawData({ rawData: data, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });
          },
          type: 'charts/line',
          config(data: any[]): any {
            const yearsOptions = getAvailableYearsOptions(data);

            return {
              ...commonChartConfig,
              controls: {
                switch: {
                  options: [
                    {
                      name: 'Visits',
                      value: 'visits',
                    },
                    {
                      name: 'Trips',
                      value: 'trips',
                    },
                    {
                      name: 'Stays',
                      value: 'stays',
                    },
                  ],
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
                  type: 'monotone',
                  dataKey: 'Thompson Okanagan',
                },
                {
                  type: 'monotone',
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

          return TotaAPI.get(
            `indicators?filter[slug]=${indicatorSlug}&filter[indicator_values.region]=${encodeURIComponent(
              'Thompson Okanagan',
            )}`,
          ).then((data) => data.filter((x: any) => x.slug === indicatorSlug)[0]?.['indicator_values'] || []);
        },
        widget: {
          transformData(rawData: any[], state: any): any[] {
            let take = 5;
            let formatDate = (date) => monthNameFormatter.format(new Date(date));

            if (state.switchSelectedValue === 'quarterly') {
              take = 4;
              formatDate = (date) => date;
            }

            return (rawData || [])
              .filter(
                (x: any) =>
                  new Date(x['date'].replace(/Q\d/, '')).getFullYear().toString() === state.selectSelectedValue,
              )
              .sort((a, b) => b['value'] - a['value'])
              .slice(0, take)
              .filter((x) => x)
              .map((x, index) => ({
                position: index + 1,
                value: `${formatDate(x['date'])}:  ${formatPercentage(x['value'])} of visitors`,
              }));
          },
          type: 'rank',
          config(data: any[]): any {
            const yearsOptions = getAvailableYearsOptions(data, false);

            return {
              controls: {
                switch: {
                  options: [
                    {
                      name: 'Monthly',
                      value: 'monthly',
                    },
                    {
                      name: 'Quarterly',
                      value: 'quarterly',
                    },
                  ],
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
        fetchData: (_state: any) => {
          return TotaAPI.get(
            `indicators?filter[slug]=domestic_visits_peak_lowest_month_ratio&filter[indicator_values.region]=${encodeURIComponent(
              'Thompson Okanagan',
            )}`,
          ).then(
            (data) =>
              data.filter((x: any) => x.slug === 'domestic_visits_peak_lowest_month_ratio')[0]?.['indicator_values'] ||
              [],
          );
        },
        widget: {
          transformData(rawData: any[], state: any): string {
            const ratio = (rawData || []).filter(
              (x: any) => new Date(x['date'].replace(/Q\d/, '')).getFullYear().toString() === state.selectSelectedValue,
            )[0];
            const formatDate = (date) => monthNameFormatter.format(new Date(date));

            if (!ratio) return '';

            const ratioNumber = Number(ratio.value).toFixed(2);

            return `peak/lowest month (${formatDate(ratio.category_1)}/${formatDate(
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

          return TotaAPI.get(
            `indicators?filter[slug]=${indicatorSlug}&filter[indicator_values.region]=${encodeURIComponent(
              'Thompson Okanagan',
            )}`,
          ).then((data) => data.filter((x: any) => x.slug === indicatorSlug)[0]?.['indicator_values'] || []);
        },
        widget: {
          transformData(rawData: any[], state: any): any[] {
            if (!rawData) return [];

            const filteredByYear = (rawData || []).filter(
              (x: any) => new Date(x['date'].replace(/Q\d/, '')).getFullYear().toString() === state.selectSelectedValue,
            );

            return mergeRawData({
              rawData: filteredByYear,
              mergeBy: 'date',
              labelKey: 'category_1',
              valueKey: 'value',
            });
          },
          type: 'charts/bar',
          config(data: any[], transformedData: any[]): any {
            const yearsOptions = getAvailableYearsOptions(data, false);
            const provinces = transformedData
              .map((x) => Object.keys(x))
              .flat()
              .filter((x) => x !== 'date');

            const bars =
              data &&
              data.length &&
              Array.from(new Set(provinces)).map((barName) => ({
                dataKey: barName,
                stackId: 1,
              }));

            return {
              ...commonChartConfig,
              controls: {
                switch: {
                  options: [
                    {
                      name: 'Monthly',
                      value: 'monthly',
                    },
                    {
                      name: 'Quarterly',
                      value: 'quarterly',
                    },
                  ],
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
              tooltip: {},
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
          TotaAPI.get(
            `indicators?filter[slug]=visits_by_origin_city_quarterly&filter[indicator_values.region]=${encodeURIComponent(
              'British Columbia,Thompson Okanagan',
            )}`,
          ).then(
            (data) =>
              data.filter((x: any) => x.slug === 'visits_by_origin_city_quarterly')[0]?.['indicator_values'] || [],
          ),
        widget: {
          transformData(rawData: any[], state: any): any[] {
            if (!rawData) return [];

            const filteredByYear = (rawData || []).filter(
              (x: any) => new Date(x['date'].replace(/Q\d/, '')).getFullYear().toString() === state.selectSelectedValue,
            );
            const top10 = getTop10AndOthersByDate(filteredByYear, 'category_1');
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
            const cities = transformedData
              .map((x) => Object.keys(x))
              .flat()
              .filter((x) => x !== 'date');

            const bars =
              data &&
              data.length &&
              Array.from(new Set(cities)).map((barName) => ({
                dataKey: barName,
                stackId: 1,
              }));

            return {
              ...commonChartConfig,
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
              tooltip: {},
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
        fetchData: () =>
          TotaAPI.get(
            `indicators?filter[slug]=visits_by_prizm_monthly&filter[indicator_values.region]=${encodeURIComponent(
              'Thompson Okanagan',
            )}`,
          ).then(
            (data) => data.filter((x: any) => x.slug === 'visits_by_prizm_monthly')[0]?.['indicator_values'] || [],
          ),
        widget: {
          transformData(rawData: any[], state: any): any[] {
            if (!rawData) return [];

            const filteredByYear = (rawData || []).filter(
              (x: any) => new Date(x['date'].replace(/Q\d/, '')).getFullYear().toString() === state.selectSelectedValue,
            );

            return mergeRawData({
              rawData: filteredByYear,
              mergeBy: 'date',
              labelKey: 'category_2',
              valueKey: 'value',
            });
          },
          type: 'charts/bar',
          config(data: any[], transformedData: any[]): any {
            const yearsOptions = getAvailableYearsOptions(data, false);
            const prizm = transformedData
              .map((x) => Object.keys(x))
              .flat()
              .filter((x) => x !== 'date');

            const bars =
              data &&
              data.length &&
              Array.from(new Set(prizm)).map((barName) => ({
                dataKey: barName,
                stackId: 1,
              }));

            return {
              ...commonChartConfig,
              controls: {
                select: {
                  options: yearsOptions,
                },
              },
              chartProps: {
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
              tooltip: {},
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
        fetchData: (_state: any) => {
          return TotaAPI.get(
            `indicators?filter[slug]=domestic_visits_peak_lowest_month_ratio&filter[indicator_values.region]=${encodeURIComponent(
              'Thompson Okanagan',
            )}`,
          ).then(
            (data) =>
              data.filter((x: any) => x.slug === 'domestic_visits_peak_lowest_month_ratio')[0]?.['indicator_values'] ||
              [],
          );
        },
        widget: {
          transformData() {
            return 'Work in progress';
          },
          type: 'text',
          config: {},
        },
      },
      {
        title: 'Weekly Canadian travel patterns',
        description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
        initialState: {
          selectSelectedValue: 'all_years',
        },
        fetchData: (state: any) => {
          const indicatorSlug = 'visits_change_weekly';

          return TotaAPI.get(
            `indicators?filter[slug]=${indicatorSlug}&filter[indicator_values.region]=${encodeURIComponent(
              'British Columbia,Thompson Okanagan',
            )}`,
          ).then((data) => data.filter((x: any) => x.slug === indicatorSlug)[0]?.['indicator_values'] || []);
        },
        widget: {
          transformData(rawData: any[], state: any): any[] {
            let data = rawData;
            if (state.selectSelectedValue !== 'all_years') {
              data = (rawData || []).filter(
                (x: any) =>
                  new Date(x['date'].replace(/W\d\d/, '')).getFullYear().toString() === state.selectSelectedValue,
              );
            }
            return mergeRawData({ rawData: data, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });
          },
          type: 'charts/line',
          config(data: any[]): any {
            const yearsOptions = getAvailableYearsOptions(data);

            return {
              ...commonChartConfig,
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
                  type: 'monotone',
                  dataKey: 'Thompson Okanagan',
                },
                {
                  type: 'monotone',
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
