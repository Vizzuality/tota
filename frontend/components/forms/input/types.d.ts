import { InputHTMLAttributes } from 'react';

import { IconProps } from 'components/icon';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  theme?: 'dark' | 'light';
  status?: 'none' | 'valid' | 'error' | 'disabled';
  mode?: 'underlined' | 'normal';
  input?: Record<string, unknown>;
  innerRef?: React.Ref<HTMLInputElement>;
  meta?: Record<string, unknown>;
  icon?: IconProps['icon'];
}
