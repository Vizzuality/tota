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
import { COLORS, defaultGrid, bottomLegend } from 'constants/charts';
import { LineChartProps } from './types';
import CustomTooltip from 'components/widgets/charts/common/tooltip';
import CustomLegend from 'components/widgets/charts/common/legend';

const Chart: FC<LineChartProps> = ({
  data,
  cartesianGrid = defaultGrid,
  cartesianAxis,
  legend = bottomLegend,
  chartProps,
  xAxis,
  yAxis = {},
  lines,
  tooltip = { cursor: { stroke: '#314057', strokeWidth: 1 } },
}: LineChartProps) => {
  const yAxisWidth = 60;
  const legendStyle = !!yAxis ? { paddingLeft: yAxisWidth - 2 } : {};

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} {...chartProps}>
        {legend && <Legend wrapperStyle={legendStyle} {...legend} content={<CustomLegend {...legend} />} />}
        {cartesianGrid && <CartesianGrid {...cartesianGrid} />}
        {cartesianAxis && <CartesianAxis {...cartesianAxis} />}
        {xAxis && <XAxis {...xAxis} />}
        {yAxis && <YAxis width={yAxisWidth} {...yAxis} />}
        {lines &&
          Object.keys(lines).map((line, index) => (
            <Line key={`line_${index}`} strokeWidth={3} dot={false} activeDot stroke={COLORS[index]} {...lines[line]} />
          ))}
        {tooltip && <Tooltip {...tooltip} content={<CustomTooltip {...tooltip} />} />}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
