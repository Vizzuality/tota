import React, { FC } from 'react';
import cx from 'classnames';
import type { TagProps } from '../types';

import Icon from 'components/icon';

import CloseIcon from 'svgs/ui/close.svg?sprite';

const Tag: FC<TagProps> = ({ label, value, color, removable, onRemove }: TagProps) => {
  return (
    <li key={`item-${value}`} className={cx('flex items-center', { 'border border-gray1 p-1.5 h-9': removable })}>
      <div className="w-4 h-4 mr-2 inline-block" style={{ backgroundColor: color }}></div>
      {label}
      {removable && (
        <button aria-label="Remove" className="ml-2" type="button" onClick={() => onRemove(value)}>
          <Icon className="w-3 h-3 text-blue9" icon={CloseIcon} />
        </button>
      )}
    </li>
  );
};

export default Tag;
