import React, { FC } from 'react';
import { ResponsiveContainer, Legend, PieChart, Pie, Tooltip, Cell } from 'recharts';
import { PieChartProps } from './types';

import { COLORS } from 'constants/charts';

const Chart: FC<PieChartProps> = ({ data, chartProps, pies, legend, tooltip }: PieChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <PieChart width={400} height={200} {...chartProps}>
        {/* @ts-expect-error: dunno why props erroring as using LegendProps */}
        {legend && <Legend {...legend} />}
        {pies &&
          Object.keys(pies).map((pie, index) => (
            <Pie key={pie} innerRadius="50%" outerRadius="70%" label {...pies[pie]} data={data} fill={COLORS[index]}>
              {data.map((d, i) => (
                <Cell key={`cell-${d}`} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          ))}
        {tooltip && <Tooltip {...tooltip} />}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Chart;
