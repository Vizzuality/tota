export interface HeroProps {
  children?: ReactNode;
  cta?: ReactNode;
  className?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  image?: string;
  images?: string[];
  height?: string | number;
  maxTextWidth?: string | number;
}
