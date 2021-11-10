import uniq from 'lodash/uniq';
import startCase from 'lodash/startCase';
import groupBy from 'lodash/groupBy';
import meanBy from 'lodash/meanBy';
import { IndicatorValue, Region, ThemeType } from 'types';

import forestImage from 'images/home/image-forest.png';

import {
  expandToFullYear,
  filterBySelectedYear,
  getAvailableYearsOptions,
  getWithMinMaxAreas,
  getColorsByRegionName,
  getOptions,
  getStackedBarsData,
  getUnitLabel,
  mergeForChart,
} from 'utils/charts';
import { compactNumberTickFormatter, shortMonthName, previousYear } from './utils';
import { defaultTooltip, bottomLegend } from 'constants/charts';
import { getMapUrl } from 'hooks/map';
import { getEconomicRegionsLayer } from 'hooks/layers';

const ECONOMIC_REGION_COLORS = {
  Cariboo: '#BB9075',
  Kootenay: '#405E62',
  'Thompson-Okanagan': '#76ACA9',
  'Vancouver Island and Coast': '#4F91CD',
  'British Columbia': '#314057',
  Northeast: '#A9B937',
  'North Coast and Nechako': '#00A572',
};

const theme: ThemeType = {
  title: 'Tourism Employment',
  slug: 'tourism-employment',
  image: forestImage,
  sections: [
    {
      title: 'Economic region vs Tourism region',
      description: `Due to different sources and their varying monitoring approaches, the information presented in this section is related to different regional administrative boundaries (either economic regions or tourism regions). To see the different boundaries, please go to the map.`,
      fetchParams: () => false,
      fetchWidgetProps(_rawData: IndicatorValue[] = [], state: any): any {
        const selectedRegion = state.selectedRegion.slug === 'british_columbia' ? null : state.selectedRegion.slug;

        return {
          viewOnMap: {
            title: 'View Region on Map',
            link: getMapUrl(selectedRegion, ['tourism_regions', 'economic_regions']),
          },
          type: 'map',
          data: {},
          selectedRegion,
          disableHighlight: true,
          extraLayers: [getEconomicRegionsLayer(selectedRegion)].filter((x) => x),
          prependExtraLayers: true,
          includeTourismRegionLabels: false,
        };
      },
    },
    {
      title: 'Total employment',
      description: `Total number of people employed in the selected region (see the header for totals).`,
      note: 'Figures include full and part time employment. Data is presented for economic regions.',
      sources: [
        {
          text: 'Statistics Canada - Labour Force Surver',
          link: 'https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1410038702',
        },
      ],
      initialState: {
        year: 'all_years',
      },
      fetchParams: (state: any) => {
        const anySubRegions = state.selectedRegion.children && state.selectedRegion.children.length > 0;
        const region = anySubRegions
          ? state.selectedRegion.children.map((x) => x.slug)
          : [state.selectedRegion.slug, state.selectedRegion.parent?.slug].filter((x) => x);

        return {
          slug: 'total_employment_by_economic_region',
          region,
        };
      },
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const filtered = filterBySelectedYear(rawData, state.year);
        let chartData = mergeForChart({ data: filtered, mergeBy: 'date', labelKey: 'category_2', valueKey: 'value' });
        const regions = uniq(rawData.map((x) => x.category_2));
        let areas = [];
        if (state.year !== 'all_years') {
          chartData = expandToFullYear(chartData);
          [chartData, areas] = getWithMinMaxAreas(chartData, rawData, 'category_2', ECONOMIC_REGION_COLORS);
        }

        return {
          type: 'charts/composed',
          data: chartData,
          controls: [{ type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, true) }],
          lines: regions.map((x) => ({ dataKey: x, color: ECONOMIC_REGION_COLORS[x] })),
          chartProps: {
            margin: {
              top: 35,
              left: 10,
            },
          },
          areas,
          xAxis: {
            dataKey: 'date',
            tickFormatter: state.year !== 'all_years' && shortMonthName,
          },
          yAxis: {
            tickFormatter: compactNumberTickFormatter,
            label: getUnitLabel('Nr. of people'),
          },
          legend: {
            ...bottomLegend,
            payloadFilter: (y) => !y.value.includes('min-max'),
          },
          tooltip: {
            ...defaultTooltip,
            payloadFilter: (y) => !y.name.includes('min-max'),
          },
        };
      },
    },
    {
      title: 'Unemployment rate',
      description: `Unemployment rates for the selected regions by month.`,
      note: 'Figures include full and part time employment. Data is presented for economic regions.',
      sources: [
        {
          text: 'Statistics Canada - Labour Force Surver',
          link: 'https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1410038702',
        },
      ],
      initialState: {
        year: 'all_years',
      },
      fetchParams: (state: any) => {
        const anySubRegions = state.selectedRegion.children && state.selectedRegion.children.length > 0;
        const region = anySubRegions
          ? state.selectedRegion.children.map((x) => x.slug)
          : [state.selectedRegion.slug, state.selectedRegion.parent?.slug].filter((x) => x);

        return {
          slug: 'total_unemployment_rate_by_economic_region',
          region,
        };
      },
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const filtered = filterBySelectedYear(rawData, state.year);
        let chartData = mergeForChart({ data: filtered, mergeBy: 'date', labelKey: 'category_2', valueKey: 'value' });
        const regions = uniq(rawData.map((x) => x.category_2));
        let areas = [];
        if (state.year !== 'all_years') chartData = expandToFullYear(chartData);
        if (state.year !== 'all_years' && state.selectedRegion.parent) {
          [chartData, areas] = getWithMinMaxAreas(chartData, rawData, 'category_2', ECONOMIC_REGION_COLORS);
        }

        return {
          type: 'charts/composed',
          data: chartData,
          controls: [{ type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, true) }],
          lines: regions.map((x) => ({ dataKey: x, color: ECONOMIC_REGION_COLORS[x] })),
          areas,
          xAxis: {
            dataKey: 'date',
            tickFormatter: state.year !== 'all_years' && shortMonthName,
          },
          yAxis: {
            tickFormatter: (val) => `${val}%`,
          },
          legend: {
            ...bottomLegend,
            payloadFilter: (y) => !y.value.includes('min-max'),
          },
          tooltip: {
            ...defaultTooltip,
            valueFormatter: (value) => `${value.toFixed(2)}%`,
            payloadFilter: (y) => !y.name.includes('min-max'),
          },
        };
      },
    },
    {
      title: 'Total tourism employment',
      description: `Total tourism employment in the selected regions per month.`,
      note: 'Figures include full and part time employment. Data is presented for tourism regions.',
      sources: [
        {
          text: 'Go2HR Employment Tracker',
          link: 'https://www.go2hr.ca/bc-tourism-and-hospitality-labour-market-information-employment-tracker',
          note: 'based on Labour Force Survey information, but data is selected and transformed, focusing on specific tourism and hospitality occupations and presenting it for specifically for the tourism regions',
        },
      ],
      initialState: {
        year: 'all_years',
      },
      fetchParams: (state: any) => {
        const anySubRegions = state.selectedRegion.children && state.selectedRegion.children.length > 0;
        const region = anySubRegions
          ? state.selectedRegion.children.map((x) => x.slug)
          : [state.selectedRegion.slug, state.selectedRegion.parent?.slug].filter((x) => x);

        return {
          slug: 'tourism_employment_by_tourism_region_monthly',
          region,
        };
      },
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const filtered = filterBySelectedYear(rawData, state.year);
        let chartData = mergeForChart({ data: filtered, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });
        const regions = uniq(rawData.map((x) => x.region));
        const colorsByRegionName = getColorsByRegionName(rawData);
        let areas = [];
        if (state.year !== 'all_years') chartData = expandToFullYear(chartData);
        if (state.year !== 'all_years' && state.selectedRegion.parent) {
          [chartData, areas] = getWithMinMaxAreas(chartData, rawData, 'region', colorsByRegionName);
        }

        return {
          type: 'charts/composed',
          data: chartData,
          controls: [{ type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, true) }],
          lines: regions.map((x) => ({ dataKey: x, color: colorsByRegionName[x] })),
          areas,
          xAxis: {
            dataKey: 'date',
            tickFormatter: state.year !== 'all_years' && shortMonthName,
          },
          yAxis: {
            tickFormatter: compactNumberTickFormatter,
          },
          legend: {
            ...bottomLegend,
            payloadFilter: (y) => !y.value.includes('min-max'),
          },
          tooltip: {
            ...defaultTooltip,
            payloadFilter: (y) => !y.name.includes('min-max'),
          },
        };
      },
    },
    {
      title: 'Percentage of tourism employment to total employment',
      description: `Monthly and annual percentage share of tourism employment to total employment in the selected region.`,
      note: 'These figures should only be seen as inficative as they have two different regional boundaries as the basis for their presentation (economic region for total employment and tourism region for tourism employment).',
      sources: [
        {
          text: 'Statistics Canada - Labour Force Surver',
          link: 'https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1410038702',
        },
        {
          text: 'Go2HR Employment Tracker',
          link: 'https://www.go2hr.ca/bc-tourism-and-hospitality-labour-market-information-employment-tracker',
        },
      ],
      initialState: {
        frequency: 'monthly',
        year: previousYear,
      },
      fetchParams: (state: any) => {
        const includeChildren = state.frequency === 'annually';

        return {
          slug: `tourism_to_total_employment_percentage_${state.frequency}`,
          region: [
            state.selectedRegion.slug,
            ...(includeChildren ? state.selectedRegion.children?.map((x) => x.slug) : []),
          ].filter((x) => x),
        };
      },
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const filtered = filterBySelectedYear(rawData, state.year);
        const controls = [
          { type: 'tabs', side: 'left', name: 'frequency', options: getOptions(['Monthly', 'Annually']) },
          { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, true) },
        ];
        if (state.frequency === 'annually') {
          const grouped = Object.values(groupBy(filtered, 'region')).map((grouped) => ({
            region: grouped[0].region,
            value: Number(meanBy(grouped, 'value').toFixed(2)),
          }));

          return {
            type: 'rank',
            data: grouped.map((x) => ({
              text: `${x.region} - {value}`,
              value: `${x.value}%`,
            })),
            hideNumber: true,
            controls,
          };
        }
        const chartData = mergeForChart({ data: filtered, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });
        const regions = uniq(rawData.map((x) => x.region));
        const colorsByRegionName = getColorsByRegionName(rawData);

        return {
          type: 'charts/bar',
          data: chartData,
          controls,
          bars: regions.map((x) => ({ dataKey: x, color: colorsByRegionName[x] })),
          xAxis: {
            dataKey: 'date',
            tickFormatter: state.year !== 'all_years' && shortMonthName,
          },
          yAxis: {
            tickFormatter: (val) => `${val}%`,
          },
          tooltip: {
            cursor: false,
            valueFormatter: (value) => `${value.toFixed(2)}%`,
          },
        };
      },
    },
    {
      title: 'Tourism employment by subsector',
      description: `Share of monthly tourism employment by different sub-sectors in the selected region.`,
      note: 'Figures include full and part time employment. Data is presented for tourism regions.',
      sources: [
        {
          text: 'Go2HR Employment Tracker',
          link: 'https://www.go2hr.ca/bc-tourism-and-hospitality-labour-market-information-employment-tracker',
          note: 'based on Labour Force Survey information, but data is selected and transformed, focusing on specific tourism and hospitality occupations and presenting it for specifically for the tourism regions',
        },
      ],
      initialState: {
        year: previousYear,
      },
      fetchParams: (state: any) => ({
        slug: 'tourism_employment_by_sector_by_economic_region',
        region: state.selectedRegion.slug,
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const filtered = filterBySelectedYear(rawData, state.year);
        let chartData = mergeForChart({ data: filtered, mergeBy: 'date', labelKey: 'category_1', valueKey: 'value' });
        if (state.year !== 'all_years') chartData = expandToFullYear(chartData);

        return {
          type: 'charts/bar',
          data: chartData,
          controls: [{ type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData) }],
          bars: getStackedBarsData(chartData, 'date'),
          chartProps: {
            stackOffset: 'expand',
          },
          xAxis: {
            dataKey: 'date',
            tickFormatter: state.year !== 'all_years' && shortMonthName,
          },
          yAxis: {
            tickFormatter: (val) => `${val * 100}%`,
          },
          tooltip: {
            cursor: false,
            valueFormatter: (value) => `${value.toFixed(2)}%`,
          },
        };
      },
    },
    {
      title: 'Average tourism related wages',
      description: `Average hourly earning (CAD$) by month in the selected region compared to the provincial average.`,
      note: 'Figures include full and part time employment. Data is presented for tourism regions, not economic regions (see map for the difference in administrative boundaries).',
      sources: [
        {
          text: 'Go2HR Employment Tracker',
          link: 'https://www.go2hr.ca/bc-tourism-and-hospitality-labour-market-information-employment-tracker',
          note: 'based on Labour Force Survey information, but data is selected and transformed, focusing on specific tourism and hospitality occupations and presenting it for specifically for the tourism regions',
        },
      ],
      initialState: {
        year: 'all_years',
      },
      fetchParams: (state: any) => {
        return {
          slug: 'tourism_employment_hourly_earnings_by_economic_region',
          region: [
            state.selectedRegion.slug,
            state.selectedRegion.parent?.slug,
            ...state.selectedRegion.children.map((x) => x.slug),
          ].filter((x) => x),
        };
      },
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const filtered = filterBySelectedYear(rawData, state.year);
        let chartData = mergeForChart({ data: filtered, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });
        const regions = uniq(rawData.map((x) => x.region));
        let areas = [];
        const colorsByRegionName = getColorsByRegionName(filtered);
        if (state.year !== 'all_years' && state.selectedRegion.parent) {
          chartData = expandToFullYear(chartData);
          [chartData, areas] = getWithMinMaxAreas(chartData, rawData, 'region', colorsByRegionName);
        }

        return {
          type: 'charts/composed',
          data: chartData,
          controls: [{ type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, true) }],
          lines: regions.map((x) => ({ dataKey: x, color: colorsByRegionName[x] })),
          areas,
          xAxis: {
            dataKey: 'date',
            tickFormatter: state.year !== 'all_years' && shortMonthName,
          },
          yAxis: {
            tickFormatter: (value) => `${value}$/h`,
            domain: [(dataMin) => Math.round(dataMin - 2), (dataMax) => Math.round(dataMax) + 2],
          },
          legend: {
            ...bottomLegend,
            payloadFilter: (y) => !y.value.includes('min-max'),
          },
          tooltip: {
            ...defaultTooltip,
            valueFormatter: (value) => `${value}$/h`,
            payloadFilter: (y) => !y.name.includes('min-max'),
          },
        };
      },
    },
    {
      title: 'Employment by job status',
      description: `Shares of full time and part time empployment in tourism and its sub-sectors for the seclected regions.`,
      sources: [
        {
          text: 'Go2HR Employment Tracker',
          link: 'https://www.go2hr.ca/bc-tourism-and-hospitality-labour-market-information-employment-tracker',
          note: 'based on Labour Force Survey information, but data is selected and transformed, focusing on specific tourism and hospitality occupations and presenting it for specifically for the tourism regions',
        },
      ],
      initialState: {
        year: 'all_years',
        sector: 'Tourism',
      },
      display: (selectedRegion: Region) => {
        if (selectedRegion.parent) return false;
        return true; //only for parent regions like british columbia
      },
      fetchParams: (state: any) => {
        return {
          slug: 'tourism_employment_by_job_status',
          region: state.selectedRegion.slug,
        };
      },
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const sectors = uniq(rawData.map((x) => x.category_1));
        const filtered = filterBySelectedYear(rawData, state.year)
          .filter((x) => x.category_1 === state.sector)
          .map((x) => ({
            ...x,
            category_2: startCase(x.category_2),
          }));
        let chartData = mergeForChart({ data: filtered, mergeBy: 'date', labelKey: 'category_2', valueKey: 'value' });
        if (state.year !== 'all_years') chartData = expandToFullYear(chartData);

        return {
          type: 'charts/bar',
          data: chartData,
          controls: [
            { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData) },
            { type: 'select', side: 'right', name: 'sector', options: getOptions(sectors, false) },
          ],
          bars: getStackedBarsData(chartData, 'date'),
          xAxis: {
            dataKey: 'date',
            tickFormatter: state.year !== 'all_years' && shortMonthName,
          },
          yAxis: {
            tickFormatter: (val) => `${val * 100}%`,
          },
          tooltip: {
            cursor: false,
            valueFormatter: (value) => `${(value * 100).toFixed(0)}%`,
          },
        };
      },
    },
  ],
};

export default theme;
