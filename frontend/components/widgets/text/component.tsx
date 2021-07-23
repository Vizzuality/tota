import React, { FC } from 'react';

export interface TextProps {
  data: string;
}

const Text: FC<TextProps> = ({ data }: TextProps) => {
  return <div className="flex flex-1 items-center justify-center text-3xl text-color1">{data}</div>;
};

export default Text;
