export interface Fund {
  name: string;
  color: string;
  count: number;
  volume: number;
}

export interface TooltipProps {
  funds: Fund[];
  regionName: string;
  year: string | number;
}
