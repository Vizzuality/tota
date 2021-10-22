import React, { FC } from 'react';
import type { TooltipProps } from './types';

const Tooltip: FC<TooltipProps> = ({ years, regionName, funds }: TooltipProps) => (
  <div>
    <div className="bg-blue-800 py-2 px-4 text-white flex flex-row justify-between">
      <div>{(years || []).join(' - ')}</div>
    </div>
    <div className="px-4 py-2 text-blue-800">
      <div className="font-bold">{regionName} Projects</div>
      {funds.map((fund) => (
        <div key={fund.name} className="flex justify-between mt-1">
          <div>
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2 inline-block" style={{ backgroundColor: fund.color }}></div>
              {fund.name}
            </div>
          </div>
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
