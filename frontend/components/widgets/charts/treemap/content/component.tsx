import React, { FC } from 'react';
import { Text } from 'recharts';

import type { CustomizedContentProps } from './types';

const CustomizedContent: FC<CustomizedContentProps> = ({
  x,
  y,
  width,
  height,
  name,
  color,
}: CustomizedContentProps) => {
  const angle = width < 70 ? 90 : null;
  const textWidth = width < 70 ? height : width;

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
      <Text
        x={x + width / 2}
        y={y + height / 2 + 7}
        angle={angle}
        width={textWidth}
        textAnchor="middle"
        verticalAnchor="middle"
        fill="#fff"
        stroke="#fff"
        fontSize={16}
      >
        {name}
      </Text>
    </g>
  );
};

export default CustomizedContent;
