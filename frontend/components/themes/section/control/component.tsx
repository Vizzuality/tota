import React, { FC, useEffect } from 'react';
import cx from 'classnames';

import Select from 'components/forms/select';
import Tabs from 'components/tabs';
import type { ControlProps } from './types';

import { useComponentId } from 'hooks/misc';

const Control: FC<ControlProps> = ({ type, side, name, value, options, onControlChange, ...rest }: ControlProps) => {
  const componentId = useComponentId();

  useEffect(() => {
    if (options && options.length > 0 && !options.some((option) => option.value.toString() === value?.toString())) {
      onControlChange(name, options[0].value);
    }
  }, [options, value]);

  return (
    <div className={cx({ 'float-left': side === 'left', 'float-right': side === 'right' })} key={name}>
      {type === 'tabs' && (
        <Tabs
          selectedValue={value}
          onChange={(selectedValue) => onControlChange(name, selectedValue)}
          options={options}
          {...rest}
        />
      )}
      {type === 'select' && (
        <Select
          id={`select-section-${componentId}`}
          theme="light"
          size="s"
          selected={value}
          initialSelected={value || options[0].value}
          onChange={(selectedValue) => onControlChange(name, selectedValue as string)}
          options={options}
          {...rest}
        />
      )}
    </div>
  );
};

export default Control;
