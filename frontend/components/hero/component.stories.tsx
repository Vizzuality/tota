import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import Hero, { HeroProps } from './component';

export default {
  title: 'Components/Hero',
  component: Hero,
};

const Template: Story<HeroProps> = ({ ...restProps }: HeroProps) => <Hero {...restProps} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Hero title',
  subtitle: 'This is the hero subtitle',
  image: 'example.jpeg',
  height: 500,
};

export const JustTitle = Template.bind({});

JustTitle.args = {
  title: 'Hero title',
  image: 'example.jpeg',
};
