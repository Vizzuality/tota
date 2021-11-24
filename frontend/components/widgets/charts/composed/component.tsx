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
import { getColorPalette, defaultGrid, defaultTooltip, bottomLegend } from 'constants/charts';
import { ComposedChartProps } from './types';

const Chart: FC<ComposedChartProps> = ({
  data,
  cartesianGrid = defaultGrid,
  cartesianAxis,
  bars,
  areas,
  xAxis,
  yAxis = {},
  chartProps,
  legend = bottomLegend,
  lines,
  tooltip = defaultTooltip,
}: ComposedChartProps) => {
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
  const dataLength = Math.max(
    Object.keys(lines || {}).length,
    Object.keys(bars || {}).length,
    Object.keys(areas || {}).length,
  );
  const colors = getColorPalette(dataLength);

  return (
    <ResponsiveContainer width="100%" height={400} debounce={100}>
      <ComposedChart margin={margin} data={data} {...chartProps}>
        {cartesianGrid && <CartesianGrid {...cartesianGrid} />}
        {cartesianAxis && <CartesianAxis {...cartesianAxis} />}
        {xAxis && <XAxis {...noLines} {...tick} {...xAxis} />}
        {yAxis && <YAxis {...noLines} {...tick} width={yAxisWidth} {...yAxis} />}
        {legend && <Legend {...legendProps} content={<CustomLegend {...legendProps} />} />}
        {lines &&
          Object.keys(lines).map((line, index) => (
            <Line
              key={`line_${index}`}
              strokeWidth={3}
              dot={false}
              activeDot={{ strokeWidth: 0, r: 3 }}
              stroke={lines[line].color || colors[index]}
              {...lines[line]}
            />
          ))}
        {bars &&
          Object.keys(bars).map((bar, index) => <Bar key={`bar_${index}`} fill={colors[index]} {...bars[bar]} />)}
        {areas &&
          Object.keys(areas).map((area, index) => (
            <Area activeDot={false} key={`area_${index}`} fill={colors[index]} {...areas[area]} />
          ))}
        {tooltip && <Tooltip {...tooltip} content={<CustomTooltip {...tooltip} />} />}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default Chart;
