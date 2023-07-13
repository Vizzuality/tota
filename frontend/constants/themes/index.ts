import { ThemeFrontendDefinition, ThemeCategoryFrontendDefinition } from 'types';
import generalInsights from './general-insights';
import tourismIndustryArrivals from './tourism-industry-arrivals';
// import airportInformation from './airport-information';
import accommodationInformation from './accommodation-information';
import tourismDevelopmentFounds from './tourism-development-founds';
import tourismEmployment from './tourism-employment';
import visitorSpending from './visitor-spending';
import localSatisfaction from './local-satisfaction';
import additionalResources from './additional-resources';

export const THEMES_CATEGORIES: ThemeCategoryFrontendDefinition[] = [
  {
    slug: 'general_insights',
    label: 'General insights',
  },
  {
    slug: 'business_investment_attraction',
    label: 'Business Investment Attraction',
    children: [
      tourismIndustryArrivals,
      tourismEmployment,
      // airportInformation,
      accommodationInformation,
      tourismDevelopmentFounds,
      visitorSpending,
    ],
  },
  {
    slug: 'sustainability',
    label: 'Sustainability',
    children: [localSatisfaction],
  },
  {
    slug: 'additional_resources',
    label: 'Additional resources',
  },
];

export const THEMES: ThemeFrontendDefinition[] = [
  generalInsights,
  tourismIndustryArrivals,
  tourismEmployment,
  // airportInformation,
  accommodationInformation,
  tourismDevelopmentFounds,
  visitorSpending,
  localSatisfaction,
  additionalResources,
];
