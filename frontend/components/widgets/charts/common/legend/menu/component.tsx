import React, { FC, useRef, useEffect } from 'react';
import cx from 'classnames';

import { createPortal } from 'react-dom';
import { useSelect } from 'downshift';
import { usePopper } from 'react-popper';

import PlusIcon from 'svgs/ui/plus.svg?sprite';

import Icon from 'components/icon';

import type { MenuProps } from '../types';

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
    <li
      className="relative flex items-center justify-center border border-gray-400 w-9 h-9 self-stretch opacity-40"
      ref={triggerRef}
    >
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
                className="bg-white text-blue-800 py-1 overflow-y-auto overflow-x-hidden"
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

export default Menu;
