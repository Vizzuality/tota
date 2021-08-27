import React, { useState } from 'react';
import { Story } from '@storybook/react/types-6-0';
import Switch from './component';
import type { SwitchProps } from './types';

export default {
  title: 'Components/Switch',
  component: Switch,
};

const Template: Story<SwitchProps> = (args) => {
  const [checked, setChecked] = useState(args.checked);

  return <Switch {...args} checked={checked} onChange={(v) => setChecked(v)} />;
};

export const Default = Template.bind({});

Default.args = {};
