import React, { FC, ReactNode } from 'react';
import cx from 'classnames';

import Navbar from './navbar';
import Footer from './footer';
import type { NavbarPosition, NavbarTheme } from './navbar/types';

interface LayoutProps {
  className?: string;
  hideFooter?: boolean;
  children: ReactNode;
  navbarTheme?: NavbarTheme;
  navbarPosition?: NavbarPosition;
  navbarHeader?: string;
}

const Layout: FC<LayoutProps> = ({
  className = 'container',
  navbarTheme = 'transparent',
  navbarPosition = 'fixed',
  navbarHeader,
  hideFooter = false,
  children,
}: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar theme={navbarTheme} position={navbarPosition} header={navbarHeader} />

      <main className={cx(className, 'mx-auto flex-1 bg-gray-50')}>{children}</main>

      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
