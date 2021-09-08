import { ChartProps } from '../types';

export interface CompareProps {
  data: any[];
  changeToPreviousYear: { [key: string]: number };
  currentYear: number;
  chartType: string;
  chartConfig: ChartProps;
}
