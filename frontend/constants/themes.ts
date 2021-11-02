import { ThemeBaseType, ThemeType } from 'types';
import generalInsights from './themes/general-insights';
import tourismIndustryArrivals from './themes/tourism-industry-arrivals';
import airportInformation from './themes/airport-information';
import accommodationInformation from './themes/accommodation-information';
import tourismDevelopmentFounds from './themes/tourism-development-founds';
import tourismEmployment from './themes/tourism-employment';

const themes: ThemeType[] = [
  generalInsights,
  tourismIndustryArrivals,
  tourismEmployment,
  airportInformation,
  accommodationInformation,
  tourismDevelopmentFounds,
];

export const themesIndex: ThemeBaseType[] = [
  tourismIndustryArrivals,
  tourismEmployment,
  tourismDevelopmentFounds,
  accommodationInformation,
  airportInformation,
].map(({ title, slug, image }) => ({ title, slug, image }));

export default themes;
