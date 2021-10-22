import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import Chart from './component';
import type { TreemapChartProps } from './types';

export default {
  title: 'Components/Widgets/Charts/Treemap',
  component: Chart,
  argTypes: {},
};

const data = [
  {
    name: 'Thompson Okanagan',
    value: 200,
    color: '#76ACA9',
  },
  {
    name: 'Northern BC',
    value: 40,
    color: '#A9B937',
  },
  {
    name: 'Kootenay Rockies',
    value: 400,
    color: '#405E62',
  },
  {
    name: 'Vancouver Island',
    value: 50,
    color: '#4F91CD',
  },
  {
    name: 'Cariboo Chilcotin Coast',
    value: 200,
    color: '#9B6014',
  },
];

const config = {};

const Template: Story<TreemapChartProps> = ({ ...restProps }: TreemapChartProps) => (
  <div style={{ maxWidth: 700 }}>
    {' '}
    <Chart {...restProps} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  data,
  config,
};
