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

import { colors } from 'constants/charts';

const Chart: FC<BarChartProps> = ({
  data,
  chartProps,
  cartesianGrid,
  cartesianAxis,
  legend,
  xAxis,
  yAxis,
  bars,
  tooltip,
}: BarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart width={400} height={200} data={data} {...chartProps}>
        {cartesianGrid && <CartesianGrid {...cartesianGrid} />}
        {cartesianAxis && <CartesianAxis {...cartesianAxis} />}
        {legend && <Legend {...legend} />}
        {xAxis && <XAxis {...xAxis} />}
        {yAxis && <YAxis {...yAxis} />}
        {bars && Object.keys(bars).map((bar, index) => <Bar key={bar} {...bars[bar]} fill={colors[index]} />)}
        {tooltip && <Tooltip {...tooltip} />}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
