import React, { useState } from 'react';
import { Story } from '@storybook/react/types-6-0';
import Tabs from './component';
import type { TabsProps } from './types';

export default {
  title: 'Components/Tabs',
  component: Tabs,
};

const Template: Story<TabsProps> = (args) => {
  const [selectedValue, setSelectedValue] = useState(args.selectedValue);

  return <Tabs {...args} selectedValue={selectedValue} onChange={(v) => setSelectedValue(v)} />;
};

const options = [
  {
    name: 'Trips',
    value: 'trips',
  },
  {
    name: 'Stays',
    value: 'stays',
  },
  {
    name: 'Visits',
    value: 'visits',
  },
];

export const Default = Template.bind({});
Default.args = {
  options,
  selectedValue: 'trips',
};
