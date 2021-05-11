import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import IndicatorLink, { IndicatorLinkProps } from './component';

export default {
  title: 'Components/IndicatorLink',
  component: IndicatorLink,
};

const Template: Story<IndicatorLinkProps> = ({ ...restProps }: IndicatorLinkProps) => <IndicatorLink {...restProps} />;

export const Default = Template.bind({});
Default.args = {
  url: '/indicator-1',
  name: 'indicator-1',
  image: 'example.jpeg',
};
