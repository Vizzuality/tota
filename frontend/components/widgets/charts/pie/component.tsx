import React, { FC } from 'react';
import { ResponsiveContainer, Legend, PieChart, Pie, Tooltip, Cell } from 'recharts';

import type { PieChartProps } from './types';
import CustomTooltip from 'components/widgets/charts/common/tooltip';
import { useChartWidth } from 'hooks/charts';

import { getColorPalette } from 'constants/charts';

function getLegend(pieChartWidth?: number) {
  if (pieChartWidth < 600) {
    return {
      layout: 'horizontal',
      verticalAlign: 'bottom',
      align: 'left',
      formatter: function Formatter(v: string) {
        return <span className="text-blue-800">{v}</span>;
      },
    };
  }

  return {
    width: pieChartWidth < 700 ? 200 : 300,
    layout: 'vertical',
    verticalAlign: 'middle',
    align: 'right',
    formatter: function Formatter(v: string) {
      return <span className="text-blue-800">{v}</span>;
    },
  };
}

const Chart: FC<PieChartProps> = ({ data, chartProps, pies, legend, tooltip = { cursor: false } }: PieChartProps) => {
  const { chartWidth, containerRef } = useChartWidth();
  const legendProps = legend || getLegend(chartWidth);
  const colors = getColorPalette(data.length);

  return (
    <ResponsiveContainer ref={containerRef} width="100%" height={400} debounce={100}>
      <PieChart {...chartProps}>
        {legendProps && <Legend {...legendProps} />}
        {pies &&
          Object.keys(pies).map((pie) => (
            <Pie key={pie} innerRadius="50%" outerRadius="70%" label {...pies[pie]} data={data}>
              {data.map((d, i) => (
                <Cell key={`cell-${d}`} fill={d.color || colors[i % colors.length]} />
              ))}
            </Pie>
          ))}
        {tooltip && <Tooltip {...tooltip} content={<CustomTooltip {...tooltip} />} />}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Chart;
