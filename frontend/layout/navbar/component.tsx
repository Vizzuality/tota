import React, { FC, useState } from 'react';
import cx from 'classnames';
import Link from 'next/link';

import Hamburger from 'components/hamburger';
import NavLink from 'layout/navlink';

import LogoWhite from 'images/BCRTS-Logo-Horizontal-White.png';
import LogoColour from 'images/BCRTS-Logo-Horizontal-Colour.png';

import type { NavbarProps } from './types';
import type { HamburgerColor } from 'components/hamburger/types';

const THEMES = {
  transparent: {
    container: 'bg-transparent',
    nav: 'container mx-auto py-6 text-white',
    logo: LogoWhite,
    hamburger: 'white',
    mobile: 'bg-gray-500',
  },
  gray: {
    container: 'bg-gray2',
    nav: 'p-4 text-blue9',
    logo: LogoColour,
    hamburger: 'black',
    mobile: 'bg-gray-200',
  },
};

const Navbar: FC<NavbarProps> = ({ theme = 'transparent', position = 'absolute' }: NavbarProps) => {
  const [isOpen, setOpen] = useState(false);

  const offScreenSlide = cx('transform lg:transform-none duration-300 ease-in-out', {
    '-translate-x-0': isOpen,
    'translate-x-full': !isOpen,
  });
  const navLinkTheme = theme === 'transparent' ? 'light' : 'dark';

  return (
    <div className={cx('w-full h-20 z-30 top-0', position, { [THEMES[theme].container]: theme })}>
      <nav
        aria-label="Main Navigation"
        className={cx('flex justify-between items-center text-lg', { [THEMES[theme].nav]: theme })}
      >
        <Link href="/">
          <a className="relative z-20">
            <img src={THEMES[theme].logo} />
          </a>
        </Link>
        <Hamburger
          className="lg:hidden relative z-20"
          color={THEMES[theme].hamburger as HamburgerColor}
          isOpen={isOpen}
          onClick={() => setOpen(!isOpen)}
        />
        <div
          className={cx(
            'fixed lg:static z-10 top-0 left-0',
            'bg-gray-200 lg:bg-transparent w-screen h-screen lg:h-auto flex flex-col lg:flex-row',
            offScreenSlide,
            {
              [THEMES[theme].mobile]: true,
            },
          )}
          id="menu-list"
        >
          <div className="flex flex-1 flex-col lg:flex-row justify-center lg:justify-end items-center gap-5">
            <NavLink theme={navLinkTheme} href="/about">
              About
            </NavLink>
            <NavLink theme={navLinkTheme} href="/themes">
              Themes + Indicators
            </NavLink>
            <NavLink theme={navLinkTheme} href="/map">
              Map
            </NavLink>
            <NavLink theme={navLinkTheme} href="/get-involved">
              Get Involved
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
