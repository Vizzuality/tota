import React, { FC } from 'react';
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
  tooltip = { cursor: false },
}: BarChartProps) => {
  const yAxisWidth = 60;
  const legendStyle = !!yAxis ? { left: yAxisWidth + 2 } : {};

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} {...chartProps}>
        {cartesianGrid && <CartesianGrid {...cartesianGrid} />}
        {cartesianAxis && <CartesianAxis {...cartesianAxis} />}
        {legend && <Legend wrapperStyle={legendStyle} {...legend} content={<CustomLegend {...legend} />} />}
        {xAxis && <XAxis {...xAxis} />}
        {yAxis && <YAxis width={yAxisWidth} {...yAxis} />}
        {bars && Object.keys(bars).map((bar, index) => <Bar key={bar} fill={COLORS[index]} {...bars[bar]} />)}
        {tooltip && <Tooltip {...tooltip} content={<CustomTooltip {...tooltip} />} />}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
