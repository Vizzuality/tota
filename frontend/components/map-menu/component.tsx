import { FC, useState } from 'react';
import cx from 'classnames';
import uniq from 'lodash/uniq';

import ARROW_DOWN_SVG from 'svgs/map/arrow.svg?sprite';

import type { SelectOptionProps } from 'components/forms/select/types';

import { useSelectedRegion } from 'hooks/regions';
import { useMap } from 'hooks/map';
import LAYERS from 'components/main-map/layers';

import Icon from 'components/icon';
import Select from 'components/forms/select';
import Switch from 'components/switch';

export interface MapMenuProps {
  children?: React.ReactNode;
}

const isServer = typeof window === 'undefined';

const MapMenu: FC<MapMenuProps> = ({ children }: MapMenuProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { regions, selectRegion, selectedRegion } = useSelectedRegion();
  const { activeLayers, changeActiveLayers } = useMap();
  const layers = LAYERS.filter((x) => x.id !== 'tourism_regions');
  const toggleActiveLayer = (layerId: string, checked: boolean) =>
    changeActiveLayers(uniq([...activeLayers, layerId]).filter((l) => l !== layerId || checked));

  return (
    <aside
      className={cx(
        'fixed w-map-sidebar h-screen-minus-header mt-20 top-0 left-0 z-10 transform translate-x-0',
        'transition-transform duration-200 ease-in-out',
        {
          'translate-x-map-sidebar': collapsed,
        },
      )}
    >
      <section className="bg-gray-100 w-full h-full">
        <div suppressHydrationWarning={true}>
          {!isServer && (
            <Select
              id="map-select-region"
              theme="dark"
              size="base"
              maxHeight={400}
              options={regions.map((r) => ({ label: r.name, value: r.id })) as unknown as SelectOptionProps[]}
              initialSelected={selectedRegion ? (selectedRegion.id as unknown as string) : ''}
              onChange={(value: string) => selectRegion({ id: parseInt(value, 10) })}
            />
          )}
        </div>
        <div className="h-full relative border-r border-gray1">
          <button
            className="cursor-pointer absolute flex items-center justify-center -right-10 top-0 w-10 h-10 bg-gray2 border-r border-b border-t border-gray1"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Icon
              icon={ARROW_DOWN_SVG}
              className={cx({
                'w-4 h-4 transition-transform transform': true,
                '-rotate-90': collapsed,
                'rotate-90': !collapsed,
              })}
            />
          </button>

          {selectedRegion && (
            <div className="flex flex-col p-3 gap-3">
              {/** @todo: add useIndicators(<SelectedRegion>) */}
              {layers.map((layer) => (
                <div
                  key={layer.id}
                  className="flex gap-2 leading-5 bg-white border border-blue9 p-3 text-blue9 font-bold"
                >
                  <Switch
                    checked={activeLayers.includes(layer.id)}
                    onChange={(checked) => toggleActiveLayer(layer.id, checked)}
                  />
                  {layer.name}
                </div>
              ))}
            </div>
          )}
          {children}
        </div>
      </section>
    </aside>
  );
};

export default MapMenu;
