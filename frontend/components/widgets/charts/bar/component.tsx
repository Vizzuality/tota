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

import { bottomLegend, getColorPalette, defaultGrid } from 'constants/charts';

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
  const colors = getColorPalette(bars.length);
  const [selectedData, setSelectedData] = useState(null);
  const { chartWidth, containerRef } = useChartWidth();
  const { layout } = chartProps;
  let yAxisWidth = 60;
  if (layout === 'vertical') {
    yAxisWidth += chartWidth < 600 ? 20 : 80;
  }
  const newBars = bars.map((bar, index) => ({
    ...bar,
    fill: bar.color || colors[index],
    hide: selectedData && !selectedData.includes(bar.dataKey),
  }));
  const handleLegendChange = (filtered: string[]) => setSelectedData(filtered);
  const yAxisTick = useCallback(
    ({ x, y, payload, tickFormatter }) => {
      return (
        <Text
          style={{ fill: '#314057', fontSize: 14 }}
          x={x}
          y={y}
          width={yAxisWidth}
          textAnchor="end"
          verticalAnchor="middle"
        >
          {tickFormatter ? tickFormatter(payload.value) : payload.value}
        </Text>
      );
    },
    [yAxisWidth],
  );
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
    <ResponsiveContainer ref={containerRef} width={width} height={height} debounce={100}>
      <BarChart data={data} {...chartProps}>
        {cartesianGrid && <CartesianGrid {...cartesianGrid} />}
        {cartesianAxis && <CartesianAxis {...cartesianAxis} />}
        {legend && (
          <Legend {...legendProps} content={<CustomLegend {...legendProps} onChange={handleLegendChange} />} />
        )}
        {xAxis && <XAxis {...tick} {...noLines} {...xAxis} />}
        {yAxis && <YAxis {...tick} {...noLines} width={yAxisWidth} tick={yAxisTick} {...yAxis} />}
        {/* @ts-expect-error: Dunno another type madness */}
        {bars && newBars.map((bar) => <Bar key={bar.dataKey as string} {...bar} />)}
        {tooltip && <Tooltip {...tooltip} content={<CustomTooltip {...tooltip} />} />}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
