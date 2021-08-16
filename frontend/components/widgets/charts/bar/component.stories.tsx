import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import Chart from './component';
import { BarChartProps } from './types';
import { mergeForChart } from 'utils/charts';

export default {
  title: 'Components/Widgets/Charts/Bar',
  component: Chart,
  argTypes: {},
};

const rawData = [
  {
    category_1: 'Yukon',
    category_2: null,
    date: '2019-Q1',
    region: 'Thompson Okanagan',
    value: 1097,
  },
  {
    category_1: 'Saskatchewan',
    category_2: null,
    date: '2019-Q1',
    region: 'Thompson Okanagan',
    value: 10470,
  },
  {
    category_1: 'Québec',
    category_2: null,
    date: '2019-Q1',
    region: 'Thompson Okanagan',
    value: 4060,
  },
  {
    category_1: 'Prince Edward Island',
    category_2: null,
    date: '2019-Q1',
    region: 'Thompson Okanagan',
    value: 140,
  },
  {
    category_1: 'Ontario',
    category_2: null,
    date: '2019-Q1',
    region: 'Thompson Okanagan',
    value: 22433,
  },
  {
    category_1: 'Northwest Territories',
    category_2: null,
    date: '2019-Q1',
    region: 'Thompson Okanagan',
    value: 247,
  },
  {
    category_1: 'Nunavut',
    category_2: null,
    date: '2019-Q1',
    region: 'Thompson Okanagan',
    value: 276,
  },
  {
    category_1: 'Nova Scotia',
    category_2: null,
    date: '2019-Q1',
    region: 'Thompson Okanagan',
    value: 793,
  },
  {
    category_1: 'Newfoundland and Labrador',
    category_2: null,
    date: '2019-Q1',
    region: 'Thompson Okanagan',
    value: 524,
  },
  {
    category_1: 'New Brunswick',
    category_2: null,
    date: '2019-Q1',
    region: 'Thompson Okanagan',
    value: 480,
  },
  {
    category_1: 'Manitoba',
    category_2: null,
    date: '2019-Q1',
    region: 'Thompson Okanagan',
    value: 6092,
  },
  {
    category_1: 'British Columbia',
    category_2: null,
    date: '2019-Q1',
    region: 'Thompson Okanagan',
    value: 303139,
  },
  {
    category_1: 'Yukon',
    category_2: null,
    date: '2019-Q2',
    region: 'Thompson Okanagan',
    value: 2996,
  },
  {
    category_1: 'Saskatchewan',
    category_2: null,
    date: '2019-Q2',
    region: 'Thompson Okanagan',
    value: 17576,
  },
  {
    category_1: 'Québec',
    category_2: null,
    date: '2019-Q2',
    region: 'Thompson Okanagan',
    value: 9855,
  },
  {
    category_1: 'Prince Edward Island',
    category_2: null,
    date: '2019-Q2',
    region: 'Thompson Okanagan',
    value: 205,
  },
  {
    category_1: 'Ontario',
    category_2: null,
    date: '2019-Q2',
    region: 'Thompson Okanagan',
    value: 33504,
  },
  {
    category_1: 'Northwest Territories',
    category_2: null,
    date: '2019-Q2',
    region: 'Thompson Okanagan',
    value: 841,
  },
  {
    category_1: 'Nunavut',
    category_2: null,
    date: '2019-Q2',
    region: 'Thompson Okanagan',
    value: 288,
  },
  {
    category_1: 'Nova Scotia',
    category_2: null,
    date: '2019-Q2',
    region: 'Thompson Okanagan',
    value: 1576,
  },
  {
    category_1: 'Newfoundland and Labrador',
    category_2: null,
    date: '2019-Q2',
    region: 'Thompson Okanagan',
    value: 1636,
  },
  {
    category_1: 'New Brunswick',
    category_2: null,
    date: '2019-Q2',
    region: 'Thompson Okanagan',
    value: 1370,
  },
  {
    category_1: 'Manitoba',
    category_2: null,
    date: '2019-Q2',
    region: 'Thompson Okanagan',
    value: 11748,
  },
  {
    category_1: 'British Columbia',
    category_2: null,
    date: '2019-Q2',
    region: 'Thompson Okanagan',
    value: 643566,
  },
];

const data = mergeForChart({ data: rawData, mergeBy: 'date', labelKey: 'category_1', valueKey: 'value' });
const bars = Array.from(new Set(rawData.map((rd) => rd.category_1))).map((barName) => ({
  dataKey: barName,
  stackId: 1,
}));

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
  xAxis: {
    dataKey: 'date',
  },
  bars: bars,
  tooltip: {},
};

const Template: Story<BarChartProps> = ({ ...restProps }: BarChartProps) => <Chart {...restProps} />;

export const Default = Template.bind({});
Default.args = {
  data,
  ...config,
};
