import { LegendProps, PieProps } from 'recharts';

export interface PieChartProps {
  data: any[];
  chartProps: any;
  pies: PieProps[];
  legend?: LegendProps;
  tooltip?: any;
}
