import { FC } from 'react';

import { useOrganization } from 'hooks/organizations';

import LoadingTooltip from 'components/map/tooltip/loading';
import BasicTooltip from 'components/map/tooltip/basic';

export interface TooltipProps {
  feature: any;
}

export const Tooltip: FC<TooltipProps> = ({ feature }: TooltipProps) => {
  const { data: organization, isLoading, isFetching } = useOrganization(feature.feature.properties.id);

  if (isLoading || isFetching) return <LoadingTooltip />;
  if (!organization) return <div>No data</div>;

  const properties = {
    name: organization.name,
    business_type: organization.business_type,
    business_subtype: organization.business_subtype,
    longitude: organization.longitude,
    latitude: organization.latitude,
    region: organization.region,
    subregion: organization.subregion,
    indigenous_ownership: organization.indigenous_ownership,
    biosphere_program_member: organization.biosphere_program_member,
    accessibility: organization.accessibility,
    website: organization.website_url,
    source: organization.source,
  };

  return <BasicTooltip title={organization.name} properties={properties} />;
};

export default Tooltip;
