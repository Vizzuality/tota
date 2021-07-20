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
  Legend,
  LegendProps,
  XAxisProps,
  YAxisProps,
} from 'recharts';
import { colors } from 'constants/charts';

export interface ConfigProps {
  chartProps: any;
  legend: LegendProps;
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
  const { cartesianGrid, cartesianAxis, legend, chartProps, xAxis, yAxis, lines, tooltip } = config;

  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart width={400} height={200} data={data} {...chartProps}>
        {legend && <Legend {...legend} />}
        {cartesianGrid && <CartesianGrid {...cartesianGrid} />}
        {cartesianAxis && <CartesianAxis {...cartesianAxis} />}
        {xAxis && <XAxis {...xAxis} />}
        {yAxis && <YAxis {...yAxis} />}
        {lines &&
          Object.keys(lines).map((line, index) => (
            <Line
              key={`line_${index}`}
              strokeWidth={3}
              dot={false}
              activeDot={false}
              stroke={colors[index]}
              {...lines[line]}
            />
          ))}
        {tooltip && <Tooltip {...tooltip} />}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
