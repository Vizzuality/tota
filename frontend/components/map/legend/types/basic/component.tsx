import React, { FC } from 'react';
import cx from 'classnames';
import Image from 'next/image';

export interface LegendTypeBasicProps {
  className?: string;
  items: Array<{
    value: string;
    color?: string;
    icon?: string;
  }>;
}

export const LegendTypeBasic: FC<LegendTypeBasicProps> = ({ className = '', items }: LegendTypeBasicProps) => (
  <div
    className={cx({
      [className]: !!className,
    })}
  >
    <ul className="grid grid-cols-2 w-full gap-2">
      {items.map(({ value, color, icon }) => (
        <li key={`${value}`} className="flex text-xs text-blue-800 items-center">
          {color && (
            <div
              className="flex-shrink-0 w-3 h-3"
              style={{
                backgroundColor: color,
              }}
            />
          )}
          {icon && <Image width={22} height={22} src={icon} />}
          <div className="ml-2">{value}</div>
        </li>
      ))}
    </ul>
  </div>
);

export default LegendTypeBasic;
