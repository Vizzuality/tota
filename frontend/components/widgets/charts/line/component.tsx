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
import CustomTooltip from 'components/widgets/charts/common/tooltip';

const Chart: FC<LineChartProps> = ({
  data,
  cartesianGrid = {
    height: '1px',
    strokeDasharray: '0',
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
        {tooltip && <Tooltip {...tooltip} content={<CustomTooltip {...tooltip} />} />}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
