import React, { FC } from 'react';
import {
  ResponsiveContainer,
  CartesianGrid,
  CartesianAxis,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  LineProps,
  LineChart,
  XAxisProps,
  YAxisProps,
} from 'recharts';

export interface ConfigProps {
  lines: LineProps;
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
  const { cartesianGrid, cartesianAxis, xAxis, yAxis, lines, tooltip } = config;

  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart width={400} height={200} data={data}>
        {cartesianGrid && <CartesianGrid {...cartesianGrid} />}
        {cartesianAxis && <CartesianAxis {...cartesianAxis} />}
        {xAxis && <XAxis {...xAxis} />}
        {yAxis && <YAxis {...yAxis} />}
        {lines && Object.keys(lines).map((line) => <Line key={line} {...lines[line]} />)}
        {tooltip && <Tooltip />}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
