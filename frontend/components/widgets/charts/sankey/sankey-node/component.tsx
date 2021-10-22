import React, { FC } from 'react';
import { Rectangle, Layer } from 'recharts';

export interface SankeyNodeProps {
  x: number;
  y: number;
  width: number;
  height: number;
  index: number;
  payload: any;
}

const SankeyNode: FC<SankeyNodeProps> = (props: SankeyNodeProps) => {
  const { x, y, width, height, index, payload } = props;
  const isOut = x > width;

  return (
    <Layer key={`SankeyNode${index}`}>
      <Rectangle fill={props.payload.color} fillOpacity="0.8" {...props} />
      <text
        textAnchor={isOut ? 'end' : 'start'}
        x={isOut ? x - 6 : x + width + 6}
        y={y + height / 2}
        fontSize="14"
        stroke="#333"
      >
        {payload.name}
      </text>
    </Layer>
  );
};

export default SankeyNode;
