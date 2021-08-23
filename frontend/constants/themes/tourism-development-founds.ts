import { ThemeType } from 'types';
import { getOptions } from 'utils/charts';

import mountains2Image from 'images/home/image-mountains2.png';

const theme: ThemeType = {
  title: 'Tourism Development Funds',
  slug: 'tourism-development-funds',
  image: mountains2Image,
  sections: [{
    title: 'Volume and projects by region',
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
        };
      },
    },
  },],
};

export default theme;
