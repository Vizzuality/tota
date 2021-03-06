import { FC, useCallback, useMemo } from 'react';
import cx from 'classnames';

import ARROW_DOWN_SVG from 'svgs/ui/arrow-down-filled.svg';
import Icon from 'components/icon';

import THEME from 'components/forms/select/constants/theme';

import { SelectToggleProps } from 'components/forms/select/types';

export const SelectToggle: FC<SelectToggleProps> = ({
  options,
  theme,
  size,
  prefix,
  disabled,
  multiple,
  opened,
  selectedItems,
  placeholder,
  getToggleButtonProps,
  getDropdownProps,
}: SelectToggleProps) => {
  const getEnabledOptions = useMemo(() => {
    const opts = options.filter((o) => !o.disabled && o.enabled);
    return opts;
  }, [options]);

  const labelDefaultFormatter: () => string = useCallback(() => {
    if (!selectedItems.length) return placeholder;
    if (selectedItems.length === 1) return selectedItems[0].label;
    if (selectedItems.length === getEnabledOptions.length) return 'All items selected';
    return `${selectedItems.length} items selected`;
  }, [selectedItems, placeholder, getEnabledOptions]);

  return (
    <button
      type="button"
      aria-label="Select..."
      disabled={disabled}
      className={cx({
        'relative w-full flex items-center tracking-wide': true,
        [THEME.sizes[size]]: true,
      })}
      {...(!multiple && getToggleButtonProps())}
      {...(multiple && getToggleButtonProps(getDropdownProps({ preventKeyAction: opened })))}
    >
      {prefix && (
        <span
          className={cx({
            'mr-2 font-heading': true,
            [THEME[theme].prefix.base]: true,
          })}
        >
          {prefix}
        </span>
      )}

      <span
        className={cx({
          'leading-none': true,
          [THEME[theme].prefix.base]: selectedItems.length || placeholder,
        })}
      >
        {labelDefaultFormatter()}
      </span>

      <Icon
        className={cx({
          'ml-2 w-4 h-4': true,
          [THEME[theme].icon.closed]: !opened,
          [THEME[theme].icon.open]: opened,
          [THEME[theme].icon.disabled]: disabled,
        })}
        icon={ARROW_DOWN_SVG}
      />
    </button>
  );
};

export default SelectToggle;
