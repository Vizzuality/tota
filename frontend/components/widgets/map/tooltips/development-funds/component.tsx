import React, { FC } from 'react';
import type { TooltipProps } from './types';

const Tooltip: FC<TooltipProps> = ({ year, regionName, funds }: TooltipProps) => (
  <div>
    <div className="bg-blue9 py-2 px-4 text-white flex flex-row justify-between">
      <div>{year}</div>
    </div>
    <div className="px-4 py-2 text-blue9">
      <div className="font-bold">{regionName} Projects</div>
      {funds.map((fund) => (
        <div key={fund.name} className="flex justify-between">
          <div>{fund.name}</div>
          <div className="font-bold text-right">
            {fund.count}
            <br />
            {fund.volume} $
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Tooltip;
