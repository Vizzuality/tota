import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import CompareWidget from './component';
import { mergeForChart } from 'utils/charts';
import { CompareProps } from './types';

export default {
  title: 'Components/Widgets/Compare',
  component: CompareWidget,
  argTypes: {},
};

const rawData = [
  {
    category_1: 'Weekday',
    category_2: null,
    date: '2020-W38',
    region: 'Thompson Okanagan',
    value: 54.6,
  },
  {
    category_1: 'Weekday',
    category_2: null,
    date: '2019-W38',
    region: 'Thompson Okanagan',
    value: 47,
  },
  {
    category_1: 'Weekday',
    category_2: null,
    date: '2019-W30',
    region: 'British Columbia',
    value: 43,
  },
  {
    category_1: 'Weekday',
    category_2: null,
    date: '2020-W38',
    region: 'British Columbia',
    value: 49.3,
  },
  {
    category_1: 'Weekend',
    category_2: null,
    date: '2020-W38',
    region: 'Thompson Okanagan',
    value: 56.4,
  },
  {
    category_1: 'Weekend',
    category_2: null,
    date: '2019-W38',
    region: 'Thompson Okanagan',
    value: 67.3,
  },
  {
    category_1: 'Weekend',
    category_2: null,
    date: '2020-W38',
    region: 'British Columbia',
    value: 70,
  },
  {
    category_1: 'Weekend',
    category_2: null,
    date: '2019-W38',
    region: 'British Columbia',
    value: 75,
  },
];
// those are fake data not computed
const dataDifference = [-13.4, 23.5];

const currentRawData = rawData.filter((x) => x.date.includes('2020'));
const previousRawData = rawData.filter((x) => x.date.includes('2019'));

const data = mergeForChart({ data: currentRawData, mergeBy: 'category_1', labelKey: 'region', valueKey: 'value' });
const previousYearData = mergeForChart({
  data: previousRawData,
  mergeBy: 'category_1',
  labelKey: 'region',
  valueKey: 'value',
});
const bars = Array.from(new Set(rawData.map((rd) => rd.region))).map((barName) => ({
  dataKey: barName,
}));

const config = {
  xAxis: {
    dataKey: 'category_1',
  },
  bars: bars,
};

const Template: Story<CompareProps> = ({ ...restProps }: CompareProps) => <CompareWidget {...restProps} />;

export const Default = Template.bind({});
Default.args = {
  data,
  previousYearData,
  currentYear: 2020,
  dataDifference,
  chartConfig: config,
  chartType: 'bar',
};
