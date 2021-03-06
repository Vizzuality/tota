import React, { FC, PropsWithChildren } from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/dist/client/router';
import cx from 'classnames';

export interface NavLinkProps extends PropsWithChildren<LinkProps> {
  theme: 'light' | 'dark';
}

const THEMES = {
  light: {
    base: 'text-white hover:border-white',
    active: 'border-white',
  },
  dark: {
    base: 'text-blue-800 hover:border-blue-800',
    active: 'border-blue-800',
  },
};

const NavLink: FC<NavLinkProps> = ({ children, href, theme, ...rest }: NavLinkProps) => {
  const router = useRouter();
  const active = router.pathname.includes(href as string);

  return (
    <Link href={href} {...rest}>
      <a
        className={cx('p-2 font-bold tracking-tight border-b-4', {
          'border-transparent': !active,
          [THEMES[theme].base]: true,
          [THEMES[theme].active]: active,
        })}
      >
        {children}
      </a>
    </Link>
  );
};

export default NavLink;
