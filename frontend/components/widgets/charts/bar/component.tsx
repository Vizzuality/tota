import React, { FC } from 'react';
import {
  ResponsiveContainer,
  Bar,
  BarChart,
  CartesianGrid,
  CartesianAxis,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { BarChartProps } from './types';

import { COLORS } from 'constants/charts';

const Chart: FC<BarChartProps> = ({
  data,
  chartProps,
  cartesianGrid = {
    vertical: false,
    height: '1px',
    strokeDasharray: '10 5',
  },
  cartesianAxis,
  legend,
  xAxis,
  yAxis,
  bars,
  tooltip = { cursor: false },
}: BarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart width={400} height={200} data={data} {...chartProps}>
        {cartesianGrid && <CartesianGrid {...cartesianGrid} />}
        {cartesianAxis && <CartesianAxis {...cartesianAxis} />}
        {legend && <Legend {...legend} />}
        {xAxis && <XAxis {...xAxis} />}
        {yAxis && <YAxis {...yAxis} />}
        {bars && Object.keys(bars).map((bar, index) => <Bar key={bar} fill={COLORS[index]} {...bars[bar]} />)}
        {tooltip && <Tooltip {...tooltip} />}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
