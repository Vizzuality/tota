import React, { FC } from 'react';
import { Tooltip, Treemap, ResponsiveContainer } from 'recharts';

import CustomTooltip from './tooltip';
import CustomizedContent from './content';

import type { TreemapChartProps } from './types';

const Chart: FC<TreemapChartProps> = ({
  data,
  chartProps,
  width = '100%',
  height = 400,
  tooltip = { cursor: false },
}: TreemapChartProps) => {
  return (
    <ResponsiveContainer width={width} height={height} debounce={100}>
      <Treemap
        data={data}
        dataKey="value"
        ratio={4 / 3}
        fill="#fff"
        isAnimationActive={false}
        {...chartProps}
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
