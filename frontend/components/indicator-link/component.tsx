import React, { FC } from 'react';
import Link from 'next/link';
import cx from 'classnames';

export interface IndicatorLinkProps {
  className?: string;
  url: string;
  name: string;
  image: string;
}

const IndicatorLink: FC<IndicatorLinkProps> = ({ className = 'w-40 h-40', url, name, image, ...args }: IndicatorLinkProps) => (
  <Link href={url}>
    <a
      className={cx(className, 'text-white text-2xl font-bold bg-cover relative')}
      style={{ backgroundImage: `url(${image})`, paddingBottom: '100%' }}
      {...args}
    >
      <span className="absolute left-0 bottom-0 p-5 text-left">{name}</span>
    </a>
  </Link>
);

export default IndicatorLink;
