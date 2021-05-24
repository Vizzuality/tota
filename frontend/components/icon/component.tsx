import React, { FC } from 'react';
import cx from 'classnames';

type IconComponentType = React.ComponentType<React.SVGProps<SVGElement>>;

interface IconProps {
  icon: IconComponentType;
  className?: string;
  size?: 'md';
}

const SIZE = {
  md: 'w-5 h-5',
};

const Icon: FC<IconProps> = ({ icon: Component, size = 'md', className }: IconProps) => (
  <Component className={cx(className, { [SIZE[size]]: size }, 'fill-current')} />
);

export default Icon;
