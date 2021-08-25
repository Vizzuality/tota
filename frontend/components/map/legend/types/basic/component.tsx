import { FC } from 'react';
import cx from 'classnames';

export interface LegendTypeBasicProps {
  className?: string;
  items: Array<{
    value: string;
    color: string;
  }>;
}

export const LegendTypeBasic: FC<LegendTypeBasicProps> = ({ className = '', items }: LegendTypeBasicProps) => (
  <div
    className={cx({
      [className]: !!className,
    })}
  >
    <ul className="grid grid-cols-2 w-full gap-2">
      {items.map(({ value, color }) => (
        <li key={`${value}`} className="flex text-xs text-blue9">
          <div
            className="flex-shrink-0 w-3 h-3 mr-2"
            style={{
              backgroundColor: color,
            }}
          />
          <div>{value}</div>
        </li>
      ))}
    </ul>
  </div>
);

export default LegendTypeBasic;
