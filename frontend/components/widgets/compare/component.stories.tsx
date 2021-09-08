import React from 'react';
import uniq from 'lodash/uniq';
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
    date: '2020-W38',
    region: 'British Columbia',
    value: 70,
  },
];
// those are fake data not computed
const changeToPreviousYear = {
  'British Columbia': 20.3,
  'Thompson Okanagan': -34.5,
};

const data = mergeForChart({ data: rawData, mergeBy: 'category_1', labelKey: 'region', valueKey: 'value' });
const bars = uniq(rawData.map((rd) => rd.region))
  .sort()
  .map((region) => ({
    dataKey: region,
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
  currentYear: 2020,
  changeToPreviousYear,
  chartConfig: config,
  chartType: 'bar',
};
