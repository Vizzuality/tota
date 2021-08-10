export interface LegendProps {
  payload: any;
  removable?: boolean;
  onChange?: (selection: string[]) => void;
  valueFormatter?: (value: string) => string;
  payloadFilter?: (payloadDatum?: any) => any;
}
