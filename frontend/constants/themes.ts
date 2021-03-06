import { ThemeFrontendDefinition } from 'types';
import generalInsights from './themes/general-insights';
import tourismIndustryArrivals from './themes/tourism-industry-arrivals';
import airportInformation from './themes/airport-information';
import accommodationInformation from './themes/accommodation-information';
import tourismDevelopmentFounds from './themes/tourism-development-founds';
import tourismEmployment from './themes/tourism-employment';

const themes: ThemeFrontendDefinition[] = [
  generalInsights,
  tourismIndustryArrivals,
  tourismEmployment,
  airportInformation,
  accommodationInformation,
  tourismDevelopmentFounds,
];

export default themes;
