import { ReactNode, MouseEvent } from 'react';

export type HamburgerColor = 'white' | 'black';

export interface HamburgerProps {
  isOpen: boolean;
  color: HamburgerColor;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children?: ReactNode;
}
