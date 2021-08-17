export type NavbarTheme = 'transparent' | 'gray';
export type NavbarPosition = 'fixed' | 'absolute';

export interface NavbarProps {
  theme: NavbarTheme;
  position: NavbarPosition;
}
