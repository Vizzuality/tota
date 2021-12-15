import uniq from 'lodash/uniq';
import orderBy from 'lodash/orderBy';
import {
  allMonths,
  expandToFullYear,
  filterBySelectedYear,
  getAvailableYearsOptions,
  getColorsByRegionName,
  getOptions,
  getPercentageTotalByLabel,
  getStackedBarsData,
  getTop10AndOthers,
  getTop10AndOthersByYear,
  getTopN,
  getWithMinMaxAreas,
  getYear,
  getUnitLabel,
  mergeForChart,
} from 'utils/charts';
import { shortMonthName, compactNumberTickFormatter, thisYear, previousYear, formatPercentage } from './utils';
import { bottomLegend, defaultTooltip } from 'constants/charts';
import { IndicatorValue, ThemeFrontendDefinition } from 'types';
import { format, parseISO } from 'date-fns';

import BoxImage from 'images/home/box-tourism-industry.png';
import { getMapUrl } from 'hooks/map';

const theme: ThemeFrontendDefinition = {
  slug: 'tourism_industry_arrivals',
  image: BoxImage,
  widgets: [
    {
      slug: 'tourism_businesses',
      fetchParams: (state: any) => ({
        slug: 'establishments_by_type',
        category_2: 'all',
        region: state.selectedRegion.slug,
      }),
      fetchWidgetProps(rawData: IndicatorValue[], state): any {
        return {
          viewOnMap: {
            title: 'View on Map',
            link: getMapUrl(state.selectedRegion.slug, ['tourism_regions', 'organizations']),
          },
          type: 'charts/pie',
          data: getTop10AndOthers(rawData, 'category_1'),
          pies: [
            {
              nameKey: 'category_1',
              dataKey: 'value',
            },
          ],
        };
      },
    },
    {
      slug: 'tourism_businesses_by_characteristic',
      fetchParams: (state: any) => ({
        slug: 'establishments_by_type',
        category_2: state.type,
        region: state.selectedRegion.slug,
      }),
      initialState: {
        type: 'biosphere',
      },
      fetchWidgetProps(rawData: IndicatorValue[], state): any {
        return {
          viewOnMap: {
            title: 'View on Map',
            link: getMapUrl(state.selectedRegion.slug, ['tourism_regions', 'organizations']),
          },
          type: 'charts/pie',
          data: getTop10AndOthers(rawData, 'category_1'),
          controls: [
            {
              type: 'tabs',
              side: 'left',
              name: 'type',
              options: [
                {
                  value: 'biosphere',
                  label: 'Biosphere Member',
                },
                {
                  value: 'accessibility',
                  label: 'Accessible',
                },
                {
                  value: 'indigenous',
                  label: 'Indigenous',
                },
              ],
            },
          ],
          pies: [
            {
              nameKey: 'category_1',
              dataKey: 'value',
            },
          ],
        };
      },
    },
    {
      slug: 'domestic_arrivals',
      initialState: {
        group: 'visits',
        year: 'all_years',
      },
      fetchParams: (state: any) => ({
        slug: `${state.group}_by_origin_country_monthly`,
        region: [
          state.selectedRegion.slug,
          state.selectedRegion.parent?.slug,
          ...state.selectedRegion.children?.map((x) => x.slug),
        ].filter((x) => x),
        category_1: 'Canada',
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const data = filterBySelectedYear(rawData, state.year);
        let chartData = mergeForChart({ data, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });
        let areas = [];
        const colorsByRegionName = getColorsByRegionName(rawData);
        const regions = uniq(rawData.map((x) => x.region));
        if (state.year !== 'all_years') {
          chartData = expandToFullYear(chartData);
          [chartData, areas] = getWithMinMaxAreas(chartData, rawData, 'region', colorsByRegionName);
        }
        return {
          data: chartData,
          type: 'charts/composed',
          controls: [
            { type: 'tabs', side: 'left', name: 'group', options: getOptions(['Visits', 'Trips', 'Stays']) },
            { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData) },
          ],
          legend: {
            ...bottomLegend,
            payloadFilter: (y) => !y.value.includes('min-max'),
          },
          lines: regions.map((x) => ({ dataKey: x, color: colorsByRegionName[x] })),
          areas,
          xAxis: {
            dataKey: 'date',
            tickFormatter: state.year !== 'all_years' && shortMonthName,
          },
          yAxis: {
            tickFormatter: compactNumberTickFormatter,
          },
          tooltip: {
            ...defaultTooltip,
            valueFormatter: compactNumberTickFormatter,
            payloadFilter: (y) => !y.name.includes('min-max'),
          },
        };
      },
    },
    {
      slug: 'seasonality',
      initialState: {
        year: previousYear,
        frequency: 'monthly',
      },
      fetchParams: (state: any) => ({
        slug: `domestic_visits_percentage_${state.frequency}`,
        region: state.selectedRegion.slug,
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const take = state.frequency === 'quarterly' ? 4 : 5;
        const formatDate = state.frequency === 'quarterly' ? (d) => d : shortMonthName;
        const filteredByYear = (rawData || []).filter((x: any) => getYear(x.date) === state.year);
        const topN = getTopN(filteredByYear, take, 'value').map((x) => ({
          text: `${formatDate(x.date)}: {value} of visitors`,
          value: formatPercentage(x.value),
          date: x.date,
        }));
        const data = orderBy(topN, 'date');

        return {
          type: 'rank',
          data,
          controls: [
            { type: 'tabs', side: 'left', name: 'frequency', options: getOptions(['Monthly', 'Quarterly']) },
            { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, false) },
          ],
        };
      },
    },
    {
      slug: 'seasonality_peak_vs_lowest',
      initialState: {
        year: previousYear,
      },
      fetchParams: (state: any) => ({
        slug: 'domestic_visits_peak_lowest_month_ratio',
        region: state.selectedRegion.slug,
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const ratio = filterBySelectedYear(rawData, state.year)[0];
        let ratioText: string | React.ReactNode = '';
        if (ratio) {
          const ratioNumber = Number(ratio.value).toFixed(2);
          ratioText = (
            <div>
              peak/lowest month ({shortMonthName(ratio.category_1)}/{shortMonthName(ratio.category_2)}):{' '}
              <span className="text-green-400 text-5xl font-bold">{ratioNumber}</span> x visitors
            </div>
          );
        }

        return {
          type: 'text',
          data: ratioText,
          controls: [
            { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, false) },
          ],
        };
      },
    },
    {
      slug: 'domestic_visitors_by_province',
      initialState: {
        frequency: 'monthly',
        year: previousYear,
      },
      fetchParams: (state: any) => ({
        slug: `visits_by_origin_province_${state.frequency}`,
        region: state.selectedRegion.slug,
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const filteredByYear = filterBySelectedYear(rawData, state.year);
        const data = mergeForChart({
          data: filteredByYear,
          mergeBy: 'date',
          labelKey: 'category_1',
          valueKey: 'value',
        });
        const percentagePerPeriod = getPercentageTotalByLabel(data, 'date');

        return {
          type: 'charts/bar',
          data,
          controls: [
            { type: 'tabs', side: 'left', name: 'frequency', options: getOptions(['Monthly', 'Quarterly']) },
            { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, false) },
          ],
          bars: getStackedBarsData(data, 'date'),
          xAxis: {
            dataKey: 'date',
            tickFormatter: state.frequency === 'monthly' && shortMonthName,
          },
          yAxis: {
            tickFormatter: compactNumberTickFormatter,
          },
          tooltip: {
            cursor: false,
            totalFormatter: (label) => `${percentagePerPeriod[label]}% of ${state.year} total`,
          },
        };
      },
    },
    {
      slug: 'domestic_overnight_visitors_by_city',
      initialState: {
        year: previousYear,
      },
      fetchParams: (state: any) => ({
        slug: 'visits_by_origin_city_quarterly',
        region: [state.selectedRegion.slug, state.selectedRegion.parent?.slug].filter((x) => x),
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const filteredByYear = filterBySelectedYear(rawData, state.year);
        const top10 = getTop10AndOthersByYear(filteredByYear, 'category_1');
        const data = mergeForChart({
          data: top10,
          mergeBy: 'date',
          labelKey: 'category_1',
          valueKey: 'value',
        });
        const percentagePerPeriod = getPercentageTotalByLabel(data, 'date');

        return {
          type: 'charts/bar',
          data,
          controls: [
            { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, false) },
          ],
          bars: getStackedBarsData(data, 'date'),
          xAxis: {
            dataKey: 'date',
          },
          yAxis: {
            tickFormatter: compactNumberTickFormatter,
          },
          tooltip: {
            cursor: false,
            totalFormatter: (label) => `${percentagePerPeriod[label]}% of ${state.year} total`,
          },
        };
      },
    },
    {
      slug: 'market_segmentation',
      initialState: {
        year: previousYear,
      },
      fetchParams: (state: any) => ({ slug: 'visits_by_prizm_monthly', region: state.selectedRegion.slug }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const filteredByYear = filterBySelectedYear(rawData, state.year);
        const data = mergeForChart({
          data: filteredByYear,
          mergeBy: 'date',
          labelKey: 'category_2',
          valueKey: 'value',
        });

        return {
          type: 'charts/bar',
          data,
          controls: [
            { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, false) },
          ],
          chartProps: {
            layout: 'vertical',
          },
          legend: {
            ...bottomLegend,
            removable: true,
          },
          bars: getStackedBarsData(data, 'date'),
          xAxis: {
            hide: true,
            type: 'number',
          },
          yAxis: {
            dataKey: 'date',
            type: 'category',
            tickFormatter: shortMonthName,
          },
          height: 250 + 50 * data.length,
        };
      },
    },
    {
      slug: 'length_of_stay',
      initialState: {
        year: previousYear,
      },
      fetchParams: (state: any) => ({
        slug: 'nights_per_visitor_by_country_monthly',
        region: [state.selectedRegion.slug, state.selectedRegion.parent?.slug].filter((x) => x),
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const data = filterBySelectedYear(rawData, state.year);
        let chartData = mergeForChart({ data, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });
        let areas = [];
        const colorsByRegionName = getColorsByRegionName(rawData);
        const regions = uniq(rawData.map((x) => x.region));
        if (state.year !== 'all_years') {
          chartData = expandToFullYear(chartData);
          [chartData, areas] = getWithMinMaxAreas(chartData, rawData, 'region', colorsByRegionName);
        }

        return {
          type: 'charts/composed',
          data: chartData,
          controls: [{ type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData) }],
          areas,
          lines: regions.map((x) => ({ dataKey: x, color: colorsByRegionName[x] })),
          chartProps: {
            margin: {
              top: 35,
            },
          },
          yAxis: {
            label: getUnitLabel('days'),
          },
          xAxis: {
            dataKey: 'date',
            tickFormatter: state.year !== 'all_years' && shortMonthName,
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
      slug: 'travel_patterns',
      initialState: {
        year: `compared_to_${previousYear}`,
      },
      fetchParams: (state: any) => ({
        slug: 'visits_change_weekly',
        region: [
          state.selectedRegion.slug,
          state.selectedRegion.parent?.slug,
          ...state.selectedRegion.children?.map((x) => x.slug),
        ].filter((x) => x),
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const yearsOptions = uniq(rawData.map((x: any) => x.category_1))
          .sort()
          .reverse()
          .map((cat1: string) => ({ label: cat1.replace('compared_to_', ''), value: cat1 }));
        let data = rawData.filter((x: any) => x.category_1 === state.year);
        const allDates = data.map((x) => parseISO(x.date).getTime());
        const months = allMonths.map((x) => new Date(`${thisYear} ${x}`).getTime());
        const minDate = Math.min(...allDates);
        data = data.map((x) => ({ ...x, date: parseISO(x.date).getTime().toString() }));
        const chartData = mergeForChart({ data, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });
        const colorsByRegionName = getColorsByRegionName(rawData);
        const regions = uniq(rawData.map((x) => x.region));
        return {
          type: 'charts/line',
          data: chartData,
          controls: [
            {
              type: 'select',
              side: 'right',
              name: 'year',
              options: yearsOptions,
              prefix: `${thisYear} Compared to: `,
            },
          ],
          lines: regions.map((x) => ({ dataKey: x, color: colorsByRegionName[x] })),
          xAxis: {
            dataKey: 'date',
            ticks: [minDate, ...months.slice(1)],
            tickFormatter: (date) => {
              const parsedDate = new Date(parseInt(date));
              if (isNaN(parsedDate.getTime())) return date;
              return format(parsedDate, 'MMM');
            },
            type: 'number',
            scale: 'time',
            domain: ['auto', 'auto'],
          },
          tooltip: {
            ...defaultTooltip,
            labelFormatter: (value) => {
              const parsedDate = new Date(parseInt(value));
              return format(parsedDate, 'MMM d');
            },
          },
        };
      },
    },
  ],
};

export default theme;
