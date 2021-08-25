import { FC, useCallback, useState } from 'react';
import cx from 'classnames';

import Icon from 'components/icon';
import ARROW_DOWN_SVG from 'svgs/map/arrow.svg?sprite';

import { useId } from '@react-aria/utils';
import SortableList from './sortable/list';

export interface LegendProps {
  className?: string;
  children: React.ReactNode;
  maxHeight: string | number;
  onChangeOrder: (id: string[]) => void;
}

export const Legend: FC<LegendProps> = ({ children, className = '', maxHeight, onChangeOrder }: LegendProps) => {
  const [active, setActive] = useState(true);

  const id = useId();

  const onToggleActive = useCallback(() => {
    setActive(!active);
  }, [active]);

  return (
    <div
      className={cx({
        'flex flex-col items-end': true,
        [className]: !!className,
      })}
    >
      <button
        type="button"
        aria-expanded={active}
        aria-controls={id}
        className="relative flex items-center justify-center p-3 pr-6 text-sm text-blue9 bg-color2 font-heading"
        onClick={onToggleActive}
      >
        <span
          className={cx({
            'transition-width overflow-hidden text-left': true,
            'w-0': active,
            'w-24': !active,
          })}
        >
          Legend
        </span>
        <div
          className={cx({
            'absolute h-full p-3 right-0 bg-blue9 text-white': true,
          })}
        >
          <Icon
            icon={ARROW_DOWN_SVG}
            className={cx({
              'w-4 h-4 transition-transform transform': true,
              'rotate-180': !active,
            })}
          />
        </div>
      </button>

      {active && (
        <div
          className="relative flex flex-col flex-grow overflow-hidden"
          style={{
            maxHeight,
          }}
        >
          <div className="overflow-x-hidden overflow-y-auto">
            <SortableList onChangeOrder={onChangeOrder}>{children}</SortableList>
          </div>
        </div>
      )}
    </div>
  );
};

export default Legend;
