import React, { FC, ReactNode } from 'react';
import cx from 'classnames';

import Head from 'next/head';
import Navbar from './navbar';

interface LayoutProps {
  className?: string;
  children: ReactNode;
  navbar?: 'transparent' | 'fixed';
}

const Layout: FC<LayoutProps> = ({ className = 'container', navbar = 'transparent', children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Head>
        <title>Tota</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar theme={navbar} />

      <main className={cx(className, 'mx-auto flex-1', { 'mt-20': navbar === 'fixed' })}>{children}</main>
    </div>
  );
};

export default Layout;
