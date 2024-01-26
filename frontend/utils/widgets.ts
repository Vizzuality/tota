import { format } from 'date-fns';

const jsonDataByWidgetTypes = {
  // *GENERAL INSIGHTS
  size_tourism_region: (data) => {
    return data?.map((item) => ({
      Region: item.name,
      km2: item.value,
    }));
  },
  population: (data) => {
    return data?.map((item) => ({
      Region: item.region,
      Population: `${item.value.toFixed(2)}%`,
    }));
  },
  tourism_revenue: (data) => {
    return data?.map((item) => ({
      Year: item.date,
      ['Million ($)']: item[Object.keys(item)[1]],
    }));
  },
  gdp_total: (data) => {
    return data?.map((item) => ({
      Year: item.date,
      GDP: item.Total,
    }));
  },
  gdp_tourism: (data) => {
    return data?.map((item) => ({
      Year: item.date,
      ['Million ($)']: item[Object.keys(item)[1]],
    }));
  },
  gdp_tourism_bc: (data) => {
    return data?.map((item) => ({
      Year: item.date,
      Percentage: `${item[Object.keys(item)[1]]}%`,
    }));
  },
  gdp_tourism_by_sector: (data) => {
    return data?.map((item) => ({
      Category: item.category_1,
      Percentage: `${item.value}%`,
    }));
  },
  tourism_employment: (data) => {
    return data?.map((item) => ({
      Region: item.region,
      ['People employed']: item.Other,
      ['People employed in tourism']: item.Tourism,
      ['Total people employed']: item.Tourism + item.Other,
      ['Percentage of people employed in tourism']: `${((item.Tourism * 100) / (item.Tourism + item.Other)).toFixed(
        2,
      )}%`,
    }));
  },
  //* BUSSINESS INVESTMENT ATTRACTION
  // TOURISM INDUSTRY & ARRIVALS
  tourism_businesses: (data) => {
    return data?.map((item) => ({
      Category: item.category_1,
      ['Nr. of tourism businesses']: item.value,
    }));
  },
  tourism_businesses_by_characteristic: (data, state) => {
    const { type } = state;
    if (type === 'biosphere') {
      return data?.map((item) => ({
        Category: item.category_1,
        ['Nr. of tourism businesses members of the biosphere commitment program']: item.value,
      }));
    }
    if (type === 'accessibility') {
      return data?.map((item) => ({
        CATEGORY: item.category_1,
        ['Nr. of tourism accessible businesses']: item.value,
      }));
    }
    if (type === 'indigenous') {
      return data?.map((item) => ({
        CATEGORY: item.category_1,
        ['Nr. of tourism businesses ownde by indigenous']: item.value,
      }));
    }
  },
  passenger_volume: (data) => {
    return data?.map((item) => ({
      Date: item.date,
      ['Domestic Flights']: item['Domestic Flights'],
      ['International Flights']: item['International Flights'],
    }));
  },
  domestic_arrivals: (data) => {
    return data?.map((item) => ({
      Date: item.date,
      ['British Columbia']: item['British Columbia'],
      ['British Columbia min-max']: `${item['British Columbia min-max'][0]} - ${item['British Columbia min-max'][1]}`,
      ['Cariboo Chilcotin Coast']: item['Cariboo Chilcotin Coast'],
      ['Cariboo Chilcotin Coast min-max']: `${item['Cariboo Chilcotin Coast min-max'][0]} - ${item['Cariboo Chilcotin Coast min-max'][1]}`,
      ['Kootenay Rockies']: item['Kootenay Rockies'],
      ['Kootenay Rockies min-max']: `${item['Kootenay Rockies min-max'][0]} - ${item['Kootenay Rockies min-max'][1]}`,
      ['Northern BC']: item['Northern BC'],
      ['Northern BC min-max']: `${item['Northern BC min-max'][0]} - ${item['Northern BC min-max'][1]}`,
      ['Thompson Okanagan']: item['Thompson Okanagan'],
      ['Thompson Okanagan min-max']: `${item['Thompson Okanagan min-max'][0]} - ${item['Thompson Okanagan min-max'][1]}`,
      ['Vancouver Island']: item['Vancouver Island'],
      ['Vancouver Island min-max']: `${item['Vancouver Island min-max'][0]} - ${item['Vancouver Island min-max'][1]}`,
    }));
  },
  seasonality: (data) => {
    return data?.map((item) => ({
      Date: item.date,
      Visitors: item.value,
    }));
  },
  seasonality_peak_vs_lowest: () => {
    // NO DATA
  },
  domestic_visitors_by_province: (data) => {
    return data?.map((item) => item);
  },
  domestic_overnight_visitors_by_city: (data) => {
    return data?.map((item) => item);
  },
  market_segmentation: (data) => {
    return data?.map((item) => item);
  },
  length_of_stay: (data) => {
    return data?.map((item) => ({
      Date: item.date,
      ...(item['British Columbia min-max'] && { ['British Columbia']: item['British Columbia'] }),
      ...(item['British Columbia min-max'] && {
        ['British Columbia min-max']: `${item['British Columbia min-max'][0]} - ${item['British Columbia min-max'][1]}`,
      }),
      ...(item['Cariboo Chilcotin Coast'] && { ['Cariboo Chilcotin Coast']: item['Cariboo Chilcotin Coast'] }),
      ...(item['Cariboo Chilcotin Coast min-max'] && {
        ['Cariboo Chilcotin Coast min-max']: `${item['Cariboo Chilcotin Coast min-max'][0]} - ${item['Cariboo Chilcotin Coast min-max'][1]}`,
      }),
      ...(item['Kootenay Rockies'] && { ['Kootenay Rockies']: item['Kootenay Rockies'] }),
      ...(item['Kootenay Rockies min-max'] && {
        ['Kootenay Rockies min-max']: `${item['Kootenay Rockies min-max'][0]} - ${item['Kootenay Rockies min-max'][1]}`,
      }),
      ...(item['Northern BC'] && { ['Northern BC']: item['Northern BC'] }),
      ...(item['Northern BC min-max'] && {
        ['Northern BC min-max']: `${item['Northern BC min-max'][0]} - ${item['Northern BC min-max'][1]}`,
      }),
      ...(item['Thompson Okanagan'] && { ['Thompson Okanagan']: item['Thompson Okanagan'] }),
      ...(item['Thompson Okanagan min-max'] && {
        ['Thompson Okanagan min-max']: `${item['Thompson Okanagan min-max'][0]} - ${item['Thompson Okanagan min-max'][1]}`,
      }),
      ...(item['Vancouver Island'] && { ['Vancouver Island']: item['Vancouver Island'] }),
      ...(item['Vancouver Island min-max'] && {
        ['Vancouver Island min-max']: `${item['Vancouver Island min-max'][0]} - ${item['Vancouver Island min-max'][1]}`,
      }),
    }));
  },
  travel_patterns: (data) => {
    return data?.map(() => ({
      // NEED MORE PARSED DATA
      // DATE: new Date(item.date * 1000).getMonth(),
    }));
  },
  // TOURISM EMPLOYMENT
  total_employment: (data) => {
    return data?.map((item) => ({
      Date: item.date,
      ...(item['British Columbia'] && { ['Nr. of people in British Columbia']: item['British Columbia'] }),
      ...(item['Cariboo Chilcotin Coast'] && {
        ['Nr. of people in Cariboo Chilcotin Coast']: item['Cariboo Chilcotin Coast'],
      }),
      ...(item['Kootenay Rockies'] && { ['Nr. of people in Kootenay Rockies']: item['Kootenay Rockies'] }),
      ...(item['Northern BC'] && { ['Nr. of people in Northern BC']: item['Northern BC'] }),
      ...(item['Thompson Okanagan'] && { ['Nr. of people in Thompson Okanagan']: item['Thompson Okanagan'] }),
      ...(item['Vancouver Island'] && { ['Nr. of people in Vancouver Island']: item['Vancouver Island'] }),
    }));
  },
  unemployment_rate: (data) => {
    return data?.map((item) => ({
      Date: item.date,
      ...(item['British Columbia'] && { ['Nr. of people in British Columbia']: item['British Columbia'] }),
      ...(item['Cariboo Chilcotin Coast'] && {
        ['Nr. of people in Cariboo Chilcotin Coast']: item['Cariboo Chilcotin Coast'],
      }),
      ...(item['Kootenay Rockies'] && { ['Nr. of people in Kootenay Rockies']: item['Kootenay Rockies'] }),
      ...(item['Northern BC'] && { ['Nr. of people in Northern BC']: item['Northern BC'] }),
      ...(item['Thompson Okanagan'] && { ['Nr. of people in Thompson Okanagan']: item['Thompson Okanagan'] }),
      ...(item['Vancouver Island'] && { ['Nr. of people in Vancouver Island']: item['Vancouver Island'] }),
    }));
  },
  total_tourism_employment: (data) => {
    return data?.map((item) => ({
      Date: item.date,
      ...(item['British Columbia'] && { ['Nr. of people in British Columbia']: item['British Columbia'] }),
      ...(item['Cariboo Chilcotin Coast'] && {
        ['Nr. of people in Cariboo Chilcotin Coast']: item['Cariboo Chilcotin Coast'],
      }),
      ...(item['Kootenay Rockies'] && { ['Nr. of people in Kootenay Rockies']: item['Kootenay Rockies'] }),
      ...(item['Northern BC'] && { ['Nr. of people in Northern BC']: item['Northern BC'] }),
      ...(item['Thompson Okanagan'] && {
        ['Nr. of people in Thompson Okanagan']: item['Thompson Okanagan'],
      }),
      ...(item['Vancouver Island'] && { ['Nr. of people in Vancouver Island']: item['Vancouver Island'] }),
    }));
  },
  tourism_to_total_employment: (data) => {
    return data?.map((item) => ({
      ...data(item.date && { Date: item.date }),
      [Object.keys(item)[1]]: `${item[Object.keys(item)[1]]}%`,
    }));
  },
  tourism_employment_by_sector: (data) => {
    return data?.map(() => ({
      // NO DATA
    }));
  },
  average_tourism_wages: (data) => {
    return data?.map((item) => ({
      Date: item.date,
      ...(item['British Columbia min-max'] && { ['British Columbia']: item['British Columbia'] }),
      ...(item['British Columbia min-max'] && {
        ['British Columbia min-max']: `${item['British Columbia min-max'][0]} - ${item['British Columbia min-max'][1]}`,
      }),
      ...(item['Cariboo Chilcotin Coast'] && { ['Cariboo Chilcotin Coast']: item['Cariboo Chilcotin Coast'] }),
      ...(item['Cariboo Chilcotin Coast min-max'] && {
        ['Cariboo Chilcotin Coast min-max']: `${item['Cariboo Chilcotin Coast min-max'][0]} - ${item['Cariboo Chilcotin Coast min-max'][1]}`,
      }),
      ...(item['Kootenay Rockies'] && { ['Kootenay Rockies']: item['Kootenay Rockies'] }),
      ...(item['Kootenay Rockies min-max'] && {
        ['Kootenay Rockies min-max']: `${item['Kootenay Rockies min-max'][0]} - ${item['Kootenay Rockies min-max'][1]}`,
      }),
      ...(item['Northern BC'] && { ['Northern BC']: item['Northern BC'] }),
      ...(item['Northern BC min-max'] && {
        ['Northern BC min-max']: `${item['Northern BC min-max'][0]} - ${item['Northern BC min-max'][1]}`,
      }),
      ...(item['Thompson Okanagan'] && { ['Thompson Okanagan']: item['Thompson Okanagan'] }),
      ...(item['Thompson Okanagan min-max'] && {
        ['Thompson Okanagan min-max']: `${item['Thompson Okanagan min-max'][0]} - ${item['Thompson Okanagan min-max'][1]}`,
      }),
      ...(item['Vancouver Island'] && { ['Vancouver Island']: item['Vancouver Island'] }),
      ...(item['Vancouver Island min-max'] && {
        ['Vancouver Island min-max']: `${item['Vancouver Island min-max'][0]} - ${item['Vancouver Island min-max'][1]}`,
      }),
    }));
  },
  employment_by_job_status: (data) => {
    return data?.map((item) => ({
      Date: item.date,
      ['Full Time']: item['Full Time'],
      ['Part Time']: item['Part Time'],
    }));
  },
  // ACCOMMODATION INFORMATION
  occupancy_rates: (data) => {
    return data?.map((item) => ({
      Date: format(new Date(parseInt(item.date, 10)), 'MM/dd/yyyy'),
      ...(item['British Columbia min-max'] && { ['British Columbia']: `${item['British Columbia']}%` }),
      ...(item['Cariboo Chilcotin Coast'] && { ['Cariboo Chilcotin Coast']: `${item['Cariboo Chilcotin Coast']}%` }),
      ...(item['Kootenay Rockies'] && { ['Kootenay Rockies']: `${item['Kootenay Rockies']}%` }),
      ...(item['Northern BC'] && { ['Northern BC']: `${item['Northern BC']}%` }),
      ...(item['Thompson Okanagan'] && { ['Thompson Okanagan']: `${item['Thompson Okanagan']}%` }),
      ...(item['Vancouver Island'] && { ['Vancouver Island']: `${item['Vancouver Island']}%` }),
    }));
  },
  average_daily_hotel_rate: (data, state) => {
    const { type } = state;
    if (type === 'historical') {
      return data?.map((item) => ({
        Date: format(new Date(parseInt(item.date, 10)), 'MM/dd/yyyy'),
        ...(item['British Columbia min-max'] && { ['British Columbia']: `${item['British Columbia']} $` }),
        ...(item['Cariboo Chilcotin Coast'] && { ['Cariboo Chilcotin Coast']: `${item['Cariboo Chilcotin Coast']} $` }),
        ...(item['Kootenay Rockies'] && { ['Kootenay Rockies']: `${item['Kootenay Rockies']} $` }),
        ...(item['Northern BC'] && { ['Northern BC']: `${item['Northern BC']} $` }),
        ...(item['Thompson Okanagan'] && { ['Thompson Okanagan']: `${item['Thompson Okanagan']} $` }),
        ...(item['Vancouver Island'] && { ['Vancouver Island']: `${item['Vancouver Island']} $` }),
      }));
    }
    if (type === 'weekly') {
      return data?.map((item) => ({
        Date: item.date,
        Region: item.region,
        Indicator: item.indicator,
        ['Average daily hotel rate']: `${item.value} $`,
      }));
    }
    if (type === 'monthly') {
      return data?.map((item) => ({
        Date: item.date,
        Region: item.region,
        Indicator: item.indicator,
        ['Average daily hotel rate']: `${item.value} $`,
      }));
    }
  },
  revenue_per_available_room: (data) => {
    return data?.map((item) => ({}));
  },
  // TOURISM DEVELOPMENT FUNDS
  total_funding_and_projects: (data) => {
    return data?.map((item) => ({}));
  },
  // VISITOR SPENDING
  spend_by_region: (data) => {
    return data?.map((item) => ({}));
  },
  spend_by_origin: (data) => {
    return data?.map((item) => ({}));
  },
  spend_by_market: (data) => {
    return data?.map((item) => ({}));
  },
  spend_by_item: (data) => {
    return data?.map((item) => ({}));
  },
  //* SUSTAINABILITY
  // LOCAL SATISFACTION
};

export const getParsedJSONData = (data, slug, state) => {
  console.log('slug', slug, 'data', data, 'state', state);
  const key = state.indicator || slug;
  return jsonDataByWidgetTypes[key](data, state);
};
