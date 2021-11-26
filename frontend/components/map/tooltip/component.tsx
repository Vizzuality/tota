import { FC, useMemo } from 'react';

import BasicTooltip from './basic';

import OrganizationsTooltip from './features/organizations';

export interface TooltipProps {
  feature: any;
}

export const Tooltip: FC<TooltipProps> = ({ feature }: TooltipProps) => {
  const DisplayTooltip = useMemo(() => {
    switch (feature.feature.source) {
      case 'organizations':
        return <OrganizationsTooltip feature={feature} />;
    }
    return <BasicTooltip title="Feature" properties={feature.feature.properties} />;
  }, [feature]);

  return DisplayTooltip;
};

export default Tooltip;
