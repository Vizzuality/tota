import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

const Button: FC<ButtonProps> = ({ children = Button, ...restProps }: ButtonProps) => (
  <button type="button" {...restProps}>
    {children}
  </button>
);

export default Button;
