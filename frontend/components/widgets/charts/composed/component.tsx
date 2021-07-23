import React, { FC } from 'react';
import {
  Area,
  AreaProps,
  Bar,
  BarProps,
  CartesianAxis,
  CartesianGrid,
  ComposedChart,
  Legend,
  LegendProps,
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
  legend: LegendProps;
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
  const { cartesianGrid, cartesianAxis, bars, areas, xAxis, yAxis, legend, lines, tooltip } = config;

  return (
    <ResponsiveContainer width="100%" height={500}>
      <ComposedChart width={400} height={200} data={data}>
        {cartesianGrid && <CartesianGrid {...cartesianGrid} />}
        {cartesianAxis && <CartesianAxis {...cartesianAxis} />}
        {xAxis && <XAxis {...xAxis} />}
        {yAxis && <YAxis {...yAxis} />}
        {/* @ts-expect-error: dunno why props erroring as using LegendProps */}
        {legend && <Legend {...legend} />}
        {lines &&
          Object.keys(lines).map((line, index) => (
            <Line
              key={`line_${index}`}
              strokeWidth={3}
              dot={false}
              activeDot={false}
              stroke={colors[index]}
              {...lines[line]}
            />
          ))}
        {bars &&
          Object.keys(bars).map((bar, index) => <Bar key={`bar_${index}`} {...bars[bar]} fill={colors[index]} />)}
        {areas &&
          Object.keys(areas).map((area, index) => <Area key={`area_${index}`} fill={colors[index]} {...areas[area]} />)}
        {tooltip && <Tooltip {...tooltip} />}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default Chart;
