import React, { FC, useState } from 'react';
import cx from 'classnames';

import Link from 'next/link';
import Icon from 'components/icon';
import Hamburger from 'components/hamburger';
import FacebookIcon from 'svgs/social/facebook.svg?sprite';
import TwitterIcon from 'svgs/social/twitter.svg?sprite';
import LinkedInIcon from 'svgs/social/linkedin.svg?sprite';
import YouTubeIcon from 'svgs/social/youtube.svg?sprite';

import NavLink from 'layout/navlink';

const Navbar: FC = () => {
  const [isOpen, setOpen] = useState(false);

  const offScreenSlide = cx('transform lg:transform-none duration-300 ease-in-out', {
    '-translate-x-0': isOpen,
    'translate-x-full': !isOpen,
  });

  return (
    <nav
      aria-label="Main Navigation"
      className="fixed w-full h-20 z-30 bg-gray-400 p-4 top-0 flex justify-between items-center text-white"
    >
      <Link href="/">
        <a className="relative z-20">TOTA</a>
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
        <div className="flex flex-1 flex-col lg:flex-row justify-center items-center gap-5">
          <NavLink href="/about">About</NavLink>
          <NavLink href="/themes">Themes + Indicators</NavLink>
          <NavLink href="/map">Map</NavLink>
          <NavLink href="/news">News</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </div>
        <div className="flex justify-center items-center gap-5 h-20">
          <Icon icon={FacebookIcon} />
          <Icon icon={TwitterIcon} />
          <Icon icon={YouTubeIcon} />
          <Icon icon={LinkedInIcon} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
