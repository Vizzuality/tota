import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import Button, { ButtonProps } from './component';

export default {
  title: 'Components/Button',
  component: Button,
};

const Template: Story<ButtonProps> = ({ children, ...args }: ButtonProps) => <Button {...args}>{children}</Button>;

export const Default = Template.bind({});
Default.args = {
  children: 'Button',
  disabled: false,
};
