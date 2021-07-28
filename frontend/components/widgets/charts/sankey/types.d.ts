export interface SankeyChartProps {
  data: any[];
  chartConfig: any;
  tooltip: any;
  sourceKey: string;
  targetKey: string;
  valueKey: string;
  sourceColors?: string[];
  targetColors?: string[];
  colorLinksBy?: 'source' | 'target';
}
