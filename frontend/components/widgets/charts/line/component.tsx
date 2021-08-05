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
import { COLORS } from 'constants/charts';
import { LineChartProps } from './types';

const Chart: FC<LineChartProps> = ({
  data,
  cartesianGrid = {
    vertical: false,
    height: '1px',
    strokeDasharray: '10 5',
  },
  cartesianAxis,
  legend,
  chartProps,
  xAxis,
  yAxis,
  lines,
  tooltip = { cursor: false },
}: LineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} {...chartProps}>
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
              stroke={COLORS[index]}
              {...lines[line]}
            />
          ))}
        {tooltip && <Tooltip {...tooltip} />}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
