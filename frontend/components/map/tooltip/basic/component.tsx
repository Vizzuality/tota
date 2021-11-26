import React, { FC } from 'react';
import startCase from 'lodash/startCase';
import snakeCase from 'lodash/snakeCase';
import type { TooltipProps } from './types';

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
  }

  return value;
}

function formatKey(key: string) {
  return startCase(snakeCase(key)).replace('Nr Of', 'Nr. of');
}

const Tooltip: FC<TooltipProps> = ({ properties, title }: TooltipProps) => (
  <div>
    <div className="bg-blue-800 py-2 px-4 text-white flex flex-row justify-between">{title}</div>
    <div className="px-4 py-2 text-blue-800 overflow-y-auto" style={{ maxHeight: 400 }}>
      {Object.keys(properties).map((key) => (
        <div key={key} className="flex justify-between mt-1">
          <div>{formatKey(key)}</div>
          <div className="font-bold text-right ml-10" style={{ maxWidth: 500 }}>
            {formatValue(properties[key])}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Tooltip;
