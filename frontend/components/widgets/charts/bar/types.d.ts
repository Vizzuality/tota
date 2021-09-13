import { BarProps, XAxisProps, YAxisProps } from 'recharts';

export interface BarChartProps {
  data: any[];
  chartProps?: any;
  legend?: any;
  bars: BarProps[];
  cartesianAxis?: any;
  cartesianGrid?: any;
  xAxis?: XAxisProps;
  yAxis?: YAxisProps;
  tooltip?: any;
  width?: string | number;
  height?: string | number;
}
