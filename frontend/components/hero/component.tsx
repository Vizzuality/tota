import React, { FC } from 'react';

export interface HeroProps {
  title: string;
  subtitle?: string;
  image: string;
  height?: string;
}

const Hero: FC<HeroProps> = ({ title, subtitle, image, height = '700px' }: HeroProps) => (
  <div
    className="w-full py-40 flex justify-center items-center bg-cover text-white"
    style={{ backgroundImage: `url(${image})`, height }}
  >
    <div className="text-center">
      <h1 className="text-5xl font-semibold mb-3">{title}</h1>
      {subtitle && <p className="text-xl mt-20">{subtitle}</p>}
    </div>
  </div>
);

export default Hero;
