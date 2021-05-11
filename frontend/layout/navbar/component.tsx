import React, { FC } from 'react';

import Link from 'next/link';
import Icon from 'components/icon';
import FacebookIcon from '../../svgs/social/facebook.svg'; // better to use something else, inline react does not work well with typescript, webpack5
import TwitterIcon from '../../svgs/social/twitter.svg';
import LinkedInIcon from '../../svgs/social/linkedin.svg';
import YouTubeIcon from '../../svgs/social/youtube.svg';
import NavLink from 'layout/navlink';

const Navbar: FC = () => (
  <nav className="fixed w-full h-20 z-10 bg-gray-400 p-4 top-0 flex justify-between items-center text-white">
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
);

export default Navbar;
