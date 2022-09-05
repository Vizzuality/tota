import { PieProps } from 'recharts';

interface CenterLabelProps {
  title: string;
  value: string;
}

export interface CustomLabelProps {
  viewBox?: any;
  title: string;
  value: string;
}

export interface PieChartProps {
  data: any[];
  chartProps: any;
  pies: PieProps[];
  legend?: any;
  tooltip?: any;
  centerLabel?: CenterLabelProps;
}
