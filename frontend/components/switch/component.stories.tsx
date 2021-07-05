import React, { useState } from 'react';
import { Story } from '@storybook/react/types-6-0';
import Switch, { SwitchProps } from './component';

export default {
  title: 'Components/Switch',
  component: Switch,
};

const Template: Story<SwitchProps> = (args) => {
  const [selectedValue, setSelectedValue] = useState(args.selectedValue);

  return <Switch {...args} selectedValue={selectedValue} onChange={(v) => setSelectedValue(v)} />;
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
