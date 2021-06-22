import React, { FC } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  CartesianAxis,
  XAxis,
  YAxis,
  Tooltip,
  BarProps,
  XAxisProps,
  YAxisProps,
} from 'recharts';

import { colors } from 'constants/charts';

interface ConfigProps {
  bars: BarProps;
  cartesianAxis?: any;
  cartesianGrid?: any;
  xAxis?: XAxisProps;
  yAxis?: YAxisProps;
  tooltip: any;
}

interface ChartProps {
  data: any[];
  config: ConfigProps;
}

const Chart: FC<ChartProps> = ({ data, config }: ChartProps) => {
  const { cartesianGrid, cartesianAxis, xAxis, yAxis, bars, tooltip } = config;
  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart width={400} height={500} data={data}>
        {cartesianGrid && <CartesianGrid {...cartesianGrid} />}
        {cartesianAxis && <CartesianAxis {...cartesianAxis} />}
        {xAxis && <XAxis {...xAxis} />}
        {yAxis && <YAxis {...yAxis} />}
        {bars && Object.keys(bars).map((bar, index) => <Bar key={bar} {...bars[bar]} fill={colors[index]} />)}
        {tooltip && <Tooltip />}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
