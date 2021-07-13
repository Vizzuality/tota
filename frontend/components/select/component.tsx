import React, { FC } from 'react';

export interface SelectOptionType {
  name: string;
  value: string;
}

export interface SelectProps {
  options: SelectOptionType[];
  className?: string;
  selectedValue: string;
  onChange?: (selectedValue: string) => void;
}

const Button: FC<SelectProps> = ({ className, options, onChange, selectedValue }: SelectProps) => (
  <select className={className} value={selectedValue} onChange={(e) => onChange(e.target.value)}>
    {' '}
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.name}
      </option>
    ))}
  </select>
);

export default Button;
