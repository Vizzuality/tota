import { typesOfTourismEstablishments } from './mocks';

export default [
  {
    name: 'Tourism Industry & Arrivals',
    slug: 'tourism-industry-arrivals',
    summary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet.',
    sections: [
      {
        name: 'Types of tourism establishments',
        description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
        data: typesOfTourismEstablishments.data,
        widget: {
          data(rawData: any) {
            const indicatorData = rawData.filter((x) => x.slug === 'establishments_by_type')[0];
            if (!indicatorData) return [];

            return indicatorData['indicator_values'].filter((x) => x['category_2'] === 'all');
          },
          type: 'pie',
          config: {
            margin: {
              top: 20,
              right: 0,
              left: 0,
              bottom: 0,
            },
            pies: [
              {
                nameKey: 'category_1',
              },
            ],
            tooltip: {},
          },
        },
      },
      {
        name: 'Total of tourism establishments',
        description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
      },
      {
        name: 'Monthly domestic (canadian) arrivals to TO (&BC as comparison)',
        description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
      },
      {
        name: 'Quarterly visits by origin city',
        description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
      },
      {
        name: 'Monthly Top 10 PRIZM Clusters per month (number of BC visitors to TO)',
        description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
      },
      {
        name: '% of annual domestic overnight visitors occuring in peak month & quarter',
        description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
      },
    ],
  },
  {
    name: 'Tourism Arrivals & Seasonality',
    slug: 'tourism-arrivals-seasonality',
  },
  {
    name: 'Tourism Revenues & Expenditures',
    slug: 'tourism-revenues-expenditures',
  },
  {
    name: 'Indigenous & Accessibility',
    slug: 'indigenous-accessibility',
  },
  {
    name: 'Climate Change & Mobility',
    slug: 'climate-change-mobility',
  },
];
