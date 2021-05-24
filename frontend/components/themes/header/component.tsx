import React from 'react';
import { useRouter } from 'next/router';

import themes from 'constants/themes';

export interface ThemeHeaderProps {}

const ThemeHeader: React.FC<ThemeHeaderProps> = () => {
  const router = useRouter();
  const { slug } = router.query;

  const theme = themes.find((t) => t.slug === slug);

  return (
    <div className="h-60 flex items-center justify-center">
      <h1 className="text-5xl">{theme.name}</h1>
    </div>
  );
};

export default ThemeHeader;
