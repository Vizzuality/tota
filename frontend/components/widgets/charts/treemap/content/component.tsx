import React, { FC } from 'react';

import type { CustomizedContentProps } from './types';

const CustomizedContent: FC<CustomizedContentProps> = ({
  x,
  y,
  width,
  height,
  name,
  color,
}: CustomizedContentProps) => {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: color,
        }}
      />
      <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill="#fff" stroke="#fff" fontSize={16}>
        {name}
      </text>
    </g>
  );
};

export default CustomizedContent;
