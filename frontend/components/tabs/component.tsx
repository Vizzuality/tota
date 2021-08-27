import React, { FC } from 'react';
import cx from 'classnames';

import type { TabsProps } from './types';

const Tabs: FC<TabsProps> = ({ className, options, selectedValue, onChange }: TabsProps) => {
  return (
    <div role="group" className={cx(className, 'flex gap-5')}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={cx('py-2 border-b-4 text-lg border-transparent', {
            'border-color1': option.value === selectedValue,
          })}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
