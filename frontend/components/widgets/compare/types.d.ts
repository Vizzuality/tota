import { IndicatorValue } from 'types';
import { ChartProps } from '../types';

export interface CompareProps {
  data: IndicatorValue[];
  changeData: IndicatorValue[];
  currentYear: number;
  mergeBy: string;
  labelKey: string;
  valueKey: string;
}
