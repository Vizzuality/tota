import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import Chart from './component';
import type { SankeyChartProps } from './types';

export default {
  title: 'Components/Widgets/Charts/Sankey',
  component: Chart,
  argTypes: {},
};

const data = [
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

const config = {
  margin: {
    top: 20,
    right: 0,
    left: 0,
    bottom: 0,
  },
  sourceKey: 'category_1',
  targetKey: 'category_2',
  valueKey: 'value',
  sourceColors,
  targetColors,
  colorLinksBy: 'target',
  tooltip: {},
};

const Template: Story<SankeyChartProps> = ({ ...restProps }: SankeyChartProps) => <Chart {...restProps} />;

export const Default = Template.bind({});
Default.args = {
  data,
  config,
};
