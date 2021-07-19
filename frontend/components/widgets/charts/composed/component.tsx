import React, { FC } from 'react';
import {
  Area,
  AreaProps,
  Bar,
  BarProps,
  CartesianAxis,
  CartesianGrid,
  ComposedChart,
  Line,
  LineProps,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  XAxisProps,
  YAxis,
  YAxisProps,
} from 'recharts';
import { colors } from 'constants/charts';

export interface ConfigProps {
  areas: AreaProps;
  lines: LineProps;
  bars: BarProps;
  cartesianAxis?: any;
  cartesianGrid?: any;
  xAxis?: XAxisProps;
  yAxis?: YAxisProps;
  tooltip: any;
}

export interface ChartProps {
  data: any[];
  config: ConfigProps;
}

const Chart: FC<ChartProps> = ({ data, config }: ChartProps) => {
  const { cartesianGrid, cartesianAxis, bars, areas, xAxis, yAxis, lines, tooltip } = config;

  return (
    <ResponsiveContainer width="100%" height={500}>
      <ComposedChart width={400} height={200} data={data}>
        {cartesianGrid && <CartesianGrid {...cartesianGrid} />}
        {cartesianAxis && <CartesianAxis {...cartesianAxis} />}
        {xAxis && <XAxis {...xAxis} />}
        {yAxis && <YAxis {...yAxis} />}
        {lines && Object.keys(lines).map((line, index) => <Line key={line} {...lines[line]} stroke={colors[index]} />)}
        {bars && Object.keys(bars).map((bar, index) => <Bar key={bar} {...bars[bar]} fill={colors[index]} />)}
        {areas && Object.keys(areas).map((area, index) => <Area key={area} fill={colors[index]} {...areas[area]} />)}
        {tooltip && <Tooltip {...tooltip} />}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default Chart;
