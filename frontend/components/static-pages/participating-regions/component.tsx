import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import cx from 'classnames';

import krtLogo from 'images/home/KRT-Logo.png';
import nbctaLogo from 'images/home/NBCTA-Logo.png';
import totaLogo from 'images/home/TOTA-Logo-Colour.png';
import tviLogo from 'images/home/Tourism-Vancouver-Island-Logo.png';
import ccctaLogo from 'images/home/CCCTA-Logo.png';

const participatingRegions = [
  {
    title: 'Cariboo Chilcotin Coast',
    logo: ccctaLogo,
    link: 'https://landwithoutlimits.com',
  },
  {
    title: 'Kooteney Rockies Tourism',
    logo: krtLogo,
    link: 'https://www.krtourism.ca',
  },
  {
    title: 'Northern British Columbia Tourism',
    logo: nbctaLogo,
    link: 'https://www.travelnbc.com',
  },
  {
    title: 'Thompson Okanagan Tourism Association',
    logo: totaLogo,
    link: 'https://www.totabc.org',
  },
  {
    title: 'Tourism Vancouver Island',
    logo: tviLogo,
    link: 'https://vancouverisland.travel',
  },
];

export interface ParticipatingRegionsProps {
  className?: string;
}

const ParticipatingRegions: FC<ParticipatingRegionsProps> = ({ className }: ParticipatingRegionsProps) => (
  <div className={cx('text-blue-800 py-24 text-center', { [className]: !!className })}>
    <h3 className="text-4xl font-bold">Participating Regions</h3>

    <div className="flex flex-row flex-wrap items-center justify-center gap-24 mt-20">
      {participatingRegions.map((region) => (
        <Link key={region.title} href={region.link}>
          <a className="relative z-20 flex-1">
            <Image src={region.logo} alt={region.title} quality={100} />
          </a>
        </Link>
      ))}
    </div>
  </div>
);

export default ParticipatingRegions;
