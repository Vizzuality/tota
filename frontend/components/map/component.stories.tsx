import React from 'react';
/* import { Story } from '@storybook/react/types-6-0'; */
import Map from './component';

export default {
  title: 'Components/Map',
  component: Map,
};

export const Default: React.VFC<Record<string, never>> = () => <Map />;
