export interface TagProps {
  label: string;
  value: string;
  color: string;
  removable?: boolean;
  onRemove?: (selection: string) => void;
}

export interface MenuOptionProp {
  label: string;
  value: string | number;
}

export interface MenuProps {
  options: MenuOptionProp[];
  onSelect: (selectedItem: MenuOptionProp) => void;
}

export interface LegendProps {
  payload: any;
  removable?: boolean;
  onChange?: (selection: string[]) => void;
  valueFormatter?: (value: string) => string;
  payloadFilter?: (payloadDatum?: any) => any;
}
