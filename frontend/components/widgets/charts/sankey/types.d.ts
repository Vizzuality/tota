export interface SankeyChartProps {
  data: any[];
  chartProps: any;
  tooltip: any;
  sourceKey: string;
  targetKey: string;
  valueKey: string;
  sourceColors?: string[];
  targetColors?: string[];
  colorLinksBy?: 'source' | 'target';
}
