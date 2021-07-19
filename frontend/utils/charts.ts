import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import { colors } from 'constants/charts';

const COLORS = colors;

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
  sourceColors?: string[];
  targetColors?: string[];
  colorLinksBy?: 'source' | 'target';
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
  sourceColors = COLORS,
  targetColors = COLORS,
  colorLinksBy = 'source',
}: PrepareForSankeyArgs): PrepareForSankeyResult {
  const sources = uniqBy(
    rawData.map((x, i) => ({ name: x[sourceKey], color: sourceColors[i % sourceColors.length] })),
    'name',
  );
  const targets = uniqBy(
    rawData.map((x, i) => ({ name: x[targetKey], color: targetColors[i % targetColors.length] })),
    'name',
  );

  const nodes = sources.concat(targets);
  const nodeNames = nodes.map((x: any) => x.name);

  const links = rawData
    .map((d: any) => ({
      source: nodeNames.indexOf(d[sourceKey]),
      target: nodeNames.indexOf(d[targetKey]),
      value: d[valueKey],
    }))
    .map((d: any) => ({
      ...d,
      color: nodes[d[colorLinksBy]].color,
    }));

  return {
    nodes,
    links,
  };
}
