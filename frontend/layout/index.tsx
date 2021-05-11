import React, { FC, ReactNode } from 'react';

import Head from 'next/head';
import Navbar from './navbar';

interface LayoutProps {
  className?: string;
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ className = 'container', children }: LayoutProps) => (
  <div className="min-h-screen flex flex-col">
    <Head>
      <title>Tota</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Navbar />

    <main className={`${className} mx-auto mt-20 flex-1`}>{children}</main>

    <footer className="text-center p-4">
      <a href="https://vizzuality.com" target="_blank" rel="noopener noreferrer">
        Powered by Vizzuality
      </a>
    </footer>
  </div>
);

export default Layout;
