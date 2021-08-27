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
  initialState?: any;
  fetchParams: (state: any) => any;
  widget: any;
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
