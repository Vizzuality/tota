import React, { FC } from 'react';

import type { TextProps } from './types';

const Text: FC<TextProps> = ({ data }: TextProps) => {
  return <div className="flex flex-1 items-center justify-center text-3xl text-blue-800">{data}</div>;
};

export default Text;
