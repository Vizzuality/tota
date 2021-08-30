import React, { FC } from 'react';
import orderBy from 'lodash/orderBy';
import type { TooltipProps } from './types';

const Tooltip: FC<TooltipProps> = ({ active, payload, valueFormatter = (value: string) => value }: TooltipProps) => {
  if (!active) return null;

  const sortedPayload = orderBy(payload, ['value'], ['desc']);

  return (
    <div className="bg-white shadow-md text-sm">
      <div className="px-4 py-2">
        {sortedPayload &&
          sortedPayload.length > 0 &&
          sortedPayload.map((y: any, index) => (
            <div key={index} className="py-1 flex flex-row justify-between text-blue9">
              <div className="mr-10 flex items-center">
                <div className="w-4 h-4 mr-2 inline-block" style={{ backgroundColor: y.payload.color }}></div>
                {y.payload.name}
              </div>
              <div className="font-bold">{valueFormatter(y.value)}</div>
            </div>
          ))}
        {sortedPayload.length === 0 && <div>No data available</div>}
      </div>
    </div>
  );
};

export default Tooltip;
