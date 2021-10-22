import type { ControlProps } from '../control/types';

export interface ControlsProps {
  state: any;
  onControlChange: (name: string, selectedValue: string) => void;
  className?: string;
  controls: ControlProps[];
}
