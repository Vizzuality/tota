import React, { FC, ReactNode } from 'react';
import cx from 'classnames';

import Head from 'next/head';
import Navbar from './navbar';
import Footer from './footer';
import type { NavbarPosition, NavbarTheme } from './navbar/types';

interface LayoutProps {
  className?: string;
  hideFooter?: boolean;
  children: ReactNode;
  navbarTheme?: NavbarTheme;
  navbarPosition?: NavbarPosition;
}

const Layout: FC<LayoutProps> = ({
  className = 'container',
  navbarTheme = 'transparent',
  navbarPosition = 'absolute',
  hideFooter = false,
  children,
}: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Head>
        <title>Tota</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar theme={navbarTheme} position={navbarPosition} />

      <main className={cx(className, 'mx-auto flex-1 bg-gray0', { 'mt-20': navbarPosition === 'fixed' })}>{children}</main>

      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
