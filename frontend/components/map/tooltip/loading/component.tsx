import React, { FC } from 'react';

import Loading from 'components/loading';

import type { TooltipProps } from './types';

const Tooltip: FC<TooltipProps> = () => (
  <div>
    <div className="bg-blue-800 py-2 px-4 text-white flex flex-row justify-between">Loading...</div>
    <div className="p-10 text-blue-800 overflow-y-auto" style={{ maxHeight: 400 }}>
      <Loading iconClassName="w-10 h-10" visible />
    </div>
  </div>
);

export default Tooltip;
