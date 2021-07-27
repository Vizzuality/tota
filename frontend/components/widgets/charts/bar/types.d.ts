import { BarProps, XAxisProps, YAxisProps } from 'recharts';

export interface BarChartProps {
  data: any[];
  chartProps: any;
  legend: LegendProps;
  bars: BarProps;
  cartesianAxis?: any;
  cartesianGrid?: any;
  xAxis?: XAxisProps;
  yAxis?: YAxisProps;
  tooltip: any;
}