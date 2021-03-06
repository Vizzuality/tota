import { BarChartProps } from './charts/bar/types';
import { PieChartProps } from './charts/pie/types';
import { LineChartProps } from './charts/line/types';
import { ComposedChartProps } from './charts/composed/types';
import { TextProps } from './text/types';
import { RankProps } from './rank/types';

export type ChartProps = BarChartProps | PieChartProps | LineChartProps | ComposedChartProps;
export type WidgetProps = ChartProps | TextProps | RankProps;
