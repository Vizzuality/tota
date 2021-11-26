import { FC, useMemo } from 'react';
import mapKeys from 'lodash/mapKeys';
import camelCase from 'lodash/camelCase';
import pick from 'lodash/pick';

import BasicTooltip from './basic';

import OrganizationsTooltip from './features/organizations';

export interface TooltipProps {
  feature: any;
}

function formatProperties(properties) {
  return mapKeys(properties, (_v, key) => camelCase(key));
}

const PROPERTIES_TO_PICK = {
  visitor_centers: [
    'name',
    'businessType',
    'longitude',
    'latitude',
    'address',
    'postalCode',
    'tourismRegion',
    'tourismSubRegion',
  ],
};

export const Tooltip: FC<TooltipProps> = ({ feature }: TooltipProps) => {
  const properties = formatProperties(feature.properties);
  const propertiesToPick = PROPERTIES_TO_PICK[feature.source];
  const pickedProperties = propertiesToPick ? pick(properties, propertiesToPick) : properties;
  const DisplayTooltip = useMemo(() => {
    switch (feature.source) {
      case 'organizations':
        return <OrganizationsTooltip feature={feature} />;
      case 'visitor_centers':
        return <BasicTooltip title={properties.name} properties={pickedProperties} />;
    }
    return <BasicTooltip title="Feature" properties={properties} />;
  }, [feature]);

  return DisplayTooltip;
};

export default Tooltip;
