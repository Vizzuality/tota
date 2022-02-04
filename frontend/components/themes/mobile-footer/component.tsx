import React, { useState } from 'react';
import cx from 'classnames';
import kebabCase from 'lodash/kebabCase';

import { useRouterSelectedTheme, useThemes } from 'hooks/themes';

import Drawer from 'components/drawer';
import Button from 'components/button';
import Icon from 'components/icon';

import Link from 'next/link';

import ChevronIcon from 'svgs/chevron-down.svg?sprite';
import { useRouterSelectedRegion } from 'hooks/regions';

export interface ThemeMobileFooterProps {}

const ThemeMobileFooter: React.FC<ThemeMobileFooterProps> = () => {
  const [isOpen, setOpen] = useState(false);
  const theme = useRouterSelectedTheme();
  const region = useRouterSelectedRegion();
  const { data: themes } = useThemes();

  const regionSlug = region?.slug || 'british-columbia';

  return (
    <div className="lg:hidden">
      <div className="fixed z-20 h-20 w-full bg-blue-800 text-white bottom-0 left-0 flex items-center justify-center">
        <Button
          aria-expanded={isOpen}
          aria-controls="mobile-bottom-drawer"
          theme="blue"
          className="w-full h-full flex items-center"
          onClick={() => setOpen(!isOpen)}
        >
          <span className="flex-1">{theme.title}</span>
          <Icon
            className={cx('w-5 h-5 mr-10 transform duration-300 ease-in-out', {
              'rotate-180 ': !isOpen,
            })}
            icon={ChevronIcon}
          />
        </Button>
      </div>
      <Drawer placement="bottom" isOpen={isOpen}>
        <div id="mobile-bottom-drawer" className="mb-20 overflow-auto bg-blue-800 flex flex-col text-white">
          {themes.map((theme) => (
            <Link key={theme.slug} href={`/themes/${kebabCase(regionSlug)}/${kebabCase(theme.slug)}`}>
              <a className="mx-5 py-5 border-b-2 border-white last:border-b-0" onClick={() => setOpen(false)}>
                {theme.title}
              </a>
            </Link>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default ThemeMobileFooter;
