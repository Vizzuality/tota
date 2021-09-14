import React, { FC } from 'react';
import Link from 'next/link';

import themes from 'constants/themes';

import LogoWhite from 'images/BCRTS-Logo-Horizontal-White.png';

const links = [
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Themes + Indicators',
    href: '/themes',
    children: themes.map((theme) => ({
      title: theme.title,
      href: `/themes/british-columbia/${theme.slug}`,
    })),
  },
  {
    title: 'Map',
    href: '/map',
  },
  {
    title: 'Get Involved',
    href: '/get-involved',
    children: [
      {
        title: 'Suggest a Story',
        href: '/get-involved',
      },
      {
        title: 'Contribute Data',
        href: '/get-involved',
      },
      {
        title: 'Feedback & Questions',
        href: '/get-involved',
      },
    ],
  },
];

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <div className="bg-blue-800">
      <div className="container px-10 py-14 mx-auto text-white flex flex-row justify-between">
        <div>
          <Link href="/">
            <a>
              <img src={LogoWhite} />
            </a>
          </Link>
        </div>
        {links.map((link) => (
          <div key={link.title} className="pt-2">
            <Link href={link.href}>
              <a className="font-bold text-lg">{link.title}</a>
            </Link>
            <div className="flex flex-col mt-5">
              {link.children &&
                link.children.map((chLink) => (
                  <Link key={chLink.title} href={chLink.href}>
                    <a className="mt-2">{chLink.title}</a>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
