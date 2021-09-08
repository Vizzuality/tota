import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';
import orderBy from 'lodash/orderBy';
import sortBy from 'lodash/sortBy';
import sumBy from 'lodash/sumBy';
import uniq from 'lodash/uniq';

import { IndicatorValue, OptionType } from 'types';

export const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface MergeForChartArgs {
  data: IndicatorValue[];
  mergeBy: string;
  labelKey: string;
  valueKey: string;
}

/**
 * Gets the data format that most of recharts charts expect
 */
export function mergeForChart({ data, mergeBy, labelKey, valueKey }: MergeForChartArgs): any[] {
  if (!data || !data.length) return [];
  const dataObj = {};
  const keepOthersLast = (d) => (d[labelKey] === 'Others' ? -Infinity : d.value);
  const sorted = orderBy(data, ['date', keepOthersLast], ['asc', 'desc']);
  sorted.forEach((rd: any) => {
    dataObj[rd[mergeBy]] = {
      [mergeBy]: rd[mergeBy],
      ...dataObj[rd[mergeBy]],
      [rd[labelKey]]: rd[valueKey],
    };
  });
  return sortBy(Object.values(dataObj), mergeBy);
}

export function getTop10AndOthersByYear(data: any[], key: string) {
  if (!data) return data;

  const newData = [];

  const groupedByYear = groupBy(data, (d: any) => getYear(d.date));
  const first10PerYear = {};
  Object.keys(groupedByYear).forEach((year) => {
    const dataByYear = groupedByYear[year];
    const groupedByKey = groupBy(dataByYear, key);
    const summed = Object.keys(groupedByKey).map((k) => ({
      [key]: k,
      value: sumBy(groupedByKey[k], 'value'),
    }));

    const first10Keys = orderBy(summed, ['value'], ['desc'])
      .slice(0, 10)
      .filter((x: any) => x)
      .map((x: any) => x[key]);
    first10PerYear[year] = first10Keys;
  });

  const groupedByDate = groupBy(data, 'date');
  Object.keys(groupedByDate).forEach((date) => {
    const dataByDate = groupedByDate[date];
    const first10 = first10PerYear[getYear(date)] || [];
    const first10Data = dataByDate.filter((x: any) => first10.includes(x[key]));

    newData.push(...first10Data);

    const othersData = dataByDate.filter((x: any) => !first10.includes(x[key]));
    if (othersData.length > 0) {
      newData.push({
        [key]: 'Others',
        date,
        region: othersData[0].region,
        value: othersData.reduce((acc, d) => acc + d.value, 0),
      });
    }
  });

  return newData;
}

export function expandToFullYear(data: IndicatorValue[]) {
  if (!data || !data.length) return data;

  const lastDate = data
    .map((x) => x.date)
    .sort()
    .reverse()[0];
  const lastDateMonth = getMonth(lastDate);
  const lastDateYear = getYear(lastDate);

  if (lastDateMonth === 12) return data;

  return [
    ...data,
    ...range(lastDateMonth + 1, 12).map((month: number) => ({ date: `${lastDateYear}-${('0' + month).slice(-2)}` })),
  ];
}

export function getTopN(data: any[], take: number, valueKey: string) {
  return (data || [])
    .sort((a, b) => b[valueKey] - a[valueKey])
    .slice(0, take)
    .filter((x) => x);
}

export function getTop10AndOthers(data: any[], key: string) {
  if (!data) return [];

  const first10 = orderBy(data, ['value'], ['desc'])
    .slice(0, 10)
    .filter((x: any) => x);
  const first10Keys = first10.map((x: any) => x[key]);
  const others = data.filter((x) => !first10Keys.includes(x[key]));

  return [
    ...first10,
    others.length > 0 && {
      [key]: 'Others',
      value: others.reduce((acc, x) => acc + x.value, 0),
    },
  ].filter((x) => x);
}

export const range = (start: number, end: number) => Array.from({ length: end - start + 1 }, (v, k) => start + k);

export function getYear(str: string): string {
  if (!str) return str;

  return new Date(str.replace(/Q\d/, '').replace(/W\d\d/, '')).getFullYear().toString();
}

export function getYears(data: any[]): string[] {
  return uniq((data || []).map((d) => getYear(d['date'])).filter((x) => x))
    .sort()
    .reverse();
}

export function getMonth(date: string) {
  return new Date(date).getMonth() + 1;
}

export function getStackedBarsData(data: any[], groupedBy: string) {
  const bars = data
    .map((x) => Object.keys(x))
    .flat()
    .filter((x) => x !== groupedBy);

  return (
    data &&
    data.length &&
    Array.from(new Set(bars)).map((barName: string) => ({
      dataKey: barName,
      stackId: 1,
    }))
  );
}

export function getPercentageTotalByLabel(data: any[], label: string) {
  const totalValueForYear = data.reduce(
    (acc, byLabel) =>
      acc +
      Object.keys(byLabel)
        .filter((key) => key !== label)
        .reduce((acc2, key) => acc2 + byLabel[key], 0),
    0,
  );
  return data.reduce(
    (acc, a) => ({
      ...acc,
      [a[label]]: Math.round(
        (Object.keys(a)
          .filter((key) => key !== label)
          .reduce((acc2, key) => acc2 + a[key], 0) /
          totalValueForYear) *
          100,
      ),
    }),
    {},
  );
}

export function getAvailableYearsOptions(data: any[], withAllOptions = true): any[] {
  const yearsOptions = [];
  if (withAllOptions) {
    yearsOptions.push({
      label: 'All years',
      value: 'all_years',
    });
  }
  const availableYears = getYears(data);
  availableYears.forEach((year) => yearsOptions.push({ label: year.toString(), value: year.toString() }));
  return yearsOptions;
}

export function filterBySelectedYear(data: IndicatorValue[], selectedYear: string, matchAllYearsToNulls = false) {
  if (!selectedYear) return data;
  if (selectedYear === 'all_years' && !matchAllYearsToNulls) return data;
  if (selectedYear === 'all_years' && matchAllYearsToNulls) return data.filter((x: any) => x.date === null);

  return data.filter((x: any) => getYear(x.date) === selectedYear);
}

export function getOptions(options: string[], lowerCaseValue = true): OptionType[] {
  return options.map((opt) => ({ label: opt, value: lowerCaseValue ? opt.toLowerCase() : opt }));
}

export function getMonthlyMinMax(data: IndicatorValue[], groupByKey: string) {
  return mapValues(groupBy(data, groupByKey), (grouped: IndicatorValue[]) => {
    return mapValues(
      groupBy(grouped, (x: IndicatorValue) => getMonth(x.date)),
      (dataPerMonth: IndicatorValue[]) => {
        const values = dataPerMonth.map((x) => x.value);
        return [Math.min(...values), Math.max(...values)];
      },
    );
  });
}

export function getWithMinMaxAreas(chartData: any, rawData: IndicatorValue[], groupByKey: string) {
  const monthlyMinMax = getMonthlyMinMax(rawData, groupByKey);
  const uniqKeys = uniq(rawData.map((x) => x[groupByKey]));
  const newChartData = chartData.map((d) => ({
    ...d,
    ...uniqKeys.reduce((acc, key) => ({ ...acc, [`${key} min-max`]: monthlyMinMax[key][getMonth(d.date)] }), {}),
  }));
  const areas = uniqKeys.map((key: string) => ({
    dataKey: `${key} min-max`,
    fillOpacity: 0.07,
    stroke: 'none',
  }));
  return [newChartData, areas];
}
