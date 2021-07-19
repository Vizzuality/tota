import React, { FC } from 'react';
import { Tooltip, Sankey, ResponsiveContainer } from 'recharts';

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
      <Sankey data={data} nodePading={50} link={{ stroke: '#77c878' }} {...chartConfig}>
        {tooltip && <Tooltip {...tooltip} />}
      </Sankey>
    </ResponsiveContainer>
  );
};

export default Chart;
