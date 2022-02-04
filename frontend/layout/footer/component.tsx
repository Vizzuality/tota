import React, { FC } from 'react';
import kebabCase from 'lodash/kebabCase';
import Link from 'next/link';
import Image from 'next/image';

import { useThemes } from 'hooks/themes';

import LogoWhite from 'images/BCRTS-Logo-Horizontal-White.png';

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  const { data: themes } = useThemes();

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
        href: `/themes/british-columbia/${kebabCase(theme.slug)}`,
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

  return (
    <div className="bg-blue-800">
      <div className="container px-10 pt-14 pb-8 mx-auto text-white flex flex-row flex-wrap justify-between">
        <div className="w-full lg:w-auto pb-10">
          <Link href="/">
            <a>
              <Image src={LogoWhite} quality={100} />
            </a>
          </Link>
        </div>
        {links.map((link) => (
          <div key={link.title} className="pt-2 pb-6 w-1/2 lg:w-auto">
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
