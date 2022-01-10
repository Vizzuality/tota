import React, { FC, useEffect } from 'react';
import cx from 'classnames';

import Select from 'components/forms/select';
import Tabs from 'components/tabs';
import type { ControlProps } from './types';

import { useComponentId } from 'hooks/misc';

// set of options that should not be changed to after loading new options
const DEFAULT_OPTIONS_TO_EXCLUDE = ['all_years'];

const Control: FC<ControlProps> = ({ type, side, name, value, options, onControlChange, ...rest }: ControlProps) => {
  const componentId = useComponentId();

  useEffect(() => {
    if (options && options.length > 0) {
      const changeableOptions = options.filter((o) => !DEFAULT_OPTIONS_TO_EXCLUDE.includes(o.value as string));
      if (changeableOptions.length > 0 && !options.find((option) => option.value.toString() === value?.toString())) {
        onControlChange(name, changeableOptions[0].value as string);
      }
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
