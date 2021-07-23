import React, { FC, useState } from 'react';

export interface SankeyLinkProps {
  sourceX: number;
  targetX: number;
  sourceY: number;
  targetY: number;
  sourceControlX: number;
  targetControlX: number;
  linkWidth: number;
  payload: any;
}

const SankeyLink: FC<SankeyLinkProps> = (props: SankeyLinkProps) => {
  const { sourceX, sourceY, sourceControlX, targetX, targetY, targetControlX, linkWidth, payload } = props;
  const [hover, setHover] = useState(false);

  return (
    <path
      d={`
          M${sourceX},${sourceY}
          C${sourceControlX},${sourceY} ${targetControlX},${targetY} ${targetX},${targetY}
      `}
      fill="none"
      stroke={payload.color}
      strokeWidth={linkWidth}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      strokeOpacity={hover ? 0.2 : 0.4}
    />
  );
};

export default SankeyLink;
