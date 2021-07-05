import React, { FC } from 'react';
import cx from 'classnames';

export interface SwitchOptionType {
  name: string;
  value: string;
}

export interface SwitchProps {
  options: SwitchOptionType[];
  selectedValue: string;
  onChange?: (selectedValue: string) => void;
}

const Switch: FC<SwitchProps> = ({ options, selectedValue, onChange }: SwitchProps) => {
  return (
    <div role="group" className="flex gap-5">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={cx('p-2 border-b-4 border-transparent', { 'border-color1': option.value === selectedValue })}
          onClick={() => onChange(option.value)}
        >
          {option.name}
        </button>
      ))}
    </div>
  );
};

export default Switch;
