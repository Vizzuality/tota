import { LineProps, XAxisProps, YAxisProps } from 'recharts';

export interface LineChartProps {
  data: any[];
  chartProps: any;
  legend: any;
  lines: LineProps;
  cartesianAxis?: any;
  cartesianGrid?: any;
  xAxis?: XAxisProps;
  yAxis?: YAxisProps;
  tooltip: any;
}
