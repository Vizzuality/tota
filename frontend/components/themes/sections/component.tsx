import React, { FC } from 'react';

import ThemeSection from 'components/themes/section';

import { useRouterSelectedTheme } from 'hooks/themes';

interface SectionsProps {}

const Sections: FC<SectionsProps> = () => {
  const theme = useRouterSelectedTheme();

  return (
    <div className="flex flex-col gap-10 mb-10">
      {theme?.sections?.map((section, index) => (
        <ThemeSection key={`${theme.slug} - ${section.title}`} index={index + 1} section={section} />
      ))}
    </div>
  );
};

export default Sections;
