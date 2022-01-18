import React, { FC, useState } from 'react';
import Image from 'next/image';
import useInterval from 'hooks/use-interval';

import type { ImageCarouselProps } from './types';

const ImageCarousel: FC<ImageCarouselProps> = ({ images }: ImageCarouselProps) => {
  const [activeImage, setActiveImage] = useState(0);
  const setNextImage = () => {
    const nextImageIndex = (activeImage + 1) % images.length;
    setActiveImage(nextImageIndex);
  };

  useInterval(setNextImage, 4000);

  return (
    <>
      {images.map((img, i) => (
        <Image
          key={`image-carousel-image-${img}`}
          alt="Hero image"
          src={img}
          layout="fill"
          objectFit="cover"
          objectPosition="bottom"
          quality={100}
          placeholder="blur"
          priority={i === 0}
          className={`transition duration-500 ease-in-out
        ${i === activeImage ? 'opacity-1' : 'opacity-0'}`}
        />
      ))}
    </>
  );
};

export default ImageCarousel;
