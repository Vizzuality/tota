import sortBy from 'lodash/sortBy';
import orderBy from 'lodash/orderBy';

interface MergeRawData {
  rawData: any[];
  mergeBy: string;
  labelKey: string;
  valueKey: string;
}

export function mergeRawData({ rawData, mergeBy, labelKey, valueKey }: MergeRawData): any[] {
  if (!rawData || !rawData.length) return [];
  const dataObj = {};
  rawData.forEach((rd) => {
    dataObj[rd[mergeBy]] = {
      [mergeBy]: rd[mergeBy],
      ...dataObj[rd[mergeBy]],
      [rd[labelKey]]: rd[valueKey],
    };
  });
  return sortBy(Object.values(dataObj), mergeBy);
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

export function getAvailableYearsOptions(data: any[], withAllOptions = true): any[] {
  const yearsOptions = [];
  if (withAllOptions) {
    yearsOptions.push({
      name: 'All years',
      value: 'all_years',
    });
  }
  const availableYears = Array.from(
    new Set((data || []).map((d) => new Date(d['date'].replace(/Q\d/, '').replace(/W\d\d/, '')).getFullYear())),
  )
    .sort()
    .reverse();
  availableYears.forEach((year) => yearsOptions.push({ name: year.toString(), value: year.toString() }));
  return yearsOptions;
}
