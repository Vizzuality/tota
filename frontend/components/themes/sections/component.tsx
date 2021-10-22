import React, { FC } from 'react';

import ThemeSection from 'components/themes/section';

import { useRouterSelectedTheme } from 'hooks/themes';
import { useRouterSelectedRegion } from 'hooks/regions';

interface SectionsProps {}

const Sections: FC<SectionsProps> = () => {
  const theme = useRouterSelectedTheme();
  const selectedRegion = useRouterSelectedRegion();

  const sections = theme?.sections?.filter(
    (section) => section.display === undefined || section.display(selectedRegion),
  );

  return (
    <div className="flex flex-col gap-10 mb-10">
      {sections.map((section, index) => (
        <ThemeSection key={`${theme.slug} - ${section.title}`} index={index + 1} section={section} />
      ))}
    </div>
  );
};

export default Sections;
