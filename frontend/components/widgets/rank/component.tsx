import React, { FC } from 'react';

export interface RankValueProp {
  position: number;
  value: string;
}

export interface RankProps {
  data: RankValueProp[];
}

const Rank: FC<RankProps> = ({ data }: RankProps) => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-5">
      {data.map(({ position, value }) => (
        <div key={position} className="flex items-center">
          <div
            className="rounded-full bg-color1 text-white text-xl h-50 w-50 flex items-center justify-center mr-2"
            style={{ width: 40, height: 40 }}
          >
            {position}
          </div>
          <div className="text-3xl text-color1">{value}</div>
        </div>
      ))}
    </div>
  );
};

export default Rank;
