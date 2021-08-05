import React, { FC } from 'react';
import {
  Area,
  Bar,
  CartesianAxis,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import CustomTooltip from 'components/widgets/charts/common/tooltip';
import { COLORS } from 'constants/charts';
import { ComposedChartProps } from './types';

const Chart: FC<ComposedChartProps> = ({
  data,
  cartesianGrid = {
    height: '1px',
    strokeDasharray: '0',
  },
  cartesianAxis,
  bars,
  areas,
  xAxis,
  yAxis,
  legend,
  lines,
  tooltip = { cursor: false },
}: ComposedChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={data}>
        {cartesianGrid && <CartesianGrid {...cartesianGrid} />}
        {cartesianAxis && <CartesianAxis {...cartesianAxis} />}
        {xAxis && <XAxis {...xAxis} />}
        {yAxis && <YAxis {...yAxis} />}
        {/* @ts-expect-error: dunno why props erroring as using LegendProps */}
        {legend && <Legend {...legend} />}
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
        {bars &&
          Object.keys(bars).map((bar, index) => <Bar key={`bar_${index}`} fill={COLORS[index]} {...bars[bar]} />)}
        {areas &&
          Object.keys(areas).map((area, index) => <Area key={`area_${index}`} fill={COLORS[index]} {...areas[area]} />)}
        {tooltip && <Tooltip {...tooltip} content={<CustomTooltip />} />}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default Chart;
