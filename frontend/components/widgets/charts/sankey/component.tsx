import React, { FC } from 'react';
import uniqBy from 'lodash/uniqBy';
import { Tooltip, Sankey, ResponsiveContainer } from 'recharts';
import SankeyLink from './sankey-link';
import SankeyNode from './sankey-node';
import { colors } from 'constants/charts';

const COLORS = colors;

export interface ConfigProps {
  chartConfig: any;
  tooltip: any;
  sourceKey: string;
  targetKey: string;
  valueKey: string;
  sourceColors?: string[];
  targetColors?: string[];
  colorLinksBy?: 'source' | 'target';
}

export interface ChartProps {
  data: any[];
  config: ConfigProps;
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

function prepareForSankey({
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

const Chart: FC<ChartProps> = ({ data, config }: ChartProps) => {
  const { chartConfig, sourceKey, targetKey, valueKey, sourceColors, targetColors, colorLinksBy, tooltip } = config;
  const chartData = prepareForSankey({
    rawData: data,
    sourceKey,
    targetKey,
    valueKey,
    sourceColors,
    targetColors,
    colorLinksBy,
  });

  return (
    <ResponsiveContainer width="100%" height={500}>
      {/* @ts-expect-error: Disable type errors for SankeyLink and SankeyNode props missing */}
      <Sankey data={chartData} nodePading={50} link={<SankeyLink />} node={<SankeyNode />} {...chartConfig}>
        {tooltip && <Tooltip {...tooltip} />}
      </Sankey>
    </ResponsiveContainer>
  );
};

export default Chart;
