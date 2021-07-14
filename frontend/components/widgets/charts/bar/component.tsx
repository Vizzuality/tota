import React, { FC } from 'react';
import {
  ResponsiveContainer,
  Bar,
  BarChart,
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
  chartProps: any;
  bars: BarProps;
  cartesianAxis?: any;
  cartesianGrid?: any;
  xAxis?: XAxisProps;
  yAxis?: YAxisProps;
  tooltip: any;
}

export interface ChartProps {
  data: any[];
  config: ConfigProps;
}

const Chart: FC<ChartProps> = ({ data, config }: ChartProps) => {
  const { chartProps, cartesianGrid, cartesianAxis, xAxis, yAxis, bars, tooltip } = config;
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart width={400} height={200} data={data} {...chartProps}>
        {cartesianGrid && <CartesianGrid {...cartesianGrid} />}
        {cartesianAxis && <CartesianAxis {...cartesianAxis} />}
        {xAxis && <XAxis {...xAxis} />}
        {yAxis && <YAxis {...yAxis} />}
        {bars && Object.keys(bars).map((bar, index) => <Bar key={bar} {...bars[bar]} fill={colors[index]} />)}
        {tooltip && <Tooltip {...tooltip} />}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
