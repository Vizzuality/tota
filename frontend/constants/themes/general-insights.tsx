import { ThemeType } from 'types';
import { getOptions } from 'utils/charts';

const theme: ThemeType = {
  title: 'General Insights',
  slug: 'general-insights',
  summary:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet.',
  sections: [
    {
      title: 'Population',
      description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
      initialState: {
        year: '2020',
      },
      fetchParams: () => null,
      widget: {
        type: 'map',
        fetchProps(): any {
          return {
            data: 'Data placeholder',
            controls: [{ type: 'select', side: 'right', name: 'year', options: getOptions(['2019', '2020', '2021']) }],
            featureTooltip: (feature: any) => {
              return (
                <>
                  <div className="bg-blue9 py-2 px-4 text-white flex flex-row justify-between">
                    <div>Popup for {feature.properties.TOURISM_REGION_NAME} </div>
                  </div>
                  <div className="px-4 py-2" >
                    Custom data
                  </div>
                </>
              );
            }
          };
        },
      },
    },
    {
      title: 'Tourism contribution to (local) GDP',
      description: `
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
      fetchParams: () => null,
      widget: {
        type: 'text',
        fetchProps(): any {
          return {
            data: 'Data placeholder',
          };
        },
      },
    },
    {
      title: 'Employment',
      description: `
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
      fetchParams: () => null,
      widget: {
        type: 'text',
        fetchProps(): any {
          return {
            data: 'Data placeholder',
          };
        },
      },
    },
    {
      title: 'Tourism revenue',
      description: `
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
      fetchParams: () => null,
      widget: {
        type: 'text',
        fetchProps(): any {
          return {
            data: 'Data placeholder',
          };
        },
      },
    },
  ],
};

export default theme;
