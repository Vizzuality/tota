import React, { FC } from 'react';
import startCase from 'lodash/startCase';
import type { TooltipProps } from './types';

const Tooltip: FC<TooltipProps> = ({ properties }: TooltipProps) => (
  <div>
    <div className="bg-blue-800 py-2 px-4 text-white flex flex-row justify-between">Feature</div>
    <div className="px-4 py-2 text-blue-800" style={{ maxHeight: 500 }}>
      {Object.keys(properties).map((key) => (
        <div key={key} className="flex justify-between mt-1">
          <div>{startCase(key)}</div>
          <div className="font-bold text-right ml-4" style={{ maxWidth: 500 }}>
            {properties[key]}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Tooltip;
