import { FC, useState } from 'react';
import classNames from 'classnames';

import type { SelectOptionProps } from 'components/forms/select/types';

import { useSelectedRegion } from 'hooks/regions';

import Select from 'components/forms/select';

export interface MapMenuProps {
  children?: React.ReactNode;
}

const isServer = typeof window === 'undefined';

const MapMenu: FC<MapMenuProps> = ({ children }: MapMenuProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { regions, selectRegion, selectedRegion } = useSelectedRegion();

  return (
    <aside
      className={classNames(
        'fixed w-map-sidebar h-screen-minus-header mt-20 top-0 left-0 z-10 transform translate-x-0',
        'transition-transform duration-200 ease-in-out',
        {
          'translate-x-map-sidebar': collapsed,
        },
      )}
    >
      <button
        className="cursor-pointer absolute right-0 top-0 w-8 h-10 transform translate-x-8 translate-y-12 bg-gray-400"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? '>' : '<'}
      </button>
      <section className="bg-gray-100 w-full h-full">
        <div suppressHydrationWarning={true}>
          {!isServer && (
            <Select
              id="map-select-region"
              theme="dark"
              size="base"
              options={regions.map((r) => ({ label: r.title, value: r.id })) as unknown as SelectOptionProps[]}
              initialSelected={selectedRegion ? (selectedRegion as unknown as string) : ''}
              onChange={(value: string) => selectRegion({ id: parseInt(value, 10) })}
            />
          )}
        </div>
        {selectedRegion && (
          <div className="flex flex-col mx-3 mt-4 gap-2">
            {/** @todo: add useIndicators(<SelectedRegion>) */}
            <div className="flex-1 bg-gray-300 p-5 text-gray-700 rounded">Indicator #1</div>
            <div className="flex-1 bg-gray-300 p-5 text-gray-700 rounded">Indicator #2</div>
            <div className="flex-1 bg-gray-300 p-5 text-gray-700 rounded">Indicator #3</div>
          </div>
        )}
        {children}
      </section>
    </aside>
  );
};

export default MapMenu;
