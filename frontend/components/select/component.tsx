import React, { FC } from 'react';

import { OptionType } from 'types';

export interface SelectProps {
  options: OptionType[];
  className?: string;
  selectedValue: string;
  label?: string;
  onChange?: (selectedValue: string) => void;
}

const Button: FC<SelectProps> = ({ className, label, options, onChange, selectedValue }: SelectProps) => (
  <label className={className}>
    {label}
    <select value={selectedValue} onChange={(e) => onChange(e.target.value)}>
      {' '}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);

export default Button;
