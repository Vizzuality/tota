import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import Rank, { RankProps } from './component';

export default {
  title: 'Components/Widgets/Rank',
  component: Rank,
  argTypes: {},
};

const data = [
  {
    position: 1,
    value: '50% lorem ipsum dolor',
  },
  {
    position: 2,
    value: '20% lorem ipsum dolor',
  },
  {
    position: 3,
    value: '40% lorem ipsum dolor',
  },
];

const Template: Story<RankProps> = ({ ...restProps }: RankProps) => <Rank {...restProps} />;

export const Default = Template.bind({});
Default.args = {
  data,
};
