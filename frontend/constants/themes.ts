import { typesOfTourismEstablishments } from './mocks';
import TotaAPI from 'services/api';

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
  fetchData?: any;
  data?: any;
  widget: any;
}

export interface ThemeType {
  title: string;
  slug: string;
  summary?: string;
  sections: ThemeSectionType[];
}

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
        data: typesOfTourismEstablishments.data,
        fetchData: () => TotaAPI.get('indicators?filter[slug]=establishments_by_type'),
        widget: {
          transformData(rawData: any[]): any[] {
            if (!rawData) return [];

            const indicatorData = rawData.filter((x: any) => x.slug === 'establishments_by_type')[0];
            if (!indicatorData) return [];

            return indicatorData['indicator_values'].filter((x: any) => x['category_2'] === 'all');
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
        title: 'Distinguished tourism establishments',
        description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
        data: typesOfTourismEstablishments.data,
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
        data: null,
        widget: {},
      },
      {
        title: 'Quarterly visits by origin city',
        description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
        data: null,
        widget: {},
      },
      {
        title: 'Monthly Top 10 PRIZM Clusters per month (number of BC visitors to TO)',
        description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
        data: null,
        widget: {},
      },
      {
        title: '% of annual domestic overnight visitors occuring in peak month & quarter',
        description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
        data: [
          {
            position: 1,
            value: '50 % lorem ipsum dolor',
          },
          {
            position: 2,
            value: '30 % lorem ipsum dolor',
          },
          {
            position: 3,
            value: '30 % lorem ipsum dolor',
          },
        ],
        widget: {
          type: 'rank',
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
