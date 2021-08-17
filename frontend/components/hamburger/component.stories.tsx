import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import Hamburger from './component';
import type { HamburgerProps } from './types';

export default {
  title: 'Components/Hamburger',
  component: Hamburger,
  argTypes: {
    onClick: { action: 'clicked' },
    color: {
      control: {
        type: 'select',
        options: ['white', 'black'],
      },
    },
  },
};

const Template: Story<HamburgerProps> = ({ ...restProps }: HamburgerProps) => <Hamburger {...restProps} />;

export const Default = Template.bind({});
Default.args = {
  className: 'text-black',
  color: 'black',
  isOpen: false,
};
