import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import Text, { TextProps } from './component';

export default {
  title: 'Components/Widgets/Text',
  component: Text,
  argTypes: {},
};

const data = '50% lorem ipsum dolor';

const Template: Story<TextProps> = ({ ...restProps }: TextProps) => <Text {...restProps} />;

export const Default = Template.bind({});
Default.args = {
  data,
};
