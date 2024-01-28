import React from 'react';

import { useRouterSelectedTheme } from 'hooks/themes';
import { useRouterSelectedRegion } from 'hooks/regions';

import cx from 'classnames';

export interface ThemeHeaderProps {}

const ThemeHeader: React.FC<ThemeHeaderProps> = () => {
  const theme = useRouterSelectedTheme();
  const region = useRouterSelectedRegion();

  return (
    <div className="px-4 md:px-0 mb-10 flex justify-between items-center print:bg-white print:px-6 print:py-10 print:w-screen">
      <div className="flex flex-col print:space-y-2">
        <h2 className="text-3xl hidden print:block text-blue-800 font-bold">{region.name}</h2>
        <h1 className="text-3xl my-10 print:my-0 print:text-2xl">{theme.title}</h1>
        {theme.description && <p dangerouslySetInnerHTML={{ __html: theme.description }} className="print:hidden" />}
      </div>
      <button
        type="button"
        className={cx({
          'print:hidden text-lg font-bold px-4 py-4 text-white bg-blue-800 hover:bg-green-600 w-60 h-16': true,
          hidden: theme.slug === 'additional_resources' || theme.slug === 'local_satisfaction',
        })}
        onClick={() => window.print()}
      >
        Download report
      </button>
    </div>
  );
};

export default ThemeHeader;
