import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import Map from './component';
import type { MapWidgetProps } from './types';

export default {
  title: 'Components/Widgets/Map',
  component: Text,
  argTypes: {},
};

const data = '';

const Template: Story<MapWidgetProps> = ({ ...restProps }: MapWidgetProps) =>
  <div style={{ height: 500, width: 500 }}>
    <Map {...restProps} />
  </div>
  ;

export const Default = Template.bind({});

Default.args = {
  data,
  featureTooltip() {
    return (
      <div>Custom tooltip</div>
    )
  }
};

export const SelectedRegions = Template.bind({});

SelectedRegions.args = {
  data,
  selectedRegion: 'thompson_okanagan',
  featureTooltip() {
    return (
      <div>Custom tooltip</div>
    )
  }
};
