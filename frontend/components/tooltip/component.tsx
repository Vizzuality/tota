import { FC } from 'react';

import Tippy from '@tippyjs/react/headless';

import Arrow from './arrow';
import type { TippyProps } from '@tippyjs/react/headless';
import type { TooltipProps } from './types';

export const Tooltip: FC<TooltipProps & TippyProps> = ({
  children,
  content,
  arrow,
  ...props
}: TooltipProps & TippyProps) => {
  return (
    <Tippy
      {...props}
      render={(attrs) => (
        <div className="relative">
          {content}

          {arrow && <Arrow data-popper-arrow="" {...attrs} />}
        </div>
      )}
    >
      {children}
    </Tippy>
  );
};

export default Tooltip;
