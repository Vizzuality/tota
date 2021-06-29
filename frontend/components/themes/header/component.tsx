import React from 'react';
import { useRouter } from 'next/router';

import themes from 'constants/themes';

export interface ThemeHeaderProps {}

const ThemeHeader: React.FC<ThemeHeaderProps> = () => {
  const router = useRouter();
  const { slug } = router.query;

  const theme = themes.find((t) => t.slug === slug);

  return (
    <div className="mb-10">
      <h1 className="text-3xl my-10">{theme.name}</h1>
      <p>{theme.summary}</p>
    </div>
  );
};

export default ThemeHeader;
