import uniqBy from 'lodash/uniqBy';

import { COLORS } from 'constants/charts';

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
