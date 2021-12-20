import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import CompareWidget from './component';
import { CompareProps } from './types';

export default {
  title: 'Components/Widgets/Compare',
  component: CompareWidget,
  argTypes: {},
};

const data = [
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
  {
    category_1: 'Weekend Change',
    region: 'British Columbia',
    date: '2020-W38',
    value: 20.3,
  },
  {
    category_1: 'Weekend Change',
    region: 'Thompson Okanagan',
    date: '2020-W38',
    value: 20.3,
  },
  {
    category_1: 'Weekday Change',
    region: 'Thompson Okanagan',
    date: '2020-W38',
    value: 20.3,
  },
  {
    category_1: 'Weekday Change',
    region: 'British Columbia',
    date: '2020-W38',
    value: -34.5,
  },
];

const Template: Story<CompareProps> = ({ ...restProps }: CompareProps) => <CompareWidget {...restProps} />;

export const Default = Template.bind({});
Default.args = {
  data,
  currentYear: 2020,
  changeMap: {
    'Weekday Change': 'Weekday',
    'Weekend Change': 'Weekend',
  },
  unit: '$',
  mergeBy: 'category_1',
  labelKey: 'region',
  valueKey: 'value',
};
