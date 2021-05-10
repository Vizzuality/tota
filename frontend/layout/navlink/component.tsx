import React, { PropsWithChildren } from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/dist/client/router';
import cx from 'classnames';

type NavLinkProps = PropsWithChildren<LinkProps>;

const NavLink: FC<NavLinkProps> = ({ children, href, ...rest }: NavLinkProps) => {
  const router = useRouter();
  const active = router.pathname === href;

  return (
    <Link href={href} {...rest}>
      <a
        className={cx('p-2 text-white font-bold tracking-tight border-b-4 border-transparent hover:border-white', {
          'border-white': active,
        })}
      >
        {children}
      </a>
    </Link>
  );
};

export default NavLink;
