import { FC, useMemo } from 'react';
import mapKeys from 'lodash/mapKeys';
import camelCase from 'lodash/camelCase';
import pick from 'lodash/pick';

import BasicTooltip from './basic';
import OrganizationsTooltip from './features/organizations';

import { PROPERTIES_MAP } from './constants';

export interface TooltipProps {
  feature: any;
}

function formatProperties(source, properties) {
  return mapKeys(properties, (_v, key) => {
    const newKey = camelCase(key);
    return (PROPERTIES_MAP[source] && PROPERTIES_MAP[source][newKey]) || newKey;
  });
}

export const Tooltip: FC<TooltipProps> = ({ feature }: TooltipProps) => {
  const properties = formatProperties(feature.source, feature.properties);
  const propertiesToPick = Object.values(PROPERTIES_MAP[feature.source] || {}) as string[];
  const pickedProperties = propertiesToPick ? pick(properties, propertiesToPick) : properties;
  const DisplayTooltip = useMemo(() => {
    switch (feature.source) {
      case 'airports':
        return <BasicTooltip title={properties['Airport Name']} properties={pickedProperties} />;
      case 'accommodations':
        return <BasicTooltip title={properties['Occupant Name']} properties={pickedProperties} />;
      case 'campgrounds':
        return <BasicTooltip title={properties['Name']} properties={pickedProperties} />;
      case 'development_funds':
        return <BasicTooltip title={properties['Project Title']} properties={pickedProperties} />;
      case 'fires':
        const fireProps = {
          ...pickedProperties,
          'Additional Link1':
            'http://bcfireinfo.for.gov.bc.ca/hprScripts/WildfireNews/Fires.asp?Mode=normal&AllFires=1&FC=0',
          'Additional Link2':
            'https://governmentofbc.maps.arcgis.com/apps/webappviewer/index.html?id=a1e7b1ecb1514974a9ca00bdbfffa3b1',
          'Wildfires of Note': 'http://bcfireinfo.for.gov.bc.ca/hprScripts/WildfireNews/OneFire.asp',
          source: {
            type: 'link',
            text: 'Resource Watch',
            link: 'https://resourcewatch.org/data/explore/for006nrt-Active-Fires-VIIRS_old_replacement?section=Discover&selectedCollection=&zoom=3&lat=0&lng=0&pitch=0&bearing=0&basemap=dark&labels=light&layers=%255B%257B%2522dataset%2522%253A%252264c948a6-5e34-4ef2-bb69-6a6535967bd5%2522%252C%2522opacity%2522%253A1%252C%2522layer%2522%253A%25222d7882f4-0e42-429c-9951-b29ccc16409e%2522%257D%255D&aoi=&page=1&sort=most-viewed&sortDirection=-1',
          },
        };
        return <BasicTooltip title="Fire" properties={fireProps} />;
      case 'first_nations_business':
        return <BasicTooltip title={properties['Business Name']} properties={pickedProperties} />;
      case 'first_nations_communities':
        return <BasicTooltip title={properties['First Nation BC Name']} properties={pickedProperties} />;
      case 'organizations':
        return <OrganizationsTooltip feature={feature} />;
      case 'ski_resorts':
        return <BasicTooltip title={properties['Facility Name']} properties={pickedProperties} />;
      case 'stops':
        return <BasicTooltip title={properties['Sign Name']} properties={pickedProperties} />;
      case 'trails':
        return <BasicTooltip title={properties['Project Name']} properties={pickedProperties} />;
      case 'visitor_centers':
        return <BasicTooltip title={properties['Name']} properties={pickedProperties} />;
      case 'wildlife_habitats':
        return <BasicTooltip title={properties['Common Species Name']} properties={pickedProperties} />;
    }
    return <BasicTooltip title="Feature" properties={properties} />;
  }, [feature]);

  return DisplayTooltip;
};

export default Tooltip;
