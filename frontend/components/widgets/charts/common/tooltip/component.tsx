import React, { FC } from 'react';
import type { TooltipProps } from './types';

const Tooltip: FC<TooltipProps> = ({
  active,
  label,
  payload,
  totalFormatter,
  labelFormatter = (label: string) => label,
  valueFormatter = (value: string) => value,
  payloadFilter = () => true,
}: TooltipProps) => {
  if (!active) return null;

  const filteredPayload = (payload || []).filter(payloadFilter);

  return (
    <div className="bg-white shadow-md text-sm" style={{ minWidth: 300 }}>
      {label && (
        <div className="bg-blue9 py-2 px-4 text-white flex flex-row justify-between">
          <span>{labelFormatter(label)}</span>
          {totalFormatter && <span className="font-bold">{totalFormatter(label)}</span>}
        </div>
      )}
      <div className="px-4 py-2">
        {filteredPayload &&
          filteredPayload.length > 0 &&
          filteredPayload.map((y: any) => (
            <div key={`${y.dataKey}`} className="py-1 flex flex-row justify-between text-blue9">
              <div className="mr-10 flex items-center">
                <div
                  className="w-4 h-4 mr-2 inline-block"
                  style={{ backgroundColor: y.stroke || y.color || y.payload?.fill }}
                ></div>
                {y.name}
              </div>
              <div className="font-bold">{valueFormatter(y.value)}</div>
            </div>
          ))}
        {filteredPayload.length === 0 && <div>No data available</div>}
      </div>
    </div>
  );
};

export default Tooltip;
