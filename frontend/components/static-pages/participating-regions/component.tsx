import React, { FC } from 'react';
import Link from 'next/link';
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
    link: '#',
  },
  {
    title: 'Kooteney Rockies Tourism',
    logo: krtLogo,
    link: '#',
  },
  {
    title: 'Northern British Columbia Tourism',
    logo: nbctaLogo,
    link: '#',
  },
  {
    title: 'Thompson Okanagan Tourism Association',
    logo: totaLogo,
    link: '#',
  },
  {
    title: 'Tourism Vancouver Island',
    logo: tviLogo,
    link: '#',
  },
];

export interface ParticipatingRegionsProps {
  className?: string;
}

const ParticipatingRegions: FC<ParticipatingRegionsProps> = ({ className }: ParticipatingRegionsProps) => (
  <div className={cx('text-blue9 py-24 text-center', { [className]: !!className })}>
    <h3 className="text-4xl font-bold">Participating Regions</h3>

    <div className="mt-20 px-10 md:px-24 flex flex-row flex-wrap gap-24 justify-center">
      {participatingRegions.map((region) => (
        <Link key={region.title} href={region.link}>
          <a className="relative z-20">
            <img src={region.logo} alt={region.title} />
          </a>
        </Link>
      ))}
    </div>
  </div>
);

export default ParticipatingRegions;
