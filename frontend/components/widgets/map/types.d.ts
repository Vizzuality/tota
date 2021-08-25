import { ReactNode } from 'react';

export interface MapWidgetProps {
  featureTooltip?: (feature: any) => ReactNode;
  selectedRegion?: string;
  extraLayers?: any[];
}
