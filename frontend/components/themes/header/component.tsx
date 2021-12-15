import React from 'react';

import { useRouterSelectedTheme } from 'hooks/themes';

export interface ThemeHeaderProps {}

const ThemeHeader: React.FC<ThemeHeaderProps> = () => {
  const theme = useRouterSelectedTheme();

  return (
    <div className="mb-10">
      <h1 className="text-3xl my-10">{theme.title}</h1>
      {theme.description && <p>{theme.description}</p>}
    </div>
  );
};

export default ThemeHeader;
