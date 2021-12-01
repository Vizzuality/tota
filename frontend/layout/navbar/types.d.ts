export type NavbarTheme = 'transparent' | 'gray';
export type NavbarPosition = 'fixed' | 'relative';

export interface NavbarProps {
  theme: NavbarTheme;
  position: NavbarPosition;
  header?: string;
}
