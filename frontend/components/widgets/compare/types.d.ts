import { IndicatorValue } from 'types';
import { ChartProps } from '../types';

export interface CompareProps {
  data: IndicatorValue[];
  changeMap: { [k: string]: string };
  colors?: { [k: string]: string };
  currentYear: number;
  mergeBy: string;
  labelKey: string;
  valueKey: string;
  unit: string;
}
