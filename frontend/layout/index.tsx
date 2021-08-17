import React, { FC, ReactNode } from 'react';
import cx from 'classnames';

import Head from 'next/head';
import Navbar from './navbar';
import type { NavbarPosition, NavbarTheme } from './navbar/types';

interface LayoutProps {
  className?: string;
  children: ReactNode;
  navbarTheme?: NavbarTheme;
  navbarPosition?: NavbarPosition;
}

const Layout: FC<LayoutProps> = ({
  className = 'container',
  navbarTheme = 'transparent',
  navbarPosition = 'absolute',
  children,
}: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Head>
        <title>Tota</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar theme={navbarTheme} position={navbarPosition} />

      <main className={cx(className, 'mx-auto flex-1', { 'mt-20': navbarPosition === 'fixed' })}>{children}</main>
    </div>
  );
};

export default Layout;
