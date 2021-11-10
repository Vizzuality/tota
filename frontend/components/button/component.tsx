import { FC } from 'react';
import Link from 'next/link';
import cx from 'classnames';

import type { ButtonProps, AnchorProps, Overload } from './types';

const THEME = {
  primary: 'text-white bg-green-600 hover:bg-blue-400',
  'primary-alt': 'text-green-600 bg-white hover:bg-gray-300',
  secondary: 'text-white bg-red-100 hover:bg-red-200',
  gray: 'text-white bg-gray-300',
  'dark-gray': 'text-white bg-gray-500',
  'dark-gray-alt': 'text-blue-800 border border-gray-500 bg-white',
  blue: 'text-white bg-blue-800 hover:bg-green-600',
};

const SIZE = {
  s: 'text-base font-bold px-4 py-2',
  base: 'text-lg font-bold px-4 py-4',
  l: 'text-xl font-bold px-4 py-6',
};

// Guard to check if href exists in props
const hasHref = (props: ButtonProps | AnchorProps): props is AnchorProps => 'href' in props;

function buildClassName({ className, disabled, size, theme }) {
  return cx({
    'inline-flex items-center justify-center': true,
    [THEME[theme]]: true,
    [SIZE[size]]: true,
    [className]: !!className,
    'opacity-50 pointer-events-none': disabled,
  });
}

export const LinkAnchor: FC<AnchorProps> = ({
  children,
  theme = 'primary',
  size = 'base',
  className,
  disabled,
  href,
  anchorLinkProps,
  ...restProps
}: AnchorProps) => (
  <Link href={href} {...anchorLinkProps}>
    <a
      className={buildClassName({
        className,
        disabled,
        size,
        theme,
      })}
      {...restProps}
    >
      {children}
    </a>
  </Link>
);

export const Anchor: FC<AnchorProps> = ({
  children,
  theme = 'primary',
  size = 'base',
  className,
  disabled,
  href,
  ...restProps
}: AnchorProps) => {
  // Anchor element doesn't support disabled attribute
  // https://www.w3.org/TR/2014/REC-html5-20141028/disabled-elements.html
  if (disabled) {
    return <span {...restProps}>{children}</span>;
  }
  return (
    <a
      href={href}
      className={buildClassName({
        className,
        disabled,
        size,
        theme,
      })}
      {...restProps}
    >
      {children}
    </a>
  );
};

export const Button: FC<ButtonProps> = ({
  children,
  theme = 'primary',
  size = 'base',
  className,
  disabled,
  ...restProps
}: ButtonProps) => (
  <button
    type="button"
    className={buildClassName({
      className,
      disabled,
      size,
      theme,
    })}
    disabled={disabled}
    {...restProps}
  >
    {children}
  </button>
);

export const LinkButton: Overload = (props: ButtonProps | AnchorProps) => {
  // We consider a link button when href attribute exits
  if (hasHref(props)) {
    if (props.href.startsWith('http')) {
      return <Anchor {...props} />;
    }
    return <LinkAnchor {...props} />;
  }
  return <Button {...props} />;
};

export default LinkButton;
