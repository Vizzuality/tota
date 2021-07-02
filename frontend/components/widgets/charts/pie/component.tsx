import React, { FC } from 'react';
import { ResponsiveContainer, PieChart, Pie, Tooltip, PieProps, Cell } from 'recharts';

import { colors } from 'constants/charts';

interface ConfigProps {
  pies: PieProps;
  tooltip: any;
}

export interface ChartProps {
  data: any[];
  config: ConfigProps;
}

const Chart: FC<ChartProps> = ({ data, config }: ChartProps) => {
  const { pies, tooltip } = config;

  return (
    <ResponsiveContainer width="100%" height={500}>
      <PieChart width={400} height={200}>
        {pies &&
          Object.keys(pies).map((pie, index) => (
            <Pie key={pie} {...pies[pie]} data={data} fill={colors[index]}>
              {data.map((d, i) => (
                <Cell key={`cell-${d}`} fill={colors[i % colors.length]} />
              ))}
            </Pie>
          ))}
        {tooltip && <Tooltip />}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Chart;
