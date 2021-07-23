import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import sortBy from 'lodash/sortBy';
import sumBy from 'lodash/sumBy';

import { OptionType } from '@types';

interface MergeRawData {
  rawData: any[];
  mergeBy: string;
  labelKey: string;
  valueKey: string;
}

export function mergeRawData({ rawData, mergeBy, labelKey, valueKey }: MergeRawData): any[] {
  if (!rawData || !rawData.length) return [];
  const dataObj = {};
  const keepOthersLast = (d) => (d[labelKey] === 'Others' ? -Infinity : d.value);
  const sorted = orderBy(rawData, ['date', keepOthersLast], ['asc', 'desc']);
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

export function getTop10AndOthers(data: any[], key: string) {
  if (!data) return data;

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

export function getYear(str: string): string {
  return new Date(str.replace(/Q\d/, '').replace(/W\d\d/, '')).getFullYear().toString();
}

export function getYears(data: any[]): string[] {
  return Array.from(new Set((data || []).map((d) => getYear(d['date']))))
    .sort()
    .reverse();
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

export function getAvailableYearsOptions(data: any[], withAllOptions = true): any[] {
  const yearsOptions = [];
  if (withAllOptions) {
    yearsOptions.push({
      name: 'All years',
      value: 'all_years',
    });
  }
  const availableYears = getYears(data);
  availableYears.forEach((year) => yearsOptions.push({ name: year.toString(), value: year.toString() }));
  return yearsOptions;
}

export function getOptions(options: string[]): OptionType[] {
  return options.map((opt) => ({ name: opt, value: opt.toLowerCase() }));
}
