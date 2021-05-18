import React, { FC, useState } from 'react';
import cx from 'classnames';

import Link from 'next/link';
import Icon from 'components/icon';
import Hamburger from 'components/hamburger';
import FacebookIcon from '../../svgs/social/facebook.svg'; // better to use something else, inline react does not work well with typescript, webpack5
import TwitterIcon from '../../svgs/social/twitter.svg';
import LinkedInIcon from '../../svgs/social/linkedin.svg';
import YouTubeIcon from '../../svgs/social/youtube.svg';
import NavLink from 'layout/navlink';

const Navbar: FC = () => {
  const [isOpen, setOpen] = useState(false);

  const slideClassNames = cx('transform lg:transform-none ${isOpenClass} duration-300 ease-in-out', {
    '-translate-x-0': isOpen,
    'translate-x-full': !isOpen,
  });

  return (
    <nav className="fixed w-full h-20 z-10 bg-gray-400 p-4 top-0 flex justify-between items-center text-white">
      <Link href="/">
        <a className="relative z-20">TOTA</a>
      </Link>
      <Hamburger className="lg:hidden relative z-20" color="white" isOpen={isOpen} onClick={() => setOpen(!isOpen)} />
      <div
        className={`fixed lg:static z-10 top-0 left-0 bg-gray-500 lg:bg-transparent flex flex-col lg:flex-row w-screen lg:w-auto h-screen lg:h-auto justify-center items-center gap-5 ${slideClassNames}`}
      >
        <NavLink href="/about">About</NavLink>
        <NavLink href="/themes">Themes + Indicators</NavLink>
        <NavLink href="/map">Map</NavLink>
        <NavLink href="/news">News</NavLink>
        <NavLink href="/contact">Contact</NavLink>
      </div>
      <div
        className={`fixed lg:static z-10 bottom-10 left-0 w-screen lg:w-auto h-30 lg:h-auto flex flex-row justify-center gap-5 ${slideClassNames}`}
      >
        <Icon icon={FacebookIcon} />
        <Icon icon={TwitterIcon} />
        <Icon icon={YouTubeIcon} />
        <Icon icon={LinkedInIcon} />
      </div>
    </nav>
  );
};

export default Navbar;
