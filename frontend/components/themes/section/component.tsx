import React, { useState, useMemo, FC } from 'react';
import { useQuery } from 'react-query';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import type { ThemeSectionType } from 'types';
import Select from 'components/forms/select';
import Switch from 'components/switch';
import type { WidgetProps } from 'components/widgets/types';

import { useRegions } from 'hooks/regions';

export interface ThemeSectionProps {
  section: ThemeSectionType;
  index: number;
}

const ThemeSection: FC<ThemeSectionProps> = ({ section, index }: ThemeSectionProps) => {
  const Loading = () => (
    <div
      style={{
        height: 400,
      }}
    >
      {' '}
      Loading...
    </div>
  );
  const widgetType = section.widget?.type || 'charts/pie';
  const Widget = dynamic<WidgetProps>(() => import(`components/widgets/${widgetType}`), {
    loading: Loading,
  });
  const { regions } = useRegions();
  const router = useRouter();
  const { region } = router.query;
  const [state, setState] = useState(section.initialState);
  const { switchSelectedValue, selectSelectedValue } = state || {};
  const handleSwitchChange = (selectedValue: string) => setState({ ...state, switchSelectedValue: selectedValue });
  const handleSelectChange = (selectedValue: string) => setState({ ...state, selectSelectedValue: selectedValue });
  const totalState = useMemo(
    () => ({
      ...state,
      selectedRegion: regions.find((r) => r.slug === region),
    }),
    [state, region, regions],
  );

  const { data: rawData, isFetched } = useQuery([`Fetch indicator ${section.title}`, totalState], () =>
    section.fetchData(totalState),
  );
  const { data, controls, ...widgetConfig } = useMemo(
    () => section.widget.fetchProps(rawData, totalState),
    [rawData, totalState],
  );

  return (
    <div className="mb-10 p-5 bg-white flex">
      <div className="w-2/5 pr-5 border-r-2">
        <div className="relative">
          <div
            className="absolute rounded-full bg-gray-300 text-gray-700 text-2xl h-50 w-50 flex items-center justify-center"
            style={{ width: 50, height: 50 }}
          >
            {index}
          </div>
          <div className="" style={{ marginLeft: 70 }}>
            <h2 className="text-3xl">{section.title}</h2>
            <div>{section.subTitle}</div>
          </div>
        </div>

        <p className="mt-10 leading-8">{section.description}</p>
      </div>

      <div className="w-3/5 pl-5 flex flex-col">
        {controls && (
          <div className="flex mb-5">
            {controls.switch && (
              <Switch selectedValue={switchSelectedValue} onChange={handleSwitchChange} {...controls.switch} />
            )}
            {controls.select && (
              <div className="ml-auto">
                <Select
                  id={`select-section-${index}`}
                  theme="light"
                  size="base"
                  selected={selectSelectedValue}
                  onChange={handleSelectChange}
                  {...controls.select}
                />
              </div>
            )}
          </div>
        )}
        {isFetched && data && widgetConfig && <Widget data={data} {...widgetConfig} />}
      </div>
    </div>
  );
};

export default ThemeSection;
