import { FC } from 'react';
import cx from 'classnames';
import Icon from 'components/icon';
import type { InputProps } from './types';

import useStatus from '../utils';
import { THEME } from './constants';

export const Input: FC<InputProps> = ({
  theme = 'light',
  mode = 'normal',
  disabled = false,
  type = 'text',
  input,
  meta = {},
  icon,
  className,
  innerRef,
  ...props
}: InputProps) => {
  const st = useStatus({ meta, disabled });

  return (
    <div className="relative">
      {icon && (
        <Icon
          icon={icon}
          className={cx({
            'absolute w-4 h-4 transform -translate-y-1/2 top-1/2 left-3': true,
            [THEME[theme].icon]: true,
          })}
        />
      )}

      <input
        {...input}
        {...props}
        ref={innerRef}
        type={type}
        disabled={disabled}
        className={cx({
          [THEME[theme].base]: true,
          [THEME[theme].status[st]]: true,
          [THEME[theme].mode[mode]]: true,
          'pl-10': icon,
          [className]: !!className,
        })}
      />
    </div>
  );
};

export default Input;
