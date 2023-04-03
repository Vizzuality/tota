import uniq from 'lodash/uniq';

import { IndicatorValue, ThemeFrontendDefinition } from 'types';
import { previousYear, thisYear } from './utils';
import { defaultTooltip, getColorPalette } from 'constants/charts';
import {
  filterBySelectedYear,
  getColorsByRegionName,
  getStackedBarsData,
  getAvailableYearsOptions,
  getUnitLabel,
  mergeForChart,
} from 'utils/charts';
import { REGION_COLORS } from 'constants/regions';

const theme: ThemeFrontendDefinition = {
  slug: 'general_insights',
  widgets: [
    {
      slug: 'size_tourism_region',
      initialState: {
        year: thisYear,
      },
      fetchParams: (state) => ({
        slug: 'size_tourism_region_km2',
        region: state.selectedRegion.children?.map((x) => x.slug),
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
      slug: 'population',
      initialState: {
        year: thisYear,
      },
      fetchParams: (state) => ({
        slug: 'population_by_tourism_region',
        region: state.selectedRegion.children?.map((x) => x.slug),
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const data = filterBySelectedYear(rawData, state.year).map((d) => ({
          ...d,
          color: REGION_COLORS[d.region_slug],
        }));
        const total = data.reduce((prev, { value }) => prev + value, 0);
        const dataPercent = data.map((d) => ({ ...d, value: (100 * d.value) / total }));

        return {
          type: 'charts/pie',
          data: dataPercent,
          controls: [
            { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, false) },
          ],
          pies: [
            {
              nameKey: 'region',
              dataKey: 'value',
              label: function ({ value }) {
                return `${Number(value).toFixed(1)}%`;
              },
            },
          ],
          tooltip: {
            ...defaultTooltip,
            valueFormatter: (value) => {
              return `${Number(value).toFixed(1)}% `;
            },
          },
        };
      },
    },
    {
      slug: 'tourism_revenue',
      fetchParams: (state: any) => ({
        slug: 'revenue_tourism',
        region: state.selectedRegion.slug,
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const chartData = mergeForChart({ data: rawData, mergeBy: 'date', labelKey: 'region', valueKey: 'value' });
        const colorsByRegionName = getColorsByRegionName(rawData);
        const regions = uniq(rawData.map((x) => x.region)).map((x) => ({ dataKey: x, color: colorsByRegionName[x] }));

        return {
          type: 'charts/line',
          data: chartData,
          lines: regions,
          chartProps: {
            margin: {
              top: 60,
              left: 10,
            },
          },
          xAxis: {
            dataKey: 'date',
          },
          yAxis: {
            label: getUnitLabel('million $'),
            tickFormatter: (v) => Number(v).toLocaleString(),
          },
          tooltip: {
            ...defaultTooltip,
            valueFormatter: (v) => `${Number(v).toLocaleString()} million CAD$`,
          },
        };
      },
    },
    {
      slug: 'gdp_total',
      fetchParams: (state: any) => ({
        slug: 'gdp_total',
        region: state.selectedRegion.slug,
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], _state: any): any {
        const indicatorsMap = {
          gdp_total: 'Total',
        };
        const changed = rawData.map((x) => ({ ...x, indicator: indicatorsMap[x.indicator] }));
        const data = mergeForChart({ data: changed, mergeBy: 'date', labelKey: 'indicator', valueKey: 'value' });

        return {
          type: 'charts/bar',
          data,
          bars: Object.values(indicatorsMap).map((x) => ({ dataKey: x })),
          chartProps: {
            margin: {
              top: 60,
              left: 10,
            },
          },
          tooltip: {
            cursor: false,
            valueFormatter: (v) => `${Number(v).toLocaleString()} million CAD$`,
          },
          xAxis: {
            dataKey: 'date',
          },
          yAxis: {
            label: getUnitLabel('million $'),
            tickFormatter: (v) => Number(v).toLocaleString(),
          },
        };
      },
    },
    {
      slug: 'gdp_tourism',
      initialState: {
        indicator: 'gdp_tourism',
      },
      fetchParams: (state: any) => ({
        slug: state.indicator,
        region: state.selectedRegion.slug,
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const indicatorsMap = {
          gdp_tourism: 'Tourism',
          gdp_tourism_bc: 'Tourism',
        };
        const changed = rawData.map((x) => ({ ...x, indicator: indicatorsMap[x.indicator] }));
        const data = mergeForChart({ data: changed, mergeBy: 'date', labelKey: 'indicator', valueKey: 'value' });
        const colors = {
          gdp_tourism: getColorPalette(4)[0],
          gdp_tourism_bc: getColorPalette(4)[2],
        };

        return {
          type: 'charts/bar',
          data,
          controls: [
            {
              type: 'tabs',
              side: 'left',
              name: 'indicator',
              options: [
                {
                  value: 'gdp_tourism',
                  label: 'Total',
                },
                {
                  value: 'gdp_tourism_bc',
                  label: 'Percentage',
                },
              ],
            },
          ],
          bars: [{ dataKey: indicatorsMap[state.indicator], stackId: 1, color: colors[state.indicator] }],
          chartProps: {
            margin: {
              top: 60,
              left: 10,
            },
          },
          xAxis: {
            dataKey: 'date',
          },
          ...(state.indicator === 'gdp_tourism' && {
            yAxis: {
              label: getUnitLabel('million $'),
              tickFormatter: (v) => Number(v).toLocaleString(),
            },
            tooltip: {
              cursor: false,
              valueFormatter: (v) => `${Number(v).toLocaleString()} million CAD$`,
            },
          }),
          ...(state.indicator === 'gdp_tourism_bc' && {
            yAxis: {
              allowDecimals: false,
              tickFormatter: (v) => `${v}%`,
            },
            tooltip: {
              cursor: false,
              valueFormatter: (v) => `${Number(v).toLocaleString()}%`,
            },
          }),
        };
      },
    },
    {
      slug: 'gdp_tourism_by_sector',
      initialState: {
        year: previousYear,
      },
      fetchParams: (state: any) => ({
        slug: 'gdp_tourism_percentage_by_sector',
        region: state.selectedRegion.slug,
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
                return `${value}% `;
              },
            },
          ],
          tooltip: {
            ...defaultTooltip,
            valueFormatter: (value) => {
              return `${value}% `;
            },
          },
        };
      },
    },
    {
      slug: 'tourism_employment',
      initialState: {
        year: previousYear,
      },
      fetchParams: (state: any) => ({
        slug: ['tourism_employment_by_tourism_region_annually', 'total_employment_by_tourism_region_annually'],
        region: state.selectedRegion.children?.map((x) => x.slug),
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const tourismIndicator = rawData.filter((x) => x.indicator === 'tourism_employment_by_tourism_region_annually');
        const totalIndicator = rawData.filter((x) => x.indicator === 'total_employment_by_tourism_region_annually');
        const otherIndicator = tourismIndicator
          .map((tourismValue) => {
            const totalValue = totalIndicator.find(
              (x) => x.region_slug === tourismValue.region_slug && x.date === tourismValue.date,
            );
            if (!totalValue) return null;
            if (!totalValue.value) return null;
            return {
              ...tourismValue,
              indicator: 'other_employment_by_tourism_region_annually',
              value: totalValue.value - tourismValue.value,
            };
          })
          .filter((x) => x);
        const chartData = [...tourismIndicator, ...otherIndicator];
        const indicatorsMap = {
          other_employment_by_tourism_region_annually: 'Other',
          tourism_employment_by_tourism_region_annually: 'Tourism',
        };
        const changed = filterBySelectedYear(chartData, state.year).map((x) => ({
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
            { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(chartData, false) },
          ],
          chartProps: {
            layout: 'vertical',
          },
          bars,
          tooltip: {
            cursor: false,
            showTotalRow: true,
            showPercentageOfTotal: true,
          },
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
  ],
};

export default theme;
