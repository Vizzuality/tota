import React, { FC } from 'react';
import { ResponsiveContainer, Legend, PieChart, Pie, Tooltip, Cell } from 'recharts';
import { PieChartProps } from './types';
import CustomTooltip from 'components/widgets/charts/common/tooltip';

import { COLORS } from 'constants/charts';

const Chart: FC<PieChartProps> = ({
  data,
  chartProps,
  pies,
  legend = {
    width: 300,
    layout: 'vertical',
    verticalAlign: 'middle',
    align: 'right',
    formatter: function Formatter(v: string) {
      return <span className="text-blue-800">{v}</span>;
    },
  },
  tooltip = { cursor: false },
}: PieChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart {...chartProps}>
        {legend && <Legend {...legend} />}
        {pies &&
          Object.keys(pies).map((pie, index) => (
            <Pie key={pie} innerRadius="50%" outerRadius="70%" label {...pies[pie]} data={data}>
              {data.map((d, i) => (
                <Cell key={`cell-${d}`} fill={d.color || COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          ))}
        {tooltip && <Tooltip {...tooltip} content={<CustomTooltip {...tooltip} />} />}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Chart;
