import React, { FC } from 'react';

export interface SelectOptionType {
  name: string;
  value: string;
}

export interface SelectProps {
  options: SelectOptionType[];
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
          {option.name}
        </option>
      ))}
    </select>
  </label>
);

export default Button;
