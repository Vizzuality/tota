import React, { FC } from 'react';
import type { TooltipProps } from './types';
import InfoButton from 'components/info-button';

function formatValue(value: any) {
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  if (value === '' || value === 'null' || value === null || value === undefined) {
    return 'n/a';
  }

  if (typeof value === 'string') {
    if ((value as string).startsWith('http')) {
      return (
        <a className="text-blue-500 underline" href={value} rel="noopener noreferrer" target="_blank">
          {value}
        </a>
      );
    }

    if ((value as string).trim() === '') {
      return 'n/a';
    }
  }

  if (typeof value === 'object') {
    if (value.type === 'link') {
      return (
        <a className="text-blue-500 underline" href={value.link} rel="noopener noreferrer" target="_blank">
          {value.text}
        </a>
      );
    }
    if (value.value) {
      return value.value;
    }
  }

  return value;
}

function displayProperty(key, value) {
  return (
    <div key={key} className="flex justify-between mt-1">
      <div className="flex gap-2">
        {key}
        {value && value.info && <InfoButton>{value.info}</InfoButton>}
      </div>
      <div className="font-bold text-right ml-10" style={{ maxWidth: 500 }}>
        {formatValue(value)}
      </div>
    </div>
  );
}

const Tooltip: FC<TooltipProps> = ({ properties, title }: TooltipProps) => (
  <div>
    <div className="bg-blue-800 py-2 px-4 text-white flex flex-row justify-between">{title}</div>
    <div className="px-4 py-2 text-blue-800 overflow-y-auto" style={{ maxHeight: 400 }}>
      {Object.keys(properties).map((key) => displayProperty(key, properties[key]))}
    </div>
  </div>
);

export default Tooltip;
