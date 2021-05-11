import React, { FC } from 'react';

export interface HeroProps {
  title: string;
  subtitle?: string;
  image: string;
  height?: string;
}

const Hero: FC<HeroProps> = ({ title, subtitle, image, height }: HeroProps) => (
  <div
    className="w-full h-40 border flex justify-center items-center bg-cover"
    style={{ backgroundImage: `url(/${image})`, ...(height ? { height } : {}) }}
  >
    <div className="text-center">
      <h1 className="text-5xl font-semibold mb-3">{title}</h1>
      {subtitle && <p className="text-xl">{subtitle}</p>}
    </div>
  </div>
);

export default Hero;
