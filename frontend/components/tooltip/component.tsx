import { FC } from 'react';

import Tippy from '@tippyjs/react/headless';

import Arrow from './arrow';
import type { TooltipProps } from './types';

export const Tooltip: FC<TooltipProps> = ({ children, content, arrow, maxWidth, ...props }: TooltipProps) => {
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
