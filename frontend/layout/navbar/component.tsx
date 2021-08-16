import React, { FC, useState } from 'react';
import cx from 'classnames';

import Link from 'next/link';
import Hamburger from 'components/hamburger';
import Logo from 'images/BCRTS-Logo-Horizontal-White.png';

import NavLink from 'layout/navlink';

const THEMES = {
  transparent: {
    container: 'bg-transparent absolute',
    nav: 'container mx-auto py-6',
  },
  fixed: {
    container: 'bg-gray-400 fixed',
    nav: 'p-4',
  },
};

export interface NavbarProps {
  theme: 'transparent' | 'fixed';
}

const Navbar: FC<NavbarProps> = ({ theme = 'transparent' }: NavbarProps) => {
  const [isOpen, setOpen] = useState(false);

  const offScreenSlide = cx('transform lg:transform-none duration-300 ease-in-out', {
    '-translate-x-0': isOpen,
    'translate-x-full': !isOpen,
  });

  return (
    <div className={cx('w-full h-20 z-30 top-0', { [THEMES[theme].container]: theme })}>
      <nav
        aria-label="Main Navigation"
        className={cx('flex justify-between items-center text-white', { [THEMES[theme].nav]: theme })}
      >
        <Link href="/">
          <a className="relative z-20">
            <img src={Logo} />
          </a>
        </Link>
        <Hamburger className="lg:hidden relative z-20" color="white" isOpen={isOpen} onClick={() => setOpen(!isOpen)} />
        <div
          className={cx(
            'fixed lg:static z-10 top-0 left-0',
            'bg-gray-500 lg:bg-transparent w-screen h-screen lg:h-auto flex flex-col lg:flex-row',
            offScreenSlide,
          )}
          id="menu-list"
        >
          <div className="flex flex-1 flex-col lg:flex-row justify-end items-center gap-5">
            <NavLink href="/about">About</NavLink>
            <NavLink href="/themes">Themes + Indicators</NavLink>
            <NavLink href="/map">Map</NavLink>
            <NavLink href="/get-involved">Get Involved</NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
