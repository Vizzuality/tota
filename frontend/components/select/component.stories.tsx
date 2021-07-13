import React, { useState } from 'react';
import { Story } from '@storybook/react/types-6-0';
import Select, { SelectProps } from './component';

export default {
  title: 'Components/Select',
  component: Select,
};

const Template: Story<SelectProps> = (args) => {
  const [selectedValue, setSelectedValue] = useState(args.selectedValue);

  return <Select {...args} selectedValue={selectedValue} onChange={(v) => setSelectedValue(v)} />;
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
