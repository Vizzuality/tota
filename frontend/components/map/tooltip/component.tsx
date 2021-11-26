import { FC, useMemo } from 'react';
import mapKeys from 'lodash/mapKeys';
import camelCase from 'lodash/camelCase';
import pick from 'lodash/pick';

import BasicTooltip from './basic';

import OrganizationsTooltip from './features/organizations';

export interface TooltipProps {
  feature: any;
}

const PROPERTIES_NEW_NAMES = {
  accommodations: {
    custodianOrgDescription: 'source',
  },
  campgrounds: {
    sites: 'nrOfSites',
    units: 'nrOfUnits',
  },
  first_nations_communities: {
    alternativeName1: 'alternativeName',
    urlToFirstNationWebsite: 'website',
  },
  ski_resorts: {
    custodianOrgDescription: 'source',
  },
};

const PROPERTIES_TO_PICK = {
  accommodations: [
    'occupantName',
    'description',
    'businessCategoryDescription',
    'keywords',
    'longitude',
    'latitude',
    'physicalAddress',
    'postalCode',
    'tourismArea',
    'facebookAccount',
    'twitterAccount',
    'source',
  ],
  campgrounds: ['name', 'longitude', 'latitude', 'address', 'city', 'postalCode', 'nrOfSites', 'nrOfUnits'],
  first_nations_communities: [
    'firstNationBcName',
    'firstNationFederalName',
    'preferredName',
    'alternativeName',
    'languageGroup',
    'memberOrganizationNames',
    'bcRegionalOffice',
    'addressLine1',
    'addressLine2',
    'officeCity',
    'officeProvince',
    'officePostalCode',
    'siteName',
    'siteNumber',
    'location',
    'description',
    'comments',
    'website',
  ],
  ski_resorts: [
    'facilityName',
    'businessCategoryDescription',
    'keywords',
    'longitude',
    'latitude',
    'physicalAddress',
    'source',
  ],
  stops: ['signName', 'currentText', 'longitude', 'latitude', 'specificLocation'],
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

function formatProperties(source, properties) {
  return mapKeys(properties, (_v, key) => {
    const newKey = camelCase(key);
    return (PROPERTIES_NEW_NAMES[source] && PROPERTIES_NEW_NAMES[source][newKey]) || newKey;
  });
}

export const Tooltip: FC<TooltipProps> = ({ feature }: TooltipProps) => {
  const properties = formatProperties(feature.source, feature.properties);
  const propertiesToPick = PROPERTIES_TO_PICK[feature.source];
  const pickedProperties = propertiesToPick ? pick(properties, propertiesToPick) : properties;
  const DisplayTooltip = useMemo(() => {
    switch (feature.source) {
      case 'accommodations':
        return <BasicTooltip title={properties.occupantName} properties={pickedProperties} />;
      case 'campgrounds':
        return <BasicTooltip title={properties.name} properties={pickedProperties} />;
      case 'first_nations_communities':
        return <BasicTooltip title={properties.firstNationBcName} properties={pickedProperties} />;
      case 'organizations':
        return <OrganizationsTooltip feature={feature} />;
      case 'ski_resorts':
        return <BasicTooltip title={properties.facilityName} properties={pickedProperties} />;
      case 'stops':
        return <BasicTooltip title={properties.signName} properties={pickedProperties} />;
      case 'visitor_centers':
        return <BasicTooltip title={properties.name} properties={pickedProperties} />;
    }
    return <BasicTooltip title="Feature" properties={properties} />;
  }, [feature]);

  return DisplayTooltip;
};

export default Tooltip;
