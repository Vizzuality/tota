import React, { FC } from 'react';
import cx from 'classnames';

import type { SwitchProps } from './types';

const Switch: FC<SwitchProps> = ({ className, checked, onChange }: SwitchProps) => {
  return (
    <label className={cx(className, 'relative cursor-pointer')}>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange && onChange(e.target.checked)}
      />
      <div
        className={cx('w-9 h-5 rounded-full shadow-inner border-2 border-blue9', {
          'bg-white': !checked,
          'bg-blue9': checked,
        })}
      ></div>
      <div
        className={cx('dot w-2.5 h-2.5 absolute bg-white rounded-full shadow transition duration-300', {
          'bg-blue9': !checked,
          'transform translate-x-4 bg-white': checked,
        })}
        style={{ top: 5, left: 5 }}
      ></div>
    </label>
  );
};

export default Switch;
