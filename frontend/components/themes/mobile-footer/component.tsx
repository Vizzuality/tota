import React, { useState } from 'react';
import { useRouter } from 'next/router';
import cx from 'classnames';

import Drawer from 'components/drawer';
import Button from 'components/button';
import Icon from 'components/icon';

import themes from 'constants/themes';
import Link from 'next/link';

import ChevronIcon from '../../../svgs/chevron-down.svg';

export interface ThemeMobileFooterProps {}

const ThemeMobileFooter: React.FC<ThemeMobileFooterProps> = () => {
  const [isOpen, setOpen] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  const theme = themes.find((t) => t.slug === slug);

  return (
    <div className="lg:hidden">
      <div className="fixed z-20 h-20 w-full bg-gray-400 text-white bottom-0 left-0 flex items-center justify-center">
        <Button
          aria-expanded={isOpen}
          aria-controls="mobile-bottom-drawer"
          className="w-full h-full flex items-center"
          onClick={() => setOpen(!isOpen)}
        >
          <span className="flex-1">{theme.name}</span>
          <Icon
            className={cx('mr-10 transform duration-300 ease-in-out', {
              'rotate-180 ': !isOpen,
            })}
            icon={ChevronIcon}
          />
        </Button>
      </div>
      <Drawer placement="bottom" isOpen={isOpen}>
        <div id="mobile-bottom-drawer" className="mb-20 overflow-auto bg-gray-300 flex flex-col text-black">
          {themes.map((theme) => (
            <Link key={theme.slug} href={`/themes/${theme.slug}`}>
              <a className="mx-5 py-5 border-b-2 border-white last:border-b-0" onClick={() => setOpen(false)}>
                {theme.name}
              </a>
            </Link>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default ThemeMobileFooter;
