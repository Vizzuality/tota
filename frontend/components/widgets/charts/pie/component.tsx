import React, { FC } from 'react';
import { ResponsiveContainer, Legend, LegendProps, PieChart, Pie, Tooltip, PieProps, Cell } from 'recharts';

import { colors } from 'constants/charts';

interface ConfigProps {
  chartProps: any;
  pies: PieProps;
  legend: LegendProps;
  tooltip: any;
}

export interface ChartProps {
  data: any[];
  config: ConfigProps;
}

const Chart: FC<ChartProps> = ({ data, config }: ChartProps) => {
  const { chartProps, pies, legend, tooltip } = config;

  return (
    <ResponsiveContainer width="100%" height={500}>
      <PieChart width={400} height={200} {...chartProps}>
        {/* @ts-expect-error: dunno why props erroring as using LegendProps */}
        {legend && <Legend {...legend} />}
        {pies &&
          Object.keys(pies).map((pie, index) => (
            <Pie key={pie} innerRadius="50%" outerRadius="70%" label {...pies[pie]} data={data} fill={colors[index]}>
              {data.map((d, i) => (
                <Cell key={`cell-${d}`} fill={colors[i % colors.length]} />
              ))}
            </Pie>
          ))}
        {tooltip && <Tooltip {...tooltip} />}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Chart;
