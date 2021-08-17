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
import CustomLegend from 'components/widgets/charts/common/legend';
import { COLORS, defaultGrid, bottomLegend } from 'constants/charts';
import { ComposedChartProps } from './types';

const Chart: FC<ComposedChartProps> = ({
  data,
  cartesianGrid = defaultGrid,
  cartesianAxis,
  bars,
  areas,
  xAxis,
  yAxis,
  legend = bottomLegend,
  lines,
  tooltip = { cursor: { stroke: '#314057', strokeWidth: 1 } },
}: ComposedChartProps) => {
  const yAxisWidth = 60;
  const legendStyle = !!yAxis ? { paddingLeft: yAxisWidth - 2 } : {};

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={data}>
        {cartesianGrid && <CartesianGrid {...cartesianGrid} />}
        {cartesianAxis && <CartesianAxis {...cartesianAxis} />}
        {xAxis && <XAxis {...xAxis} />}
        {yAxis && <YAxis width={yAxisWidth} {...yAxis} />}
        {legend && <Legend wrapperStyle={legendStyle} {...legend} content={<CustomLegend {...legend} />} />}
        {lines &&
          Object.keys(lines).map((line, index) => (
            <Line key={`line_${index}`} strokeWidth={3} dot={false} activeDot stroke={COLORS[index]} {...lines[line]} />
          ))}
        {bars &&
          Object.keys(bars).map((bar, index) => <Bar key={`bar_${index}`} fill={COLORS[index]} {...bars[bar]} />)}
        {areas &&
          Object.keys(areas).map((area, index) => (
            <Area activeDot={false} key={`area_${index}`} fill={COLORS[index]} {...areas[area]} />
          ))}
        {tooltip && <Tooltip {...tooltip} content={<CustomTooltip {...tooltip} />} />}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default Chart;
