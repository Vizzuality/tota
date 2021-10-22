import type { TabsProps } from 'components/tabs/types';
import type { SelectProps } from 'components/forms/select/types';

type TabsSelectType = SelectProps & TabsProps;

export interface ControlProps extends TabsSelectType {
  type: 'tabs' | 'select';
  side: 'left' | 'right';
  name: string;
  onControlChange: (name: string, selectedValue: string) => void;
  value: string;
}
