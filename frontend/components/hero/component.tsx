import React, { FC } from 'react';
import cx from 'classnames';
import Image from 'next/image';
import ImageCarousel from 'components/image-carousel';
import type { HeroProps } from './types';

const Hero: FC<HeroProps> = ({
  className = 'text-white',
  children,
  cta,
  title,
  subtitle,
  image,
  images,
  height = 700,
  maxTextWidth = 700,
}: HeroProps) => (
  <div className={cx(className, 'w-full flex justify-center items-center bg-cover')} style={{ height }}>
    <div id="hero" className="absolute h-full w-screen overflow-hidden z-0" style={{ height }}>
      {images ? (
        <ImageCarousel images={images} />
      ) : (
        <Image alt="Hero image" src={image} layout="fill" objectFit="cover" objectPosition="bottom" quality={100} />
      )}
    </div>
    {children ? (
      children
    ) : (
      <div className="text-center py-24 container z-10">
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
