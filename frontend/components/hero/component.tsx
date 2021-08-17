import React, { FC, ReactNode } from 'react';
import cx from 'classnames';

export interface HeroProps {
  children?: ReactNode;
  className?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  image: string;
  height?: string | number;
  maxTextWidth?: string | number;
}

const Hero: FC<HeroProps> = ({
  className = 'text-white',
  children,
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
        {title && <h1 className="text-5xl font-semibold mb-3 leading-tight">{title}</h1>}

        {subtitle && (
          <p className="text-lg mt-20 mx-auto" style={{ maxWidth: maxTextWidth }}>
            {subtitle}
          </p>
        )}
      </div>
    )}
  </div>
);

export default Hero;
