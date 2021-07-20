import { AreaProps, BarProps, LegendProps, LineProps, XAxisProps, YAxisProps } from 'recharts';

export interface ComposedChartProps {
  data: any[];
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
