import { PieProps } from 'recharts';

export interface PieChartProps {
  data: any[];
  chartProps: any;
  pies: PieProps[];
  legend?: any;
  tooltip?: any;
}
