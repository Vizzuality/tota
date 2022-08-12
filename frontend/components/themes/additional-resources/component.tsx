import React, { FC } from 'react';
import groupBy from 'lodash/groupBy';

import { useRouterSelectedRegion } from 'hooks/regions';
import { useAdditionalResources } from 'hooks/additional-resources';

interface AdditionalResourcesProps {}

const AdditionalResources: FC<AdditionalResourcesProps> = () => {
  const selectedRegion = useRouterSelectedRegion();
  const { data: additionalResources } = useAdditionalResources(selectedRegion.slug);
  const grouped = groupBy(additionalResources, 'group');

  return (
    <div className="flex flex-col gap-10 mb-10">
      {Object.keys(grouped).map((group, index) => (
        <div key={group} className="p-5 bg-white">
          <div className="relative mb-5">
            <div
              className="absolute rounded-full bg-yellow-50 text-blue-800 text-2xl h-50 w-50 flex items-center justify-center"
              style={{ width: 50, height: 50 }}
            >
              {index + 1}
            </div>
            <div className="flex flex-col justify-center" style={{ marginLeft: 70, minHeight: 50 }}>
              <h2 className="text-lg font-bold">{group}</h2>
            </div>
          </div>
          {grouped[group].map((resource) => (
            <div key={resource.id} className="font-bold text-lg py-5">
              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                {resource.title}
              </a>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AdditionalResources;
