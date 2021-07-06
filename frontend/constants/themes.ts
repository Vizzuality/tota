import TotaAPI from 'services/api';
import { mergeRawData, getAvailableYearsOptions } from 'utils/charts';

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

const PROVINCES = [
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Nova Scotia',
  'Nunavut',
  'Northwest Territories',
  'Ontario',
  'Prince Edward Island',
  'Québec',
  'Saskatchewan',
  'Yukon',
];

const themes: ThemeType[] = [
  {
    title: 'Tourism Industry & Arrivals',
    slug: 'tourism-industry-arrivals',
    summary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet.',
    sections: [
      {
        title: 'Types of tourism establishments',
        subTitle: '(by type)',
        description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
        fetchDataKey: 'indicator-establishments-by-type',
        fetchData: () => TotaAPI.get('indicators?filter[slug]=establishments_by_type'),
        initialState: {
          switchSelectedValue: 'all',
        },
        widget: {
          transformData(rawData: any[], state: any): any[] {
            if (!rawData) return [];

            const indicatorData = rawData.filter((x: any) => x.slug === 'establishments_by_type')[0];
            if (!indicatorData) return [];

            return indicatorData['indicator_values'].filter((x: any) => x['category_2'] === state.switchSelectedValue);
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
                    name: 'All',
                    value: 'all',
                  },
                ],
              },
            },
            pies: [
              {
                nameKey: 'category_1',
                innerRadius: '50%',
                outerRadius: '70%',
              },
            ],
            tooltip: {},
          },
        },
      },
      {
        title: 'Distinguished tourism establishments',
        description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
        fetchDataKey: 'indicator-establishments-by-type',
        fetchData: () => TotaAPI.get('indicators?filter[slug]=establishments_by_type'),
        widget: {
          transformData(rawData: any[]): any[] {
            if (!rawData) return [];

            const indicatorData = rawData.filter((x: any) => x.slug === 'establishments_by_type')[0];
            if (!indicatorData) return [];

            return indicatorData['indicator_values'].filter((x: any) => x['category_2'] === 'biosphere');
          },
          type: 'charts/pie',
          config: {
            ...commonChartConfig,
            pies: [
              {
                nameKey: 'category_1',
                innerRadius: '50%',
                outerRadius: '70%',
              },
            ],
            tooltip: {},
          },
        },
      },
      {
        title: 'Monthly domestic (canadian) arrivals',
        description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
        initialState: {
          switchSelectedValue: 'visits',
        },
        fetchData: (state: any) => {
          const indicatorSlug = {
            visits: 'visits_by_origin_country_monthly',
            stays: 'stays_by_origin_country_monthly',
            trips: 'trips_by_origin_country_monthly',
          }[state.switchSelectedValue];

          return TotaAPI.get(
            `indicators?filter[slug]=${indicatorSlug}&filter[indicator_values.region]=${encodeURIComponent(
              'British Columbia,Thompson Okanagan',
            )}`,
          ).then((data) => data.filter((x: any) => x.slug === indicatorSlug)[0]?.['indicator_values'] || []);
        },
        widget: {
          transformData(rawData: any[]): any[] {
            return mergeRawData({ rawData, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });
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
        fetchData: () =>
          Promise.resolve([
            {
              position: 1,
              value: '30% ipsum lalala',
            },
            {
              position: 2,
              value: '40% ipsum lalala',
            },
            {
              position: 3,
              value: '30% ipsum lalala',
            },
          ]),
        widget: {
          // transformData(rawData: any[]): any[] {
          //   if (!rawData) return [];

          //   const indicatorData = rawData.filter((x: any) => x.slug === 'trips_by_origin_monthly')[0];
          //   if (!indicatorData) return [];
          //   const indicatorValues = indicatorData['indicator_values'];

          //   return mergeRawData({ rawData: indicatorValues, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });
          // },
          type: 'rank',
          config: {},
        },
      },
      {
        title: 'Domestic (canadian) visitors by origin province',
        description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
        fetchData: () =>
          TotaAPI.get(
            `indicators?filter[slug]=visits_by_origin_province_quarterly&filter[indicator_values.region]=${encodeURIComponent(
              'British Columbia,Thompson Okanagan',
            )}`,
          ).then((data) => {
            const indicatorData = data.filter((x: any) => x.slug === 'visits_by_origin_province_quarterly')[0];
            if (!indicatorData) return [];
            return indicatorData['indicator_values'].filter((x: any) => PROVINCES.includes(x['category_1']));
          }),
        widget: {
          transformData(rawData: any[]): any[] {
            if (!rawData) return [];

            return mergeRawData({
              rawData,
              mergeBy: 'date',
              labelKey: 'category_1',
              valueKey: 'value',
            });
          },
          type: 'charts/bar',
          config(data: any[]): any {
            const bars =
              data &&
              data.length &&
              Array.from(new Set(data.map((rd) => rd.category_1))).map((barName) => ({
                dataKey: barName,
                stackId: 1,
              }));

            return {
              ...commonChartConfig,
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
        description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
        fetchData: () =>
          TotaAPI.get(
            `indicators?filter[slug]=visits_by_origin_city_quarterly&filter[indicator_values.region]=${encodeURIComponent(
              'British Columbia,Thompson Okanagan',
            )}`,
          ).then((data) => {
            const indicatorData = data.filter((x: any) => x.slug === 'visits_by_origin_city_quarterly')[0];
            if (!indicatorData) return [];
            return indicatorData['indicator_values'].filter((x: any) => !PROVINCES.includes(x['category_1']));
          }),
        widget: {
          transformData(rawData: any[]): any[] {
            if (!rawData) return [];

            return mergeRawData({
              rawData,
              mergeBy: 'date',
              labelKey: 'category_1',
              valueKey: 'value',
            });
          },
          type: 'charts/bar',
          config(data: any[]): any {
            const bars =
              data &&
              data.length &&
              Array.from(new Set(data.map((rd) => rd.category_1))).map((barName) => ({
                dataKey: barName,
                stackId: 1,
              }));

            return {
              ...commonChartConfig,
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
