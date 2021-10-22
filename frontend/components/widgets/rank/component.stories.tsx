import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import Rank from './component';
import { RankProps } from './types';

export default {
  title: 'Components/Widgets/Rank',
  component: Rank,
  argTypes: {},
};

const data = [
  {
    text: '{value} lorem ipsum dolor',
    value: '50%',
  },
  {
    text: '{value} lorem ipsum dolor',
    value: '40%',
  },
  {
    text: '{value} lorem ipsum dolor',
    value: '30%',
  },
];

const Template: Story<RankProps> = ({ ...restProps }: RankProps) => <Rank {...restProps} />;

export const Default = Template.bind({});
Default.args = {
  data,
};
