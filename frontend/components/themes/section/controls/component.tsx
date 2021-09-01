import React, { FC } from 'react';
import cx from 'classnames';

import type { TabsProps } from 'components/tabs/types';
import type { SelectProps } from 'components/forms/select/types';

import Select from 'components/forms/select';
import Tabs from 'components/tabs';

import { useComponentId } from 'hooks/misc';

type TabsSelectType = SelectProps & TabsProps;

export interface ControlType extends TabsSelectType {
  type: 'tabs' | 'select';
  side: 'left' | 'right';
  name: string;
}

export interface ControlsProps {
  state: any;
  onControlChange: (name: string, selectedValue: string) => void;
  className?: string;
  controls: ControlType[];
}

const Controls: FC<ControlsProps> = ({ controls, state, className, onControlChange }: ControlsProps) => {
  if (!controls || !controls.length) return null;

  const componentId = useComponentId();

  return (
    <div className={className}>
      {controls
        .filter((c) => c.options && c.options.length > 0)
        .map(({ type, side, name, options, ...rest }) => (
          <div className={cx({ 'float-left': side === 'left', 'float-right': side === 'right' })} key={name}>
            {type === 'tabs' && (
              <Tabs
                selectedValue={state[name]}
                onChange={(selectedValue) => onControlChange(name, selectedValue)}
                options={options}
                {...rest}
              />
            )}
            {type === 'select' && (
              <Select
                id={`select-section-${componentId}`}
                theme="light"
                size="base"
                selected={state[name]}
                initialSelected={state[name] || options[0].value}
                onChange={(selectedValue) => onControlChange(name, selectedValue as string)}
                options={options}
                {...rest}
              />
            )}
          </div>
        ))}
    </div>
  );
};

export default Controls;
