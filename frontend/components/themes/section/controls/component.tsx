import React, { FC } from 'react';

import Control from '../control';
import type { ControlsProps } from './types';

const Controls: FC<ControlsProps> = ({ controls, state, className, onControlChange }: ControlsProps) => {
  if (!controls || !controls.length) return null;

  return (
    <div className={className}>
      {controls
        .filter((c) => c.options && c.options.length > 0)
        .map((props) => (
          <Control key={props.name} value={state[props.name]} onControlChange={onControlChange} {...props} />
        ))}
    </div>
  );
};

export default Controls;
