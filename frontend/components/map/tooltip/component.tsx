import { FC, useMemo } from 'react';
import mapKeys from 'lodash/mapKeys';
import mapValues from 'lodash/mapValues';
import camelCase from 'lodash/camelCase';
import pick from 'lodash/pick';

import BasicTooltip from './basic';
import OrganizationsTooltip from './features/organizations';

import { PROPERTIES_MAP } from './constants';

export interface TooltipProps {
  feature: any;
}

function formatProperties(source, properties) {
  const mappedValues = mapValues(properties, (value, key) => {
    const newProperty = PROPERTIES_MAP[source] && PROPERTIES_MAP[source][key];
    if (typeof newProperty === 'object') {
      return {
        ...newProperty,
        value,
      };
    }

    return value;
  });
  const mappedKeys = mapKeys(mappedValues, (_v, key) => {
    return (
      (PROPERTIES_MAP[source] &&
        PROPERTIES_MAP[source][key] &&
        (PROPERTIES_MAP[source][key].name || PROPERTIES_MAP[source][key])) ||
      key
    );
  });

  return mappedKeys;
}

export const Tooltip: FC<TooltipProps> = ({ feature }: TooltipProps) => {
  const propertiesCamelCased = mapKeys(feature.properties, (_v, key) => camelCase(key));
  const propertiesToPick = Object.keys(PROPERTIES_MAP[feature.source] || {}) as string[];
  const properties = formatProperties(
    feature.source,
    propertiesToPick ? pick(propertiesCamelCased, propertiesToPick) : propertiesCamelCased,
  );

  console.log('properties', properties);

  const DisplayTooltip = useMemo(() => {
    switch (feature.source) {
      case 'airports':
        return <BasicTooltip title={properties['Airport Name']} properties={properties} />;
      case 'accommodations':
        return <BasicTooltip title={properties['Occupant Name']} properties={properties} />;
      case 'campgrounds':
        return <BasicTooltip title={properties['Name']} properties={properties} />;
      case 'development_funds':
        return <BasicTooltip title={properties['Project Title']} properties={properties} />;
      case 'fires':
        const fireProps = {
          ...properties,
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
        return <BasicTooltip title={properties['Business Name']} properties={properties} />;
      case 'first_nations_communities':
        return <BasicTooltip title={properties['First Nation BC Name']} properties={properties} />;
      case 'organizations':
        return <OrganizationsTooltip feature={feature} />;
      case 'ski_resorts':
        return <BasicTooltip title={properties['Facility Name']} properties={properties} />;
      case 'stops':
        return <BasicTooltip title={properties['Sign Name']} properties={properties} />;
      case 'trails':
        return <BasicTooltip title={properties['Project Name']} properties={properties} />;
      case 'visitor_centers':
        return <BasicTooltip title={properties['Name']} properties={properties} />;
      case 'wildlife_habitats':
        return <BasicTooltip title={properties['Common Species Name']} properties={properties} />;
    }
    return <BasicTooltip title="Feature" properties={properties} />;
  }, [feature]);

  return DisplayTooltip;
};

export default Tooltip;
