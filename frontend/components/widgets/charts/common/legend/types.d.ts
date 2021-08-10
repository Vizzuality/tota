export interface LegendProps {
  payload: any;
  valueFormatter?: (value: string) => string;
  payloadFilter?: (payloadDatum?: any) => any;
}
