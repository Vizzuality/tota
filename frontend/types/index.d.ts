import { ReactNode } from 'react';

declare module '*.svg';
declare module '*.png';
declare module '*.jpg';

export interface IndicatorValue {
  indicator?: string;
  category_1?: string;
  category_2?: string;
  date?: string;
  region: string;
  region_slug: string;
  value: number;
}

export interface Indicator {
  slug: string;
  indicator_values: IndicatorValue[];
}

export interface ThemeSectionType {
  title: string;
  subTitle?: string;
  description: string;
  notes?: string;
  initialState?: any;
  fetchParams: (state: any) => any;
  fetchWidgetProps: (indicatorValues: IndicatorValue[], state: any) => any;
}

export interface ThemeBaseType {
  title: string;
  slug: string;
  image?: string;
}

export interface ThemeType extends ThemeBaseType {
  summary?: string;
  sections: ThemeSectionType[];
}

export interface OptionType {
  label: string;
  value: string;
}

export interface WidgetWrapperProps {
  children: ReactNode;
}
