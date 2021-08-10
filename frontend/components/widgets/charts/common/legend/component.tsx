import React, { FC } from 'react';
import type { LegendProps } from './types';

const Legend: FC<LegendProps> = ({
  payload,
  valueFormatter = (value: string) => value,
  payloadFilter = () => true,
  ...rest
}: LegendProps) => {
  const filteredPayload = (payload || []).filter(payloadFilter);

  console.log('filtered payload', filteredPayload);
  console.log('rest', rest);

  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1 mt-5">
      {filteredPayload.map((entry, index) => (
        <li key={`item-${index}`}>
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2 inline-block" style={{ backgroundColor: entry.color }}></div>
            {valueFormatter(entry.value)}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Legend;
