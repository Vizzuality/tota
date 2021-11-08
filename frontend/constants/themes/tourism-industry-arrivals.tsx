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
import { IndicatorValue, ThemeType } from 'types';
import { format, parseISO } from 'date-fns';

import mountainsImage from 'images/home/image-mountains.png';
import { getMapUrl } from 'hooks/map';

const theme: ThemeType = {
  title: 'Tourism Industry & Arrivals',
  slug: 'tourism-industry-arrivals',
  image: mountainsImage,
  sections: [
    {
      title: 'Tourism businesses',
      subTitle: '(by type)',
      description: `Total number of tourism businesses in the selected region, by type of business.`,
      sources: [
        {
          text: `Aggregated figures. Includes information directly from the regional DMOs, as well as additional business information of the tourism supply side from third party sources (e.g. campgrounds, visitor information centres, etc.).`,
        },
      ],
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
      title: 'Tourism businesses: specific characteristics',
      description: `
        Total number of tourism businesses in the selected region that are: (1) members of the Biosphere program; (2) accessible businesses; (3) businesses that have indigenous ownership (51% and more).
      `,
      note: 'The accessibility indication is not based on any official certifications or audits and should only be seen as indicative information. The highlighted businesses include a wide range of accessibility features. Please contact the individual business for detailed and specific accessibility information.',
      sources: [
        {
          text: 'Regional DMOs and other relevant third party sources (e.g. Indigenous Tourism BC)',
        },
      ],
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
      title: 'Domestic arrivals',
      description: `
        Total amount of domestic overnight arrivals to the province/regions by month.
      `,
      note: `
        <br/>
        Visits: count of domestic travelers who spent one or more nights in the destination. Includes repeat visitation e.i. visitors are counted 1x on one month although came twice.
        Trips: count of domestic traveler trips which involved spending one or more nights over a certain time period as part of a continuous visit to the destination. includes unique visitors i.e. visitors that came twice in e.g. one month are counted as two trips.
        Stays: count of unique nights a domestic visitor was observed in the destination over a certain time period, i.e. overnights.
      `,
      sources: [
        {
          text: 'Environics Analytics - VisitorView',
        },
      ],
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
      title: 'Seasonality',
      description: `Share of annual domestic overnight visitors occurring in peak month and quarter.`,
      sources: [
        {
          text: 'Environics Analytics - VisitorView',
        },
      ],
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
      title: 'Seasonality: peak month vs. lowest month',
      description: `Ratio of domestic visitors in peak month to lowest month.`,
      sources: [
        {
          text: 'Environics Analytics - VisitorView',
        },
      ],
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
      title: 'Domestic visitors by province of origin',
      description: `Total domestic overnight visitors by their respective province of origin.`,
      sources: [
        {
          text: 'Environics Analytics - VisitorView',
        },
      ],
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
      title: 'Domestic overnight visitors by city of origin',
      subTitle: '(top 10)',
      description: `Total domestic overnight visitors by their respective city of origin and by quarter.`,
      sources: [
        {
          text: 'Environics Analytics - VisitorView',
        },
      ],
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
      title: 'Market Segmentation Insights',
      subTitle: '(top 10)',
      description: `Top 10 PRIZM clusters showing the largest lifestyle groups/top markets of potential domestic visitors per month for the selected region (total numbers).`,
      sources: [
        {
          text: 'Environics Analytics - VisitorView',
        },
      ],
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
      title: 'Length of stay',
      description: `Average length of stay of domestic overnight visitors in the seleted region (by days).`,
      sources: [
        {
          text: 'Environics Analytics - VisitorView',
        },
      ],
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
      title: 'Travel patterns of domestic overnight visitors',
      description: `Weekly travel patterns of domestic overnight visitors showing the variation in volumes between the current year and the selected year.`,
      note: 'this information has been collected since 2020 due to the COVID-19 pandemic.',
      sources: [
        {
          text: 'Environics Analytics - Measuring Canadian Travel Patterns',
        },
      ],
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
