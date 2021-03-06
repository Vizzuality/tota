import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import Chart from './component';
import { ComposedChartProps } from './types';
import { mergeForChart } from 'utils/charts';

export default {
  title: 'Components/Widgets/Charts/Composed',
  component: Chart,
  argTypes: {},
};

const rawData = [
  {
    date: '2020-11',
    region: 'Thompson Okanagan',
    value: 775,
  },
  {
    date: '2020-12',
    region: 'Thompson Okanagan',
    value: 294,
  },
  {
    date: '2021-1',
    region: 'Thompson Okanagan',
    value: 924,
  },
  {
    date: '2021-2',
    region: 'Thompson Okanagan',
    value: 0,
  },
  {
    date: '2020-11',
    region: 'British Columbia',
    value: 2354,
  },
  {
    date: '2020-12',
    region: 'British Columbia',
    value: 2377,
  },
  {
    date: '2021-1',
    region: 'British Columbia',
    value: 2505,
  },
  {
    date: '2021-2',
    region: 'British Columbia',
    value: 2947,
  },
];

const data = mergeForChart({ data: rawData, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });

const config = {
  margin: {
    top: 20,
    right: 0,
    left: 0,
    bottom: 0,
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
};

const Template: Story<ComposedChartProps> = ({ ...restProps }: ComposedChartProps) => <Chart {...restProps} />;

export const Default = Template.bind({});
Default.args = {
  data,
  ...config,
};
