import React, { FC } from 'react';
import { Tooltip, Treemap, ResponsiveContainer } from 'recharts';

import CustomTooltip from './tooltip';
import CustomizedContent from './content';

import type { TreemapChartProps } from './types';

const Chart: FC<TreemapChartProps> = ({
  data,
  chartConfig,
  width = '100%',
  height = 400,
  tooltip = { cursor: false },
}: TreemapChartProps) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      <Treemap
        data={data}
        dataKey="value"
        ratio={4 / 3}
        fill="#fff"
        {...chartConfig}
        content={
          /* @ts-expect-error: Disable type errors for CustomizedContent props missing */
          <CustomizedContent />
        }
      >
        {tooltip && <Tooltip {...tooltip} content={<CustomTooltip {...tooltip} />} />}
      </Treemap>
    </ResponsiveContainer>
  );
};

export default Chart;
