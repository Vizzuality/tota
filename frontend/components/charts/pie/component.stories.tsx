import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import Chart, { ChartProps } from './component';

export default {
  title: 'Components/Charts/Pie',
  component: Chart,
  argTypes: {},
};

const data = [
  {
    category_1: 'British Columbia',
    category_2: 'Boomer Bliss',
    date: '2020-1',
    region: 'Thompson Okanagan',
    value: 3,
  },
  {
    category_1: 'British Columbia',
    category_2: 'Just Getting By',
    date: '2020-1',
    region: 'Thompson Okanagan',
    value: 3,
  },
  {
    category_1: 'British Columbia',
    category_2: 'Savvy Seniors',
    date: '2020-1',
    region: 'Thompson Okanagan',
    value: 3,
  },
  {
    category_1: 'British Columbia',
    category_2: 'Family Mode',
    date: '2020-1',
    region: 'Thompson Okanagan',
    value: 4,
  },
  {
    category_1: 'British Columbia',
    category_2: 'Suburban Recliners',
    date: '2020-1',
    region: 'Thompson Okanagan',
    value: 4,
  },
  {
    category_1: 'British Columbia',
    category_2: 'Down to Earth',
    date: '2020-1',
    region: 'Thompson Okanagan',
    value: 4,
  },
  {
    category_1: 'British Columbia',
    category_2: 'Scenic Retirement',
    date: '2020-1',
    region: 'Thompson Okanagan',
    value: 5,
  },
  {
    category_1: 'British Columbia',
    category_2: 'Suburban Sports',
    date: '2020-1',
    region: 'Thompson Okanagan',
    value: 7,
  },
  {
    category_1: 'British Columbia',
    category_2: 'Backcountry Boomers',
    date: '2020-1',
    region: 'Thompson Okanagan',
    value: 7,
  },
];

const config = {
  margin: {
    top: 20,
    right: 0,
    left: 0,
    bottom: 0,
  },
  pies: [
    {
      nameKey: 'category_2',
    },
  ],
  tooltip: {},
};

const Template: Story<ChartProps> = ({ ...restProps }: ChartProps) => <Chart {...restProps} />;

export const Default = Template.bind({});
Default.args = {
  data,
  config,
};
