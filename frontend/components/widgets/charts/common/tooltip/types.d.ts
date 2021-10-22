export interface TooltipProps {
  active: boolean;
  label: string;
  payload: any;
  totalFormatter?: (label: string) => string;
  labelFormatter?: (label: string) => string;
  valueFormatter?: (value: string) => string;
  payloadFilter?: (payloadDatum?: any) => any;
}
