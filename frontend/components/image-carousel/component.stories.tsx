import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import ImageCarousel from './component';
import type { ImageCarouselProps } from './types';
import heroBackgroundImage1 from 'images/home/hero-background-1.jpg';
import heroBackgroundImage2 from 'images/home/hero-background-2.jpg';
import heroBackgroundImage3 from 'images/home/hero-background-3.jpg';
import heroBackgroundImage4 from 'images/home/hero-background-4.jpg';
import heroBackgroundImage5 from 'images/home/hero-background-5.png';

export default {
  title: 'Components/ImageCarousel',
  component: ImageCarousel,
};

const Template: Story<ImageCarouselProps> = ({ ...restProps }: ImageCarouselProps) => <ImageCarousel {...restProps} />;

export const Default = Template.bind({});
Default.args = {
  images: [
    heroBackgroundImage1,
    heroBackgroundImage2,
    heroBackgroundImage3,
    heroBackgroundImage4,
    heroBackgroundImage5,
  ],
};
