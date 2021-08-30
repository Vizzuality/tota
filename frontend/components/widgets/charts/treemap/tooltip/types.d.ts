export interface TooltipProps {
  active: boolean;
  payload: any;
  valueFormatter?: (value: string) => string;
}
