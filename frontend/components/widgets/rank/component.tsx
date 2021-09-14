import React, { FC } from 'react';
import { RankProps } from './types';

function format(text: string, value: string) {
  const [before, after] = text.split('{value}');
  return (
    <>
      {before}
      <span className="text-green-400 text-5xl font-bold">{value}</span>
      {after}
    </>
  );
}

const Rank: FC<RankProps> = ({ data }: RankProps) => {
  return (
    <div className="flex flex-col justify-center gap-5 py-5">
      {data.map((item, index) => (
        <div key={index} className="flex items-baseline">
          <div
            className="rounded-full bg-blue-800 text-white text-xl flex items-center justify-center mr-5 transform -translate-y-1"
            style={{ width: 40, height: 40 }}
          >
            {index + 1}
          </div>
          <div className="text-3xl text-blue-800">{format(item.text, item.value)}</div>
        </div>
      ))}
    </div>
  );
};

export default Rank;
