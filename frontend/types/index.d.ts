import { ReactNode } from 'react';

export interface AdditionalResource {
  id: number;
  title: string;
  group: string;
  url: string;
}

export interface User {
  email: string;
  name?: string;
  account_type: 'admin' | 'user';
}

export interface IndicatorValue {
  indicator?: string;
  category_1?: string;
  category_2?: string;
  date?: string;
  region: string;
  region_slug?: string;
  value: number;
}

export interface Region {
  id: number;
  name: string;
  slug: string;
  parent_id: number;
  parent?: Region;
}

export interface Organization {
  name: string;
  website_url: string;
  latitude: string;
  longitude: string;
  indigenous_ownership: boolean;
  biosphere_program_member: boolean;
  accessibility: boolean;
  region: string;
  subregion?: string;
  business_type_1: string;
  business_type_2?: string;
  tags?: string;
  features_number: number;
  source: string;
}

interface Source {
  text: string;
  link?: string;
  note?: string;
}

export interface ThemeCategoryFrontendDefinition {
  slug: string;
  label: string;
  children?: ThemeFrontendDefinition[];
}

export interface ThemeFrontendDefinition {
  slug: string;
  image?: string | StaticImageData;
  widgets?: WidgetFrontendDefinition[];
}

export interface WidgetFrontendDefinition {
  slug: string;
  initialState?: any;
  fetchParams: (state: any) => any;
  fetchWidgetProps: (indicatorValues: IndicatorValue[], state: any) => any;
}

export interface WidgetAPI {
  slug: string;
  title: string;
  sub_title?: string;
  description: string;
  note?: string;
  sources?: Source[];
  regions_whitelist?: string[];
}

export interface ThemeAPI {
  slug: string;
  title: string;
  description?: string;
}

export interface ThemeCategoriesAPI {
  slug: string;
  label: string;
  children: ThemeAPI[];
}

export type Widget = WidgetAPI & WidgetFrontendDefinition;
export type Theme = ThemeAPI & ThemeFrontendDefinition;

export interface OptionType {
  label: string;
  value: string;
}

export interface WidgetWrapperProps {
  children: ReactNode;
}
