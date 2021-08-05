import React, { FC } from 'react';
/* import { format } from 'd3-format'; */

export interface TooltipProps {
  active: boolean;
  label: any;
  payload: any;
  labelFormatter: any;
  valueFormatter: any;
}

const Tooltip: FC<TooltipProps> = ({
  active,
  label,
  payload,
  labelFormatter = (label: any) => label,
  valueFormatter = (value: any) => value,
}: TooltipProps) => {
  if (!active) return null;

  return (
    <div className="bg-white shadow-md text-sm" style={{ minWidth: 350 }}>
      <div className="bg-blue9 py-2 px-4 text-white">
        <span>{labelFormatter(label)}</span>
      </div>
      <div className="px-4 py-2">
        {payload &&
          payload.length > 0 &&
          payload.map((y) => (
            <div key={`${y.dataKey}`} className="py-1 flex flex-row justify-between text-blue9">
              <div className="mr-10 flex items-center">
                <div className="w-4 h-4 mr-2 inline-block" style={{ backgroundColor: y.stroke || y.color }}></div>
                {y.dataKey}
              </div>
              <div className="font-bold">{valueFormatter(y.value)}</div>
            </div>
          ))}
        {(!payload || payload.length === 0) && <div>No data available</div>}
      </div>
    </div>
  );
};

export default Tooltip;
