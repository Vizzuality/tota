import { ReactNode } from 'react';
import type { Region } from 'types';

export interface MapWidgetProps {
  featureTooltip?: (feature: any, regions: Region[]) => ReactNode;
  selectedRegion?: string;
  disableHighlight?: boolean;
  prependExtraLayers?: boolean;
  includeTourismRegionLabels?: boolean;
  extraLayers?: any[];
}
