import type { OptionType } from 'types';

export interface TabsProps {
  options: OptionType[];
  selectedValue: string;
  className?: string;
  onChange?: (selectedValue: string) => void;
}
