import React, { FC } from 'react';
import {
  ResponsiveContainer,
  CartesianGrid,
  CartesianAxis,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  LineChart,
  Legend,
} from 'recharts';
import { colors } from 'constants/charts';
import { LineChartProps } from './types';

const Chart: FC<LineChartProps> = ({
  data,
  cartesianGrid,
  cartesianAxis,
  legend,
  chartProps,
  xAxis,
  yAxis,
  lines,
  tooltip,
}: LineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart width={400} height={200} data={data} {...chartProps}>
        {/* @ts-expect-error: dunno why props erroring as using LegendProps */}
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
