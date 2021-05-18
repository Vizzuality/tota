import React, { FC, ReactNode } from 'react';
import cx from 'classnames';

export interface HamburgerProps {
  isOpen: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children?: ReactNode;
}

const Hamburger: FC<HamburgerProps> = ({ className, isOpen, onClick }: HamburgerProps) => {
  const barCSS = 'block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out';

  return (
    <button className={cx('text-white w-10 h-10 relative focus:outline-none', className)} onClick={onClick}>
      <div className="block w-5 absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2">
        <span aria-hidden="true" className={cx(barCSS, { 'rotate-45': isOpen, '-translate-y-1.5': !isOpen })}></span>
        <span aria-hidden="true" className={cx(barCSS, { 'opacity-0': isOpen })}></span>
        <span aria-hidden="true" className={cx(barCSS, { '-rotate-45': isOpen, 'translate-y-1.5': !isOpen })}></span>
      </div>
    </button>
  );
};

export default Hamburger;
