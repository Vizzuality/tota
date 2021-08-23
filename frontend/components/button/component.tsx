import { FC } from 'react';
import Link from 'next/link';
import cx from 'classnames';

import type { ButtonProps, AnchorProps, Overload } from './types';

const THEME = {
  /* primary: 'text-blue9 bg-white border border-gray3', */
  primary: 'text-white bg-blue2',
  'primary-alt': 'text-blue2 bg-white',
  secondary: 'text-white bg-red1',
  gray: 'text-white bg-gray3',
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
/*
 * export const THEME = {
 *   primary:
 *     'text-black bg-blue-500 hover:bg-blue-400 active:bg-blue-300 border border-blue-500 hover:border-blue-400 active:border-blue-300',
 *   'primary-alt':
 *     'text-blue-500 bg-transparent hover:bg-transparent active:bg-transparent border border-blue-500 hover:border-blue-400 active:border-blue-300',
 *
 *   secondary:
 *     'text-white bg-gray-500 hover:bg-gray-400 active:bg-gray-300 border border-gray-500 hover:border-gray-400 active:border-gray-300',
 *   'secondary-alt':
 *     'text-gray-300 bg-transparent hover:bg-transparent active:bg-transparent border border-gray-400 hover:border-gray-300 active:border-gray-200',
 *
 *   white:
 *     'text-gray-700 bg-white hover:text-white hover:bg-transparent active:bg-transparent border border-gray-400 hover:border-gray-300 active:border-gray-200',
 *
 *   danger:
 *     'text-red-700 bg-transparent hover:text-white hover:bg-red-700 active:bg-red-600 border border-red-700 hover:border-red-600 active:border-red-500',
 * }; */

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
