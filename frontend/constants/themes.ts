import { typesOfTourismEstablishments } from './mocks';

const commonChartConfig = {
  margin: {
    top: 20,
    right: 0,
    left: 0,
    bottom: 0,
  },
};

export default [
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
        widget: {
          data(rawData: any) {
            const indicatorData = rawData.filter((x: any) => x.slug === 'establishments_by_type')[0];
            if (!indicatorData) return [];

            return indicatorData['indicator_values'].filter((x: any) => x['category_2'] === 'all');
          },
          type: 'pie',
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
        widget: {
          data(rawData: any) {
            const indicatorData = rawData.filter((x: any) => x.slug === 'establishments_by_type')[0];
            if (!indicatorData) return [];

            return indicatorData['indicator_values'].filter((x: any) => x['category_2'] === 'biosphere');
          },
          type: 'pie',
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
        data: [],
        widget: {},
      },
      {
        title: 'Quarterly visits by origin city',
        description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
        data: [],
        widget: {},
      },
      {
        title: 'Monthly Top 10 PRIZM Clusters per month (number of BC visitors to TO)',
        description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
        data: [],
        widget: {},
      },
      {
        title: '% of annual domestic overnight visitors occuring in peak month & quarter',
        description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
        data: [],
        widget: {},
      },
    ],
  },
  {
    title: 'Tourism Arrivals & Seasonality',
    slug: 'tourism-arrivals-seasonality',
  },
  {
    title: 'Tourism Revenues & Expenditures',
    slug: 'tourism-revenues-expenditures',
  },
  {
    title: 'Indigenous & Accessibility',
    slug: 'indigenous-accessibility',
  },
  {
    title: 'Climate Change & Mobility',
    slug: 'climate-change-mobility',
  },
];
