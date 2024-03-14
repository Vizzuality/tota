import { format } from 'date-fns';
import { filterBySelectedYear } from './charts';

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
      ['Population (%)']: item.value.toFixed(2),
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
      ['Percentage (%)']: item[Object.keys(item)[1]],
    }));
  },
  gdp_tourism_by_sector: (data) => {
    return data?.map((item) => ({
      Category: item.category_1,
      ['Percentage (%)']: item.value,
    }));
  },
  tourism_employment: (data) => {
    return data?.map((item) => ({
      Region: item.region,
      ['People employed']: item.Other,
      ['People employed in tourism']: item.Tourism,
      ['Total people employed']: item.Tourism + item.Other,
      ['People employed in tourism (%)']: ((item.Tourism * 100) / (item.Tourism + item.Other)).toFixed(2),
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
        ['Nr. of tourism businesses']: item.value,
      }));
    }
    if (type === 'accessibility') {
      return data?.map((item) => ({
        CATEGORY: item.category_1,
        ['Nr. of tourism businesses']: item.value,
      }));
    }
    if (type === 'indigenous') {
      return data?.map((item) => ({
        CATEGORY: item.category_1,
        ['Nr. of tourism businesses']: item.value,
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
      ...(item['British Columbia'] && { ['British Columbia']: item['British Columbia'] }),
      ...(item['Cariboo Chilcotin Coast'] && { ['Cariboo Chilcotin Coast']: item['Cariboo Chilcotin Coast'] }),
      ...(item['Kootenay Rockies'] && { ['Kootenay Rockies']: item['Kootenay Rockies'] }),
      ...(item['Northern BC'] && { ['Northern BC']: item['Northern BC'] }),
      ...(item['Thompson Okanagan'] && { ['Thompson Okanagan']: item['Thompson Okanagan'] }),
      ...(item['Vancouver Coast and Mountains'] && {
        ['Vancouver Coast and Mountains']: item['Vancouver Coast and Mountains'],
      }),
      ...(item['Vancouver Island'] && { ['Vancouver Island']: item['Vancouver Island'] }),
    }));
  },
  seasonality: (data) => {
    return data?.map((item) => ({
      Date: item.date,
      ['Visitors (%)']: parseFloat(item.value.replaceAll('%', '')),
    }));
  },
  seasonality_peak_vs_lowest: (data) => {
    return [
      {
        ['Ratio domestic visitors']: data.props.children[6].props.children,
      },
    ];
  },
  domestic_visitors_by_province: (data) => {
    return data?.map((item) => item);
  },
  domestic_overnight_visitors_by_city: (data) => {
    const parsedData = data.map((o) =>
      Object.fromEntries(Object.entries(o).map(([k, v]) => [k.replaceAll(',', ''), v])),
    );

    return parsedData?.map((item) => item);
  },
  market_segmentation: (data) => {
    return data?.map((item) => item);
  },
  length_of_stay: (data) => {
    return data?.map((item) => ({
      Date: item.date,
      ...(item['British Columbia'] && { ['British Columbia']: item['British Columbia'] }),
      ...(item['British Columbia min-max'] && {
        ['British Columbia min']: item['British Columbia min-max'][0],
        ['British Columbia max']: item['British Columbia min-max'][1],
      }),

      ...(item['Cariboo Chilcotin Coast'] && { ['Cariboo Chilcotin Coast']: item['Cariboo Chilcotin Coast'] }),
      ...(item['Cariboo Chilcotin Coast min-max'] && {
        ['Cariboo Chilcotin Coast min']: item['Cariboo Chilcotin Coast min-max'][0],
        ['Cariboo Chilcotin Coast max']: item['Cariboo Chilcotin Coast min-max'][1],
      }),

      ...(item['Kootenay Rockies'] && { ['Kootenay Rockies']: item['Kootenay Rockies'] }),
      ...(item['Kootenay Rockies min-max'] && {
        ['Kootenay Rockies min']: item['Kootenay Rockies min-max'][0],
        ['Kootenay Rockies max']: item['Kootenay Rockies min-max'][1],
      }),

      ...(item['Northern BC'] && { ['Northern BC']: item['Northern BC'] }),
      ...(item['Northern BC min-max'] && {
        ['Northern BC min']: item['Northern BC min-max'][0],
        ['Northern BC max']: item['Northern BC min-max'][1],
      }),

      ...(item['Thompson Okanagan'] && { ['Thompson Okanagan']: item['Thompson Okanagan'] }),
      ...(item['Thompson Okanagan min-max'] && {
        ['Thompson Okanagan min']: item['Thompson Okanagan min-max'][0],
        ['Thompson Okanagan max']: item['Thompson Okanagan min-max'][1],
      }),

      ...(item['Vancouver Island'] && { ['Vancouver Island']: item['Vancouver Island'] }),
      ...(item['Vancouver Island min-max'] && {
        ['Vancouver Island min']: item['Vancouver Island min-max'][0],
        ['Vancouver Island max']: item['Vancouver Island min-max'][1],
      }),

      ...(item['Vancouver Coast and Mountains'] && {
        ['Vancouver Coast and Mountains']: item['Vancouver Coast and Mountains'],
      }),
      ...(item['Vancouver Coast and Mountains min-max'] && {
        ['Vancouver Coast and Mountains min']: item['Vancouver Coast and Mountains min-max'][0],
        ['Vancouver Coast and Mountains max']: item['Vancouver Coast and Mountains min-max'][1],
      }),
    }));
  },
  travel_patterns: (data) => {
    return data.map((item) => {
      const d = Object.assign({}, item);
      if (!!d.date) {
        d.date = format(new Date(parseInt(item.date, 10)), 'MM/dd/yyyy');
      }
      return d;
    });
  },
  // TOURISM EMPLOYMENT
  total_employment: (data) => {
    return data?.map((item) => ({
      Date: item.date,
      ...(item['British Columbia'] && { ['British Columbia (nr. of people)']: item['British Columbia'] }),
      ...(item['Cariboo Chilcotin Coast'] && {
        ['Cariboo Chilcotin Coast (nr. of people)']: item['Cariboo Chilcotin Coast'],
      }),
      ...(item['Kootenay Rockies'] && { ['Kootenay Rockies (nr. of people)']: item['Kootenay Rockies'] }),
      ...(item['Northern BC'] && { ['Northern BC (nr. of people)']: item['Northern BC'] }),
      ...(item['Thompson Okanagan'] && { ['Thompson Okanagan (nr. of people)']: item['Thompson Okanagan'] }),
      ...(item['Vancouver Coast and Mountains'] && {
        ['Vancouver Coast and Mountains (nr. of people)']: item['Vancouver Coast and Mountains'],
      }),
      ...(item['Vancouver Island'] && { ['Vancouver Island (nr. of people)']: item['Vancouver Island'] }),
    }));
  },
  unemployment_rate: (data) => {
    return data?.map((item) => ({
      Date: item.date,
      ...(item['British Columbia'] && { ['British Columbia (%)']: item['British Columbia'] }),
      ...(item['Cariboo Chilcotin Coast'] && {
        ['Cariboo Chilcotin Coast (%)']: item['Cariboo Chilcotin Coast'],
      }),
      ...(item['Kootenay Rockies'] && { ['Kootenay Rockies (%)']: item['Kootenay Rockies'] }),
      ...(item['Northern BC'] && { ['Northern BC (%)']: item['Northern BC'] }),
      ...(item['Thompson Okanagan'] && { ['Thompson Okanagan (%)']: item['Thompson Okanagan'] }),
      ...(item['Vancouver Coast and Mountains'] && {
        ['Vancouver Coast and Mountains (%)']: item['Vancouver Coast and Mountains'],
      }),
      ...(item['Vancouver Island'] && { ['Vancouver Island (%)']: item['Vancouver Island'] }),
    }));
  },
  total_tourism_employment: (data) => {
    return data?.map((item) => ({
      Date: item.date,
      ...(item['British Columbia'] && { ['British Columbia (nr. of people)']: item['British Columbia'] }),
      ...(item['Cariboo Chilcotin Coast'] && {
        ['Cariboo Chilcotin Coast (nr. of people)']: item['Cariboo Chilcotin Coast'],
      }),
      ...(item['Kootenay Rockies'] && { ['Kootenay Rockies (nr. of people)']: item['Kootenay Rockies'] }),
      ...(item['Northern BC'] && { ['Northern BC (nr. of people)']: item['Northern BC'] }),
      ...(item['Thompson Okanagan'] && {
        ['Thompson Okanagan (nr. of people)']: item['Thompson Okanagan'],
      }),
      ...(item['Vancouver Coast and Mountains'] && {
        ['Vancouver Coast and Mountains (nr. of people)']: item['Vancouver Coast and Mountains'],
      }),
      ...(item['Vancouver Island'] && { ['Vancouver Island (nr. of people)']: item['Vancouver Island'] }),
    }));
  },
  tourism_to_total_employment: (data, state) => {
    const { frequency } = state;
    if (frequency === 'monthly') {
      return data?.map((item) => ({
        Date: item.date,
        [`${Object.keys(item)[1]} (%)`]: item[Object.keys(item)[1]],
      }));
    }
    if (frequency === 'annually') {
      return data?.map((item) => ({
        [`${item.text.replaceAll('- {value}', '')}%`]: parseFloat(item.value.replaceAll('%', '')),
      }));
    }
  },
  tourism_employment_by_sector: (data) => {
    return data?.map((item) => item);
  },
  average_tourism_wages: (data) => {
    return data?.map((item) => ({
      Date: item.date,
      ...(item['British Columbia'] && { ['British Columbia ($/h)']: item['British Columbia'] }),
      ...(item['Cariboo Chilcotin Coast'] && { ['Cariboo Chilcotin Coast ($/h)']: item['Cariboo Chilcotin Coast'] }),
      ...(item['Kootenay Rockies'] && { ['Kootenay Rockies ($/h)']: item['Kootenay Rockies'] }),
      ...(item['Northern BC'] && { ['Northern BC ($/h)']: item['Northern BC'] }),
      ...(item['Thompson Okanagan'] && { ['Thompson Okanagan ($/h)']: item['Thompson Okanagan'] }),
      ...(item['Vancouver Coast and Mountains'] && {
        ['Vancouver Coast and Mountains ($/h)']: item['Vancouver Coast and Mountains'],
      }),
      ...(item['Vancouver Island'] && { ['Vancouver Island ($/h)']: item['Vancouver Island'] }),
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
  occupancy_rates: (data, state) => {
    const { type } = state;
    if (type === 'historical') {
      return data?.map((item) => ({
        Date: format(new Date(parseInt(item.date, 10)), 'MM/dd/yyyy'),
        ...(item['British Columbia'] && { ['British Columbia (%)']: item['British Columbia'] }),
        ...(item['Cariboo Chilcotin Coast'] && { ['Cariboo Chilcotin Coast (%)']: item['Cariboo Chilcotin Coast'] }),
        ...(item['Kootenay Rockies'] && { ['Kootenay Rockies (%)']: item['Kootenay Rockies'] }),
        ...(item['Northern BC'] && { ['Northern BC (%)']: item['Northern BC'] }),
        ...(item['Thompson Okanagan'] && { ['Thompson Okanagan (%)']: item['Thompson Okanagan'] }),
        ...(item['Vancouver Island'] && { ['Vancouver Island (%)']: item['Vancouver Island'] }),
      }));
    }
    return data?.map((item) => ({
      Date: item.date,
      Region: item.region,
      Indicator: item.indicator,
      ['Occupancy rate ($)']: item.value,
    }));
  },
  average_daily_hotel_rate: (data, state) => {
    const { type } = state;
    if (type === 'historical') {
      return data?.map((item) => ({
        Date: format(new Date(parseInt(item.date, 10)), 'MM/dd/yyyy'),
        ...(item['British Columbia'] && { ['British Columbia ($)']: item['British Columbia'] }),
        ...(item['Cariboo Chilcotin Coast'] && { ['Cariboo Chilcotin Coast ($)']: item['Cariboo Chilcotin Coast'] }),
        ...(item['Kootenay Rockies'] && { ['Kootenay Rockies ($)']: item['Kootenay Rockies'] }),
        ...(item['Northern BC'] && { ['Northern BC ($)']: item['Northern BC'] }),
        ...(item['Thompson Okanagan'] && { ['Thompson Okanagan ($)']: item['Thompson Okanagan'] }),
        ...(item['Vancouver Coast and Mountains'] && {
          ['Vancouver Coast and Mountains ($)']: item['Vancouver Coast and Mountains'],
        }),
        ...(item['Vancouver Island'] && { ['Vancouver Island ($)']: item['Vancouver Island'] }),
      }));
    }

    return data?.map((item) => ({
      Date: item.date,
      Region: item.region,
      Indicator: item.indicator,
      ['Average daily hotel rate ($)']: item.value,
    }));
  },
  revenue_per_available_room: (data, state) => {
    const { type } = state;
    if (type === 'historical') {
      return data?.map((item) => ({
        Date: format(new Date(parseInt(item.date, 10)), 'MM/dd/yyyy'),
        ...(item['British Columbia'] && { ['British Columbia ($)']: item['British Columbia'] }),
        ...(item['Cariboo Chilcotin Coast'] && {
          ['Cariboo Chilcotin Coast ($)']: item['Cariboo Chilcotin Coast'],
        }),
        ...(item['Kootenay Rockies'] && { ['Kootenay Rockies ($)']: item['Kootenay Rockies'] }),
        ...(item['Northern BC'] && { ['Northern BC ($)']: item['Northern BC'] }),
        ...(item['Thompson Okanagan'] && { ['Thompson Okanagan ($)']: item['Thompson Okanagan'] }),
        ...(item['Vancouver Coast and Mountains'] && {
          ['Vancouver Coast and Mountains ($)']: item['Vancouver Coast and Mountains'],
        }),
        ...(item['Vancouver Island'] && { ['Vancouver Island ($)']: item['Vancouver Island'] }),
      }));
    }
    return data?.map((item) => ({
      Date: item.date,
      Region: item.region,
      Indicator: item.indicator,
      ['RevPAR ($)']: item.value,
    }));
  },
  adna_occupancy_rates: (data, state) => {
    const { type } = state;
    if (type === 'historical') {
      return data?.map((item) => ({
        Date: format(new Date(parseInt(item.date, 10)), 'MM/dd/yyyy'),
        ...(item['British Columbia']
          ? { ['British Columbia ($)']: item['British Columbia'] }
          : { ['British Columbia ($)']: '' }),
        ...(item['Cariboo Chilcotin Coast'] && { ['Cariboo Chilcotin Coast (%)']: item['Cariboo Chilcotin Coast'] }),
        ...(item['Kootenay Rockies'] && { ['Kootenay Rockies (%)']: item['Kootenay Rockies'] }),
        ...(item['Northern BC'] && { ['Northern BC (%)']: item['Northern BC'] }),
        ...(item['Thompson Okanagan'] && { ['Thompson Okanagan (%)']: item['Thompson Okanagan'] }),
        ...(item['Vancouver Island'] && { ['Vancouver Island (%)']: item['Vancouver Island'] }),
      }));
    }
    return data?.map((item) => ({
      Date: item.date,
      Region: item.region,
      Indicator: item.indicator,
      ['Occupancy rate ($)']: item.value,
    }));
  },
  adna_average_daily_hotel_rate: (data, state) => {
    const { type } = state;
    if (type === 'historical') {
      return data?.map((item) => ({
        Date: format(new Date(parseInt(item.date, 10)), 'MM/dd/yyyy'),
        ...(item['British Columbia']
          ? { ['British Columbia ($)']: item['British Columbia'] }
          : { ['British Columbia ($)']: '' }),
        ...(item['Cariboo Chilcotin Coast'] && { ['Cariboo Chilcotin Coast ($)']: item['Cariboo Chilcotin Coast'] }),
        ...(item['Kootenay Rockies'] && { ['Kootenay Rockies ($)']: item['Kootenay Rockies'] }),
        ...(item['Northern BC'] && { ['Northern BC ($)']: item['Northern BC'] }),
        ...(item['Thompson Okanagan'] && { ['Thompson Okanagan ($)']: item['Thompson Okanagan'] }),
        ...(item['Vancouver Coast and Mountains'] && {
          ['Vancouver Coast and Mountains ($)']: item['Vancouver Coast and Mountains'],
        }),
        ...(item['Vancouver Island'] && { ['Vancouver Island ($)']: item['Vancouver Island'] }),
      }));
    }

    return data?.map((item) => ({
      Date: item.date,
      Region: item.region,
      Indicator: item.indicator,
      ['Average daily hotel rate ($)']: item.value,
    }));
  },
  adna_revenue_per_available_room: (data, state) => {
    const { type } = state;
    if (type === 'historical') {
      return data?.map((item) => ({
        Date: format(new Date(parseInt(item.date, 10)), 'MM/dd/yyyy'),
        ...(item['British Columbia']
          ? { ['British Columbia ($)']: item['British Columbia'] }
          : { ['British Columbia ($)']: '' }),
        ...(item['Cariboo Chilcotin Coast'] && {
          ['Cariboo Chilcotin Coast ($)']: item['Cariboo Chilcotin Coast'],
        }),
        ...(item['Kootenay Rockies'] && { ['Kootenay Rockies ($)']: item['Kootenay Rockies'] }),
        ...(item['Northern BC'] && { ['Northern BC ($)']: item['Northern BC'] }),
        ...(item['Thompson Okanagan'] && { ['Thompson Okanagan ($)']: item['Thompson Okanagan'] }),
        ...(item['Vancouver Coast and Mountains'] && {
          ['Vancouver Coast and Mountains ($)']: item['Vancouver Coast and Mountains'],
        }),
        ...(item['Vancouver Island'] && { ['Vancouver Island ($)']: item['Vancouver Island'] }),
      }));
    }
    return data?.map((item) => ({
      Date: item.date,
      Region: item.region,
      Indicator: item.indicator,
      ['RevPAR ($)']: item.value,
    }));
  },
  // TOURISM DEVELOPMENT FUNDS
  total_funding_and_projects: (data, state, indicatorValues) => {
    const filteredCount = filterBySelectedYear(indicatorValues, state.year, true).filter(
      (x) => x.indicator === 'development_funds_by_source',
    );

    const { year } = state;
    if (year === 'all_years') {
      return data
        ?.map(() => ({
          ['CERIP ($)']: Intl.NumberFormat().format(data[0].CERIP),
          ['Nr. Projects CERIP']: filteredCount.filter((f) => f.category_1 === 'CERIP')[0].value,
          ['StrongerBC ($)']: Intl.NumberFormat().format(data[1].StrongerBC),
          ['Nr. Projects StrongerBC']: filteredCount.filter((f) => f.category_1 === 'StrongerBC')[0].value,
        }))
        .slice(0, 1);
    }
    return data
      ?.map((item) => ({
        ...(item.CERIP && { ['CERIP $']: Intl.NumberFormat().format(data[0].CERIP) }),
        ...(item.CERIP && { ['Nr. Projects CERIP']: filteredCount.filter((f) => f.category_1 === 'CERIP')[0].value }),
        ...(item.StrongerBC && { ['StrongerBC ($)']: Intl.NumberFormat().format(data[0].StrongerBC) }),
        ...(item.StrongerBC && {
          ['Nr. Projects StrongerBC']: filteredCount.filter((f) => f.category_1 === 'StrongerBC')[0].value,
        }),
      }))
      .slice(0, 1);
  },
  // VISITOR SPENDING
  spend_by_region: (data) => {
    return data?.map((item) => ({
      Date: item.date,
      ...(item['British Columbia'] && { ['British Columbia ($)']: item['British Columbia'] }),
      ...(item['Cariboo Chilcotin Coast'] && { ['Cariboo Chilcotin Coast ($)']: item['Cariboo Chilcotin Coast'] }),
      ...(item['Kootenay Rockies'] && { ['Kootenay Rockies ($)']: item['Kootenay Rockies'] }),
      ...(item['Northern BC'] && { ['Northern BC ($)']: item['Northern BC'] }),
      ...(item['Thompson Okanagan'] && { ['Thompson Okanagan ($)']: item['Thompson Okanagan'] }),
      ...(item['Vancouver Coast and Mountains'] && {
        ['Vancouver Coast and Mountains ($)']: item['Vancouver Coast and Mountains'],
      }),
      ...(item['Vancouver Island'] && { ['Vancouver Island ($)']: item['Vancouver Island'] }),
    }));
  },
  spend_by_origin: (data) => {
    return data?.map((item) => ({
      Date: item.date,
      ['Domestic ($)']: item['Domestic'],
      ['International ($)']: item['International'],
    }));
  },
  spend_by_market: (data) => {
    return data?.map((item) => item);
  },
  spend_by_item: (data) => {
    return data?.map((item) => ({
      Date: item.date,
      ...(item['Accommodation'] && { ['Accommodation ($)']: item['Accommodation'] }),
      ...(item['Clothes and Gifts'] && { ['Clothes and Gifts ($)']: item['Clothes and Gifts'] }),
      ...(item['Food and Beverage'] && { ['Food & Beverage ($)']: item['Food and Beverage'] }),
      ...(item['Recreation and Entertainment'] && {
        ['Recreation and Entertainment ($)']: item['Recreation and Entertainment'],
      }),
      ...(item['Transportation'] && { ['Transportation ($)']: item['Transportation'] }),
      ...(item['Others (Souvenirs, Shopping, Etc.)'] && { ['Others']: item['Others (Souvenirs, Shopping, Etc.)'] }),
    }));
  },
  //* SUSTAINABILITY
  // LOCAL SATISFACTION
};

export const getParsedJSONData = (data, slug, state, indicatorValues) => {
  const key = state.indicator || slug;
  return jsonDataByWidgetTypes[key](data, state, indicatorValues);
};
