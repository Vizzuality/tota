declare module '*.svg';
declare module '*.png';
declare module '*.jpg';

export interface IndicatorValue {
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
  fetchData: any;
  widget: any;
}

export interface ThemeType {
  title: string;
  slug: string;
  summary?: string;
  sections: ThemeSectionType[];
}

export interface OptionType {
  label: string;
  value: string;
}
