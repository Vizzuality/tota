import orderBy from 'lodash/orderBy';
import { filterBySelectedYear, getAvailableYearsOptions, getStackedBarsData, mergeForChart } from 'utils/charts';
import { thisYear } from './utils';
import { IndicatorValue, ThemeFrontendDefinition } from 'types';

import BoxImage from 'images/home/box-tourism-industry.png';

const theme: ThemeFrontendDefinition = {
  slug: 'local_satisfaction',
  image: BoxImage,
  widgets: [
    {
      slug: 'satisfaction_with_life',
      initialState: {
        year: thisYear,
      },
      fetchParams: (state: any) => ({
        slug: ['satisfaction_with_life'],
        region: state.selectedRegion.slug,
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const data = filterBySelectedYear(rawData, state.year);
        const chartData = mergeForChart({ data, mergeBy: 'category_1', labelKey: 'category_1', valueKey: 'value' });

        return {
          type: 'charts/bar',
          data: chartData,
          controls: [
            { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, false) },
          ],
          bars: getStackedBarsData(chartData, 'category_1'),
          xAxis: {
            dataKey: 'category_1',
            tickFormatter: () => '', // empty tick label
          },
          tooltip: {
            cursor: false,
          },
        };
      },
    },
    {
      slug: 'satisfaction_with_elements',
      initialState: {
        year: thisYear,
      },
      fetchParams: (state: any) => ({
        slug: ['satisfaction_with_elements'],
        region: state.selectedRegion.slug,
      }),
      fetchWidgetProps(rawData: IndicatorValue[] = [], state: any): any {
        const allData = filterBySelectedYear(rawData, state.year);
        // category_1 question q1,q2,q3,...
        // category_2 answer choice 0/25/30/...
        const questionMap = {
          q1: 'Sense of belonging to a community',
          q2: 'Satisf. with access to sport & recreation activities',
          q3: 'Satisf. with access to cultural activities',
          q4: 'Sense of a healthy environment',
          q5: 'Satisf. with personal safety in your location',
        };
        const choiceMap = {
          0: 'Very weak/dissat.',
          25: 'Weak/dissatisfied',
          50: 'Neutral',
          75: 'Somewhat string/satisfied',
          100: 'Very strong/satisfied',
        };
        // total, avg not shown on the chart
        const filtered = allData
          .filter((x) => !['total', 'avg'].includes(x.category_2))
          .map((x) => ({ ...x, category_2: choiceMap[Number(x.category_2).toFixed(0)] }));
        const data = orderBy(filtered, 'category_2');

        const chartData = mergeForChart({ data, mergeBy: 'category_1', labelKey: 'category_2', valueKey: 'value' });

        return {
          type: 'charts/bar',
          data: chartData,
          controls: [
            { type: 'select', side: 'right', name: 'year', options: getAvailableYearsOptions(rawData, false) },
          ],
          chartProps: {
            layout: 'vertical',
          },
          bars: Object.values(choiceMap).map((choice) => ({ dataKey: choice, stackId: 1 })),
          xAxis: {
            hide: true,
            type: 'number',
          },
          yAxis: {
            dataKey: 'category_1',
            type: 'category',
            tickFormatter: (value) => questionMap[value],
          },
          tooltip: {
            cursor: false,
            sortBy: null,
            labelFormatter: (value) => {
              return questionMap[value];
            },
          },
        };
      },
    },
    {
      slug: 'satisfaction_with_tourism',
      fetchParams: (state: any) => ({
        slug: 'satisfaction_with_tourism',
        region: state.selectedRegion.slug,
      }),
      fetchWidgetProps(rawData: IndicatorValue[], _state): any {
        const data = (rawData || []).filter((x) => x.category_1 !== 'avg');
        const regionalAverage = (rawData || []).find((x) => x.category_1 === 'avg');

        return {
          type: 'charts/pie',
          data,
          pies: [
            {
              nameKey: 'category_1',
              dataKey: 'value',
            },
          ],
          centerLabel: {
            title: 'Regional Average',
            value: Number(regionalAverage?.value).toFixed(0),
          },
        };
      },
    },
    {
      slug: 'satisfaction_with_tourism_2',
      initialState: {
        question: 'q1',
      },
      fetchParams: (state: any) => ({
        slug: 'satisfaction_with_tourism_2',
        region: state.selectedRegion.slug,
      }),
      fetchWidgetProps(rawData: IndicatorValue[], state): any {
        // category_1 question: q1, q2, q3
        // category_2 answer

        const data = (rawData || []).filter((x) => x.category_1 === state.question);
        const questionsMap = {
          q1: 'Overall, the number of tourists to my site should',
          q2: 'I would welcome visitors from',
          q3: 'Where would you be ok with advertising for your region',
        };

        return {
          type: 'charts/pie',
          data,
          controls: [
            {
              type: 'select',
              side: 'right',
              name: 'question',
              options: Object.keys(questionsMap).map((key) => ({ label: questionsMap[key], value: key })),
            },
          ],
          pies: [
            {
              nameKey: 'category_2',
              dataKey: 'value',
            },
          ],
        };
      },
    },
  ],
};

export default theme;
