import React, { FC } from 'react';
import { RankProps } from './types';

const Rank: FC<RankProps> = ({ data }: RankProps) => {
  return (
    <div className="flex flex-col justify-center gap-5">
      {data.map((value, index) => (
        <div key={index} className="flex items-center">
          <div
            className="rounded-full bg-color1 text-white text-xl h-50 w-50 flex items-center justify-center mr-2"
            style={{ width: 40, height: 40 }}
          >
            {index + 1}
          </div>
          <div className="text-3xl text-color1">{value}</div>
        </div>
      ))}
    </div>
  );
};

export default Rank;
