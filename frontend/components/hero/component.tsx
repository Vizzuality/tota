import React, { FC } from 'react';
import cx from 'classnames';

import type { HeroProps } from './types';

const Hero: FC<HeroProps> = ({
  className = 'text-white',
  children,
  cta,
  title,
  subtitle,
  image,
  height = 700,
  maxTextWidth = 700,
}: HeroProps) => (
  <div
    className={cx(className, 'w-full py-40 flex justify-center items-center bg-cover')}
    style={{ backgroundImage: `url(${image})`, height }}
  >
    {children ? (
      children
    ) : (
      <div className="text-center container">
        {title && (
          <h1 className="text-4xl md:text-5xl font-semibold mt-20 mb-3 leading-tight md:leading-tight">{title}</h1>
        )}

        {subtitle && (
          <p className="text-lg leading-7 mt-14 md:mt-20 mx-auto" style={{ maxWidth: maxTextWidth }}>
            {subtitle}
          </p>
        )}

        {cta && <div className="mt-10">{cta}</div>}
      </div>
    )}
  </div>
);

export default Hero;
