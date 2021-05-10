import React, { FC, ReactNode } from 'react';
import cx from 'classnames';

interface IconProps {
  icon: ReactNode;
  size?: 'md';
}

const SIZE = {
  md: 'w-5 h-5',
};

const Icon: FC<IconProps> = ({ icon: IconComponent, size = 'md' }: IconProps) => (
  <IconComponent className={cx({ [SIZE[size]]: size }, 'fill-current')} />
);

export default Icon;
