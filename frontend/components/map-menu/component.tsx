import { FC, useState } from 'react';
import cx from 'classnames';
import uniq from 'lodash/uniq';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import groupBy from 'lodash/groupBy';

import ARROW_DOWN_SVG from 'svgs/map/arrow.svg?sprite';

import type { SelectOptionProps } from 'components/forms/select/types';

import { useRegions } from 'hooks/regions';
import { useLayers, CATEGORY } from 'hooks/layers';
import { useMap } from 'hooks/map';

import Icon from 'components/icon';
import Select from 'components/forms/select';
import Switch from 'components/switch';
import Collapsible from 'components/collapsible';

export interface MapMenuProps {
  children?: React.ReactNode;
}

const isServer = typeof window === 'undefined';

const MapMenu: FC<MapMenuProps> = ({ children }: MapMenuProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { data: regions } = useRegions();
  const { activeLayers, changeActiveLayers, selectedRegion, selectRegion } = useMap();
  const layers = useLayers(selectedRegion?.slug);
  const layersByCategory = groupBy(
    sortBy(layers, (x) => Object.values(CATEGORY).indexOf(x.category)),
    'category',
  );
  const toggleActiveLayer = (layerId: string, checked: boolean) =>
    changeActiveLayers(uniq([...activeLayers, layerId]).filter((l) => l !== layerId || checked));

  return (
    <aside
      className={cx('w-map-sidebar h-full z-10', 'transition-all duration-200 ease-in-out', {
        '-ml-map-sidebar': collapsed,
      })}
    >
      <section className="bg-gray-50 w-full h-full flex flex-col">
        <div suppressHydrationWarning={true}>
          {!isServer && (
            <Select
              id="map-select-region"
              theme="dark"
              size="lg"
              maxHeight={400}
              options={regions.map((r) => ({ label: r.name, value: r.slug })) as unknown as SelectOptionProps[]}
              selected={selectedRegion ? selectedRegion.slug : ''}
              onChange={(value: string) => selectRegion(value)}
            />
          )}
        </div>
        <div className="relative">
          <button
            className="cursor-pointer absolute flex items-center justify-center -right-10 top-0 w-10 h-10 bg-gray-50 border-r border-b border-t border-gray-400"
            style={{ transform: 'translate(-1px, -1px)' }}
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
        </div>
        <div className="flex-1 border-r border-gray-400 overflow-y-auto">
          {selectedRegion && (
            <div className="flex flex-col p-3 gap-3">
              {/** @todo: add useIndicators(<SelectedRegion>) */}
              {map(layersByCategory, (layers, category) => (
                <Collapsible key={category} title={category}>
                  <div className="flex flex-col gap-2">
                    {layers.map((layer) => (
                      <div
                        key={layer.id}
                        className="flex gap-2 leading-5 bg-white border border-blue-800 p-3 text-blue-800 font-bold"
                      >
                        <Switch
                          checked={activeLayers.includes(layer.id)}
                          onChange={(checked) => toggleActiveLayer(layer.id, checked)}
                        />
                        {layer.name}
                      </div>
                    ))}
                  </div>
                </Collapsible>
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
