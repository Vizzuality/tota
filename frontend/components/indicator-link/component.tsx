import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import cx from 'classnames';

export interface IndicatorLinkProps {
  className?: string;
  url: string;
  name: string;
  image: string | StaticImageData;
}

const IndicatorLink: FC<IndicatorLinkProps> = ({
  className = 'w-40 h-40',
  url,
  name,
  image,
  ...args
}: IndicatorLinkProps) => (
  <Link href={url}>
    <a
      className={cx(className, 'text-white text-2xl font-bold bg-cover relative')}
      style={{ paddingBottom: '100%' }}
      {...args}
    >
      <Image src={image} layout="fill" objectFit="cover" />
      <span className="absolute left-0 bottom-0 p-5 text-left">{name}</span>
    </a>
  </Link>
);

export default IndicatorLink;
