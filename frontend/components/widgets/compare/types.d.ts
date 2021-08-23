import { ChartProps } from '../types';

export interface CompareProps {
  data: any[];
  previousYearData: any[];
  dataDifference: number[];
  currentYear: number;
  chartType: string;
  chartConfig: ChartProps;
}
