import React, { FC, useState } from 'react';
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
} from 'recharts';
import { BarChartProps } from './types';
import CustomTooltip from 'components/widgets/charts/common/tooltip';
import CustomLegend from 'components/widgets/charts/common/legend';

import { COLORS } from 'constants/charts';

const Chart: FC<BarChartProps> = ({
  data,
  chartProps,
  cartesianGrid = {
    height: '1px',
    strokeDasharray: '0',
  },
  cartesianAxis,
  legend,
  xAxis,
  yAxis,
  bars,
  width = '100%',
  height = 500,
  tooltip = { cursor: false },
}: BarChartProps) => {
  const [selectedData, setSelectedData] = useState(null);
  const yAxisWidth = 60;
  const legendStyle = !!yAxis ? { paddingLeft: yAxisWidth - 2 } : {};

  const newBars = bars.map((bar, index) => ({
    ...bar,
    fill: COLORS[index],
    hide: selectedData && !selectedData.includes(bar.dataKey),
  }));
  const handleLegendChange = (filtered: string[]) => setSelectedData(filtered);

  return (
    <ResponsiveContainer width={width} height={height}>
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
        {yAxis && <YAxis width={yAxisWidth} {...yAxis} />}
        {/* @ts-expect-error: dunno why props erroring */}
        {bars && newBars.map((bar) => <Bar key={bar.dataKey as string} {...bar} />)}
        {tooltip && <Tooltip {...tooltip} content={<CustomTooltip {...tooltip} />} />}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
