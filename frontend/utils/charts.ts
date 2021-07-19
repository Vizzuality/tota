import sortBy from 'lodash/sortBy';
import uniq from 'lodash/uniq';

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

export function getAvailableYearsOptions(data: any[]): any[] {
  const yearsOptions = [
    {
      name: 'All years',
      value: 'all_years',
    },
  ];
  const availableYears = Array.from(new Set((data || []).map((d) => new Date(d['date']).getFullYear())))
    .sort()
    .reverse();
  availableYears.forEach((year) => yearsOptions.push({ name: year.toString(), value: year.toString() }));
  return yearsOptions;
}

interface PrepareForSankeyArgs {
  rawData: any[];
  sourceKey: string;
  targetKey: string;
  valueKey: string;
}

interface PrepareForSankeyResult {
  nodes: any[];
  links: any[];
}

export function prepareForSankey({
  rawData,
  sourceKey,
  targetKey,
  valueKey,
}: PrepareForSankeyArgs): PrepareForSankeyResult {
  const sources = uniq(rawData.map((x) => x[sourceKey]));
  const targets = uniq(rawData.map((x) => x[targetKey]));

  const nodesRaw = sources.concat(targets);
  const nodes = nodesRaw.map((x: string) => ({ name: x }));

  const links = rawData.map((d: any) => ({
    source: nodesRaw.indexOf(d[sourceKey]),
    target: nodesRaw.indexOf(d[targetKey]),
    value: d[valueKey],
  }));

  return {
    nodes,
    links,
  };
}
