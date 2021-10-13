import uniq from 'lodash/uniq';

import { ThemeType, IndicatorValue } from 'types';
import { previousYear, thisYear, compactNumberTickFormatter } from './utils';
import { defaultTooltip } from 'constants/charts';
import { filterBySelectedYear, getStackedBarsData, getAvailableYearsOptions, mergeForChart } from 'utils/charts';
import { REGION_COLORS } from 'constants/regions';

const theme: ThemeType = {
  title: 'General Insights',
  slug: 'general-insights',
  summary:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet.',
  sections: [
    {
      title: 'Size of region (km2)',
      description: `To be defined`,
      initialState: {
        year: thisYear,
      },
      fetchParams: () => ({
        slug: ['size_tourism_region_km2'],
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const data = filterBySelectedYear(rawData, state.year);

        return {
          type: 'charts/treemap',
          data: data.map((d) => ({
            name: d.region,
            color: REGION_COLORS[d.region_slug],
            value: d.value,
          })),
          chartConfig: {
            isAnimationActive: false,
          },
          tooltip: {
            valueFormatter: (v) => `${Number(v).toLocaleString()} km2`,
          },
          controls: [
            { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, false) },
          ],
        };
      },
    },
    {
      title: 'Population',
      description: `Total provincial/regional population with working age of 15 years and older.`,
      initialState: {
        year: thisYear,
      },
      fetchParams: () => ({
        slug: ['population_by_tourism_region'],
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const data = filterBySelectedYear(rawData, state.year).map((d) => ({
          ...d,
          color: REGION_COLORS[d.region_slug],
        }));

        return {
          type: 'charts/pie',
          data,
          controls: [
            { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, false) },
          ],
          pies: [
            {
              nameKey: 'region',
              dataKey: 'value',
            },
          ],
        };
      },
    },
    {
      title: 'Contribution to GDP',
      description: `Contribution of the tourism industry to the provincial GDP (total and % of GDP)`,
      fetchParams: (state: any) => ({
        slug: ['gdp_tourism', 'gdp_total'],
        region: [state.selectedRegion.name].filter((x) => x),
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], _state: any): any {
        const indicatorsMap = {
          gdp_tourism: 'Tourism',
          gdp_total: 'Total',
        };
        const changed = rawData.map((x) => ({ ...x, indicator: indicatorsMap[x.indicator] }));
        const data = mergeForChart({ data: changed, mergeBy: 'date', labelKey: 'indicator', valueKey: 'value' });

        return {
          type: 'charts/bar',
          data,
          bars: Object.values(indicatorsMap).map((x) => ({ dataKey: x })),
          tooltip: {
            cursor: false,
            valueFormatter: (v) => `${Number(v).toLocaleString()} million CAD`,
          },
          xAxis: {
            dataKey: 'date',
          },
          yAxis: {
            tickFormatter: compactNumberTickFormatter,
          },
        };
      },
    },
    {
      title: 'Sector contribution to tourism GDP',
      description: `To be defined`,
      initialState: {
        year: previousYear,
      },
      fetchParams: (state: any) => ({
        slug: ['gdp_tourism_percentage_by_sector'],
        region: [state.selectedRegion.name].filter((x) => x),
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const data = filterBySelectedYear(rawData, state.year);

        return {
          type: 'charts/pie',
          data,
          controls: [
            { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, false) },
          ],
          pies: [
            {
              nameKey: 'category_1',
              dataKey: 'value',
              label: function ({ value }) {
                return `${value}%`;
              },
            },
          ],
          tooltip: {
            ...defaultTooltip,
            valueFormatter: (value) => {
              return `${value}%`;
            },
          },
        };
      },
    },
    {
      title: 'Employment',
      description: `Total number of people employed in the tourism industry in the province (& share of total employment)`,
      initialState: {
        year: previousYear,
      },
      fetchParams: (state: any) => ({
        slug: ['tourism_employment_by_tourism_region_annually', 'total_employment_by_tourism_region_annually'],
        region: [...state.selectedRegion.children?.map((x) => x.name)].filter((x) => x),
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const indicatorsMap = {
          tourism_employment_by_tourism_region_annually: 'Tourism',
          total_employment_by_tourism_region_annually: 'Total',
        };
        const changed = filterBySelectedYear(rawData, state.year).map((x) => ({
          ...x,
          indicator: indicatorsMap[x.indicator],
        }));
        const data = mergeForChart({
          data: changed,
          mergeBy: 'region',
          labelKey: 'indicator',
          valueKey: 'value',
        });
        const bars = getStackedBarsData(data, 'region');

        return {
          type: 'charts/bar',
          data,
          controls: [
            { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, false) },
          ],
          chartProps: {
            layout: 'vertical',
            margin: {
              left: 100,
            },
          },
          bars,
          xAxis: {
            hide: true,
            type: 'number',
          },
          yAxis: {
            dataKey: 'region',
            type: 'category',
          },
        };
      },
    },
    {
      title: 'Tourism revenue (million CAD)',
      description: `Total amount of revenue generated by the tourism industry in the province and regional shares.`,
      fetchParams: (state: any) => ({
        slug: ['revenue_tourism'],
        region: [state.selectedRegion.name].filter((x) => x),
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const chartData = mergeForChart({ data: rawData, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });
        const regions = uniq(rawData.map((x) => x.region)).map((x) => ({ dataKey: x }));

        return {
          type: 'charts/line',
          data: chartData,
          lines: regions,
          xAxis: {
            dataKey: 'date',
          },
          tooltip: {
            ...defaultTooltip,
            valueFormatter: (v) => `${Number(v).toLocaleString()} million CAD`,
          },
        };
      },
    },
  ],
};

export default theme;
