import React, { FC } from 'react';
import cx from 'classnames';
import type { LegendProps } from './types';

import Icon from 'components/icon';

import CloseIcon from 'svgs/ui/close.svg?sprite';

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
}: LegendProps) => {
  const filteredPayload = (payload || []).filter(payloadFilter);

  const handleRemove = (val) => {
    console.log(val);
  };

  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1 mt-5">
      {filteredPayload.map((entry) => (
        <Tag
          key={entry.value}
          value={entry.value}
          label={valueFormatter(entry.value)}
          color={entry.color}
          removable={removable}
          onRemove={handleRemove}
        />
      ))}
    </ul>
  );
};

export default Legend;
