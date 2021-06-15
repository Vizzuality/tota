import React, { FC } from 'react';
import cx from 'classnames';

type IconComponentType = React.ComponentType<React.SVGProps<SVGElement>>;

interface IconProps {
  icon: IconComponentType;
  size?: 'md';
  className?: string;
}

const SIZE = {
  md: 'w-5 h-5',
};

const Icon: FC<IconProps> = ({ icon: Component, size = 'md', className }: IconProps) => (
  <Component className={cx({ [SIZE[size]]: size }, 'fill-current', className)} />
);

export default Icon;
