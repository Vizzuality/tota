import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import Chart, { ChartProps } from './component';
import { prepareForSankey } from 'utils/charts';

export default {
  title: 'Components/Widgets/Charts/Sankey',
  component: Chart,
  argTypes: {},
};

const rawData = [
  {
    category_1: 'Vancouver, CA',
    category_2: 'Airport 1',
    value: 200,
  },
  {
    category_1: 'Vancouver, CA',
    category_2: 'Airport 2',
    value: 40,
  },
  {
    category_1: 'Vancouver, CA',
    category_2: 'Airport 3',
    value: 400,
  },
  {
    category_1: 'Calgary, CA',
    category_2: 'Airport 1',
    value: 10,
  },
  {
    category_1: 'Calgary, CA',
    category_2: 'Airport 2',
    value: 200,
  },
  {
    category_1: 'Calgary, CA',
    category_2: 'Airport 3',
    value: 200,
  },
  {
    category_1: 'Edmonton, CA',
    category_2: 'Airport 1',
    value: 10,
  },
  {
    category_1: 'Edmonton, CA',
    category_2: 'Airport 2',
    value: 40,
  },
  {
    category_1: 'Edmonton, CA',
    category_2: 'Airport 3',
    value: 345,
  },
];

const sourceColors = ['#314057'];
const targetColors = ['#D98834', '#A3C85A', '#BE328D'];

const data = prepareForSankey({
  rawData,
  sourceKey: 'category_1',
  targetKey: 'category_2',
  valueKey: 'value',
  sourceColors,
  targetColors,
  colorLinksBy: 'target',
});

const config = {
  margin: {
    top: 20,
    right: 0,
    left: 0,
    bottom: 0,
  },
  tooltip: {},
};

const Template: Story<ChartProps> = ({ ...restProps }: ChartProps) => <Chart {...restProps} />;

export const Default = Template.bind({});
Default.args = {
  data,
  config,
};
