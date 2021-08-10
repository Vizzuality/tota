import React, { FC, useRef, useEffect } from 'react';
import cx from 'classnames';
import type { LegendProps } from './types';

import { createPortal } from 'react-dom';
import { useSelect } from 'downshift';
import { usePopper } from 'react-popper';

import Icon from 'components/icon';

import CloseIcon from 'svgs/ui/close.svg?sprite';
import PlusIcon from 'svgs/ui/plus.svg?sprite';

interface MenuOptionProp {
  label: string;
  value: string | number;
}

interface MenuProps {
  options: MenuOptionProp[];
  onSelect: (selectedItem: MenuOptionProp) => void;
}

const Menu: FC<MenuProps> = ({ options, onSelect }: MenuProps) => {
  const triggerRef = useRef();
  const menuRef = useRef();
  const maxHeight = 300;

  const { isOpen, getToggleButtonProps, getMenuProps, highlightedIndex, closeMenu, getItemProps } = useSelect({
    items: options,
    onSelectedItemChange({ selectedItem }) {
      onSelect(selectedItem);
    },
  });

  const { styles, attributes, update } = usePopper(triggerRef.current, menuRef.current, {
    placement: 'bottom-start',
  });

  const referenceHidden =
    attributes?.popper?.['data-popper-reference-hidden'] || attributes?.popper?.['data-popper-reference-scaped'];
  useEffect(() => {
    if (referenceHidden) {
      closeMenu();
    }
  }, [referenceHidden, closeMenu]);

  useEffect(() => {
    if (update) update();
  }, [isOpen, update]);

  return (
    <li className="relative flex items-center justify-center border border-gray-200 w-8 self-stretch" ref={triggerRef}>
      <div className="overflow-hidden w-4 h-4">
        <button {...getToggleButtonProps()}>
          <Icon className="w-4 h-4 text-gray-400" icon={PlusIcon} />
        </button>

        {createPortal(
          <div
            className={cx({
              'z-50': true,
              // The content of `<Menu />` must always be in the DOM so that Downshift can get the ref
              // to the `<ul />` element through `getMenuProps`
              invisible: !isOpen,
            })}
            ref={menuRef}
            style={styles.popper}
            {...attributes.popper}
          >
            <div
              className={cx({
                'overflow-hidden': true,
                'invisible pointer-events-none': attributes?.popper?.['data-popper-reference-hidden'],
              })}
            >
              <ul
                {...getMenuProps()}
                className="bg-white text-gray-800 py-1 overflow-y-auto overflow-x-hidden"
                style={{
                  maxHeight,
                }}
              >
                {options.map((option, index) => (
                  <li
                    className={cx({
                      'px-4 py-2 cursor-pointer': true,
                      'bg-gray-100 text-gray-800': highlightedIndex === index,
                    })}
                    key={`${option.value}`}
                    {...getItemProps({ item: option, index })}
                  >
                    <span>{option.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>,
          document.body,
        )}
      </div>
    </li>
  );
};

interface TagProps {
  label: string;
  value: string;
  color: string;
  removable?: boolean;
  onRemove?: (selection: string) => void;
}

const Tag: FC<TagProps> = ({ label, value, color, removable, onRemove }: TagProps) => {
  return (
    <li key={`item-${value}`} className={cx('flex items-center p-1', { 'border border-gray-200': removable })}>
      <div className="w-4 h-4 mr-2 inline-block" style={{ backgroundColor: color }}></div>
      {label}
      {removable && (
        <button aria-label="Remove" className="ml-1" type="button" onClick={() => onRemove(value)}>
          <Icon className="w-3 h-3 text-gray-400" icon={CloseIcon} />
        </button>
      )}
    </li>
  );
};

const Legend: FC<LegendProps> = ({
  payload,
  removable = false,
  valueFormatter = (value: string) => value,
  payloadFilter = () => true,
  onChange,
}: LegendProps) => {
  const filteredPayload = (payload || []).filter(payloadFilter);
  const hiddenPayload = filteredPayload.filter((x) => x.payload.hide);
  const visiblePayload = filteredPayload.filter((x) => !x.payload.hide);

  const handleRemove = (val) => {
    onChange(visiblePayload.filter((x) => x.value !== val).map((x) => x.value));
  };
  const handleMenuSelect = (option) => {
    onChange(filteredPayload.filter((x) => !x.payload.hide || x.value === option.value).map((x) => x.value));
  };

  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1 mt-5">
      {visiblePayload.map((entry) => (
        <Tag
          key={entry.value}
          value={entry.value}
          label={valueFormatter(entry.value)}
          color={entry.color}
          removable={removable}
          onRemove={handleRemove}
        />
      ))}
      {hiddenPayload.length > 0 && (
        <Menu options={hiddenPayload.map((h) => ({ value: h.value, label: h.value }))} onSelect={handleMenuSelect} />
      )}
    </ul>
  );
};

export default Legend;
