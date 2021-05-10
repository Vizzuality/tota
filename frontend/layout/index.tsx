import React, { FC, ReactNode } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import Icon from 'components/icon';
import FacebookIcon from '../svgs/social/facebook.svg';
import TwitterIcon from '../svgs/social/twitter.svg';
import LinkedInIcon from '../svgs/social/linkedin.svg';
import YouTubeIcon from '../svgs/social/youtube.svg';
import NavLink from './navlink';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }: LayoutProps) => (
  <div className="min-h-screen flex flex-col">
    <Head>
      <title>Tota</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <nav className="fixed w-full bg-gray-400 p-4 top-0 flex justify-between items-center text-white">
      <Link href="/">TOTA</Link>
      <div className="flex gap-10">
        <NavLink href="/about">About</NavLink>
        <NavLink href="/themes">Themes + Indicators</NavLink>
        <NavLink href="/map">Map</NavLink>
        <NavLink href="/news">News</NavLink>
        <NavLink href="/contact">Contact</NavLink>
      </div>
      <div className="flex gap-3">
        <Icon icon={FacebookIcon} />
        <Icon icon={TwitterIcon} />
        <Icon icon={YouTubeIcon} />
        <Icon icon={LinkedInIcon} />
      </div>
    </nav>

    <main className="container mx-auto mt-24 flex-1">{children}</main>

    <footer className="text-center p-4">
      <a href="https://vizzuality.com" target="_blank" rel="noopener noreferrer">
        Powered by Vizzuality
      </a>
    </footer>
  </div>
);

export default Layout;
