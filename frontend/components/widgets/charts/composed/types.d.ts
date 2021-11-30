import { AreaProps, BarProps, LineProps, XAxisProps, YAxisProps } from 'recharts';

export interface ComposedChartProps {
  data: any[];
  chartProps: any;
  areas: AreaProps;
  lines: LineProps;
  bars: BarProps;
  legend: any;
  cartesianAxis?: any;
  cartesianGrid?: any;
  xAxis?: XAxisProps;
  yAxis?: YAxisProps;
  tooltip: any;
}
