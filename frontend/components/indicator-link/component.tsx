import React, { FC } from 'react';
import Link from 'next/link';

export interface IndicatorLinkProps {
  url: string;
  name: string;
  image: string;
}

const IndicatorLink: FC<IndicatorLinkProps> = ({ url, name, image, ...args }: IndicatorLinkProps) => (
  <Link href={url}>
    <a
      className="w-40 h-40 flex border text-white justify-center items-center bg-cover"
      style={{ backgroundImage: `url(/${image})` }}
      {...args}
    >
      {name}
    </a>
  </Link>
);

export default IndicatorLink;
