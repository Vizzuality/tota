import { ReactElement } from 'react';

import type { TippyProps } from '@tippyjs/react/headless';

export interface TooltipProps extends TippyProps {
  children: ReactElement;
}
