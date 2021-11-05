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
import { COLORS, defaultGrid, defaultTooltip, bottomLegend } from 'constants/charts';
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
  tooltip = defaultTooltip,
}: LineChartProps) => {
  const yAxisWidth = 60;
  const margin = { top: 20 };
  const noLines = { axisLine: false, tickLine: false };
  const tick = { tick: { style: { fill: '#314057', fontSize: 14 } } };
  const legendProps = {
    ...legend,
    wrapperStyle: {
      ...(legend.wrapperStyle || {}),
      ...(!!yAxis ? { paddingLeft: yAxisWidth - 2 } : {}),
    },
  };

  return (
    <ResponsiveContainer width="100%" height={400} debounce={100}>
      <LineChart data={data} margin={margin} {...chartProps}>
        {legend && <Legend {...legendProps} content={<CustomLegend {...legendProps} />} />}
        {cartesianGrid && <CartesianGrid {...cartesianGrid} />}
        {cartesianAxis && <CartesianAxis {...cartesianAxis} />}
        {xAxis && <XAxis {...tick} {...noLines} {...xAxis} />}
        {yAxis && <YAxis {...tick} {...noLines} width={yAxisWidth} {...yAxis} />}
        {lines &&
          Object.keys(lines).map((line, index) => (
            <Line
              key={`line_${index}`}
              strokeWidth={3}
              dot={false}
              activeDot
              stroke={lines[line].color || COLORS[index]}
              {...lines[line]}
            />
          ))}
        {tooltip && <Tooltip {...tooltip} content={<CustomTooltip {...tooltip} />} />}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
