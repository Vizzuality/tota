import React, { FC, ReactNode } from 'react';

import Head from 'next/head';
import Navbar from './navbar';

interface LayoutProps {
  className?: string;
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ className = 'container', children }: LayoutProps) => (
  <div className="min-h-screen flex flex-col bg-gray-100">
    <Head>
      <title>Tota</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Navbar />

    <main className={`${className} mx-auto mt-20 flex-1`}>{children}</main>
  </div>
);

export default Layout;
