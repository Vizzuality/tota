import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import Rank from './component';
import { RankProps } from './types';

export default {
  title: 'Components/Widgets/Rank',
  component: Rank,
  argTypes: {},
};

const data = ['50% lorem ipsum dolor', '20% lorem ipsum dolor', '40% lorem ipsum dolor'];

const Template: Story<RankProps> = ({ ...restProps }: RankProps) => <Rank {...restProps} />;

export const Default = Template.bind({});
Default.args = {
  data,
};
