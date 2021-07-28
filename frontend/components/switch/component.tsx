import React, { FC } from 'react';
import cx from 'classnames';

import { OptionType } from 'types';

export interface SwitchProps {
  options: OptionType[];
  selectedValue: string;
  className?: string;
  onChange?: (selectedValue: string) => void;
}

const Switch: FC<SwitchProps> = ({ className, options, selectedValue, onChange }: SwitchProps) => {
  return (
    <div role="group" className={cx(className, 'flex gap-5')}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={cx('py-2 border-b-4 border-transparent', { 'border-color1': option.value === selectedValue })}
          onClick={() => onChange(option.value)}
        >
          {option.name}
        </button>
      ))}
    </div>
  );
};

export default Switch;
