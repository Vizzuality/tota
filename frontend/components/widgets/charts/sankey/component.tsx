import React, { FC } from 'react';
import { Tooltip, Sankey, ResponsiveContainer } from 'recharts';
import SankeyLink from './sankey-link';
import SankeyNode from './sankey-node';

export interface ConfigProps {
  chartConfig: any;
  tooltip: any;
}

export interface ChartProps {
  data: any[];
  config: ConfigProps;
}

const Chart: FC<ChartProps> = ({ data, config }: ChartProps) => {
  const { chartConfig, tooltip } = config;

  return (
    <ResponsiveContainer width="100%" height={500}>
      {/* @ts-expect-error: Disable type errors for SankeyLink and SankeyNode props missing */}
      <Sankey data={data} nodePading={50} link={<SankeyLink />} node={<SankeyNode />} {...chartConfig}>
        {tooltip && <Tooltip {...tooltip} />}
      </Sankey>
    </ResponsiveContainer>
  );
};

export default Chart;
