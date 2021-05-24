import React, { FC, ReactNode } from 'react';
import cx from 'classnames';

export interface DrawerProps {
  children?: ReactNode;
  placement: 'bottom';
  isOpen: boolean;
}

const PLACEMENT = {
  bottom: {
    base: 'w-screen bottom-0 left-0',
    open: '-translate-y-0',
    close: 'translate-y-full',
  },
};

const Drawer: FC<DrawerProps> = ({ children, placement, isOpen }: DrawerProps) => {
  return (
    <div
      aria-hidden={!isOpen}
      className={cx('fixed z-10 transform lg:transform-none duration-300 ease-in-out', {
        [PLACEMENT[placement]['base']]: !!placement,
        [PLACEMENT[placement][isOpen ? 'open' : 'close']]: !!placement,
      })}
    >
      {children}
    </div>
  );
};

export default Drawer;
