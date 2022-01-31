export interface HeroProps {
  children?: ReactNode;
  cta?: ReactNode;
  className?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  image?: string | StaticImageData;
  images?: string[] | StaticImageData[];
  height?: string | number;
  maxTextWidth?: string | number;
}
