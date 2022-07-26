import { FC } from 'react';

import { useOrganization } from 'hooks/organizations';

import LoadingTooltip from 'components/map/tooltip/loading';
import BasicTooltip from 'components/map/tooltip/basic';

export interface TooltipProps {
  feature: any;
}

export const Tooltip: FC<TooltipProps> = ({ feature }: TooltipProps) => {
  const { data: organization, isLoading, isFetching } = useOrganization(feature.properties.id);

  if (isLoading || isFetching) return <LoadingTooltip />;
  if (!organization) return <div>No data</div>;

  const properties = {
    Name: organization.name,
    'Business Type 1': organization.business_type_1,
    'Business Type 2': organization.business_type_2,
    Tags: organization.tags,
    Longitude: organization.longitude,
    Latitude: organization.latitude,
    'Tourism region': organization.region,
    'Tourism subregion': organization.subregion,
    'Indigenous Ownership': organization.indigenous_ownership,
    'Biosphere Program Member': organization.biosphere_program_member,
    Accessibility: organization.accessibility,
    Website: organization.website_url,
    Source: 'Regional DMOs and other relevant third-party sources',
  };

  return <BasicTooltip title={organization.name} properties={properties} />;
};

export default Tooltip;
