import React, { FC, useState, useCallback } from 'react';
import {
  ResponsiveContainer,
  Bar,
  BarChart,
  CartesianGrid,
  CartesianAxis,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  Text,
} from 'recharts';

import type { BarChartProps } from './types';
import CustomTooltip from 'components/widgets/charts/common/tooltip';
import CustomLegend from 'components/widgets/charts/common/legend';
import { useChartWidth } from 'hooks/charts';

import { bottomLegend, COLORS, defaultGrid } from 'constants/charts';

const Chart: FC<BarChartProps> = ({
  data,
  chartProps = {},
  cartesianGrid = defaultGrid,
  cartesianAxis,
  legend = bottomLegend,
  xAxis,
  yAxis = {},
  bars,
  width = '100%',
  height = 500,
  tooltip = { cursor: false },
}: BarChartProps) => {
  const [selectedData, setSelectedData] = useState(null);
  const { chartWidth, containerRef } = useChartWidth();
  const { layout } = chartProps;
  let yAxisWidth = 60;
  if (layout === 'vertical') {
    yAxisWidth += chartWidth < 600 ? 20 : 80;
  }
  const legendStyle = !!yAxis ? { paddingLeft: yAxisWidth - 2 } : {};

  const newBars = bars.map((bar, index) => ({
    ...bar,
    fill: bar.color || COLORS[index],
    hide: selectedData && !selectedData.includes(bar.dataKey),
  }));
  const handleLegendChange = (filtered: string[]) => setSelectedData(filtered);
  const yAxisTick = useCallback(
    ({ x, y, payload, tickFormatter }) => {
      return (
        <Text x={x} y={y} width={yAxisWidth} textAnchor="end" verticalAnchor="middle">
          {tickFormatter ? tickFormatter(payload.value) : payload.value}
        </Text>
      );
    },
    [yAxisWidth],
  );

  return (
    <ResponsiveContainer ref={containerRef} width={width} height={height} debounce={100}>
      <BarChart data={data} {...chartProps}>
        {cartesianGrid && <CartesianGrid {...cartesianGrid} />}
        {cartesianAxis && <CartesianAxis {...cartesianAxis} />}
        {legend && (
          <Legend
            wrapperStyle={legendStyle}
            {...legend}
            content={<CustomLegend {...legend} onChange={handleLegendChange} />}
          />
        )}
        {xAxis && <XAxis {...xAxis} />}
        {yAxis && <YAxis width={yAxisWidth} tick={yAxisTick} {...yAxis} />}
        {bars && newBars.map((bar) => <Bar key={bar.dataKey as string} {...bar} />)}
        {tooltip && <Tooltip {...tooltip} content={<CustomTooltip {...tooltip} />} />}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
