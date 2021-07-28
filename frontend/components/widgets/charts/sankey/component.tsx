import React, { FC } from 'react';
import { Tooltip, Sankey, ResponsiveContainer } from 'recharts';
import SankeyLink from './sankey-link';
import SankeyNode from './sankey-node';
import { prepareForSankey } from './utils';
import type { SankeyChartProps } from './types';

const Chart: FC<SankeyChartProps> = ({
  data,
  chartConfig,
  sourceKey,
  targetKey,
  valueKey,
  sourceColors,
  targetColors,
  colorLinksBy,
  tooltip = { cursor: false },
}: SankeyChartProps) => {
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
