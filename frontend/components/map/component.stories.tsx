import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import Map, { MapProps } from './component';

export default {
  title: 'Components/Map',
  component: Map,
};

const Template: Story<MapProps> = (props) => <Map {...props} />;

export const Default = Template.bind({});

Default.args = {
  width: 500,
  height: 500,
  mapboxApiAccessToken: process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN,
};
