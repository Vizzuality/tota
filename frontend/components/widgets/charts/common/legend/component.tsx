import React, { FC } from 'react';
import type { LegendProps } from './types';

import Menu from './menu';
import Tag from './tag';

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
    <ul className="flex flex-wrap gap-2.5 mt-5">
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
