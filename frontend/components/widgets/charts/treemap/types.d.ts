export interface TreemapDataPoint {
  name: string;
  value: number;
  color?: string;
}

export interface TreemapChartProps {
  data: TreemapDataPoint[];
  dataKey: string;
  chartProps: any;
  tooltip: any;
  width?: string | number;
  height?: string | number;
}
