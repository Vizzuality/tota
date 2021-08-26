import { Children, FC } from 'react';
import cx from 'classnames';

export interface ControlsProps {
  className?: string;
  children: React.ReactNode;
  placement?: 'bottom-left' | 'bottom-right';
}

const PLACEMENT = {
  'bottom-left': 'bottom-10 left-2',
  'bottom-right': 'bottom-10 right-2',
};

export const Controls: FC<ControlsProps> = ({ className, placement = 'bottom-right', children }: ControlsProps) => (
  <div
    className={cx({
      absolute: true,
      [PLACEMENT[placement]]: !!placement,
      [className]: !!className,
    })}
  >
    {Children.map(children, (child, i) => (
      <div
        className={cx({
          'mt-2': i !== 0,
        })}
      >
        {child}
      </div>
    ))}
  </div>
);

export default Controls;
