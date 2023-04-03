import { ThemeFrontendDefinition, ThemeCategoryFrontendDefinition } from 'types';
import generalInsights from './themes/general-insights';
import tourismIndustryArrivals from './themes/tourism-industry-arrivals';
// import airportInformation from './themes/airport-information';
import accommodationInformation from './themes/accommodation-information';
import tourismDevelopmentFounds from './themes/tourism-development-founds';
import tourismEmployment from './themes/tourism-employment';
import visitorSpending from './themes/visitor-spending';
import localSatisfaction from './themes/local-satisfaction';
import additionalResources from './themes/additional-resources';

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
