import React, { FC, useState } from 'react';
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
import { getColorPalette, defaultGrid, defaultTooltip, bottomLegend } from 'constants/charts';
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
  const colors = getColorPalette(Object.keys(lines || {}).length);
  const [selectedData, setSelectedData] = useState(null);
  const newLines = Object.keys(lines).reduce(
    (acc, lineKey, index) => ({
      ...acc,
      [lineKey]: {
        ...lines[lineKey],
        color: lines[lineKey].color || colors[index],
        hide: selectedData && !selectedData.includes(lines[lineKey].dataKey),
      },
    }),
    {},
  );
  const handleLegendChange = (filtered: string[]) => setSelectedData(filtered);

  return (
    <ResponsiveContainer width="100%" height={400} debounce={100}>
      <LineChart data={data} margin={margin} {...chartProps}>
        {legend && (
          <Legend {...legendProps} content={<CustomLegend {...legendProps} onChange={handleLegendChange} />} />
        )}
        {cartesianGrid && <CartesianGrid {...cartesianGrid} />}
        {cartesianAxis && <CartesianAxis {...cartesianAxis} />}
        {xAxis && <XAxis {...tick} {...noLines} {...xAxis} />}
        {yAxis && <YAxis {...tick} {...noLines} width={yAxisWidth} {...yAxis} />}
        {newLines &&
          Object.keys(newLines).map((line, index) => (
            <Line
              key={`line_${index}`}
              strokeWidth={3}
              dot={false}
              activeDot={{ strokeWidth: 0, r: 3 }}
              stroke={newLines[line].color}
              {...newLines[line]}
            />
          ))}
        {tooltip && <Tooltip {...tooltip} content={<CustomTooltip {...tooltip} />} />}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
