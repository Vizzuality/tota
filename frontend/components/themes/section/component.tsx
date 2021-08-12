import React, { useState, useMemo, FC } from 'react';
import { useQuery } from 'react-query';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import type { ThemeSectionType } from 'types';
import Select from 'components/forms/select';
import Switch from 'components/switch';
import Loading from 'components/loading';
import type { WidgetProps } from 'components/widgets/types';

import { useRegions } from 'hooks/regions';

export interface ThemeSectionProps {
  section: ThemeSectionType;
  index: number;
}

const ThemeSection: FC<ThemeSectionProps> = ({ section, index }: ThemeSectionProps) => {
  const widgetType = section.widget?.type || 'charts/pie';
  const LoadingWidget = () => (
    <div style={{ height: 400 }} className="flex items-center justify-center">
      <Loading iconClassName="w-10 h-10" visible />
    </div>
  );
  const Widget = dynamic<WidgetProps>(() => import(`components/widgets/${widgetType}`), {
    loading: LoadingWidget,
  });
  const { regions } = useRegions();
  const router = useRouter();
  const { region } = router.query;
  const [state, setState] = useState(section.initialState);
  const { switchSelectedValue, selectSelectedValue, select2SelectedValue } = state || {};
  const handleSwitchChange = (selectedValue: string) => setState({ ...state, switchSelectedValue: selectedValue });
  const handleSelectChange = (selectedValue: string) => setState({ ...state, selectSelectedValue: selectedValue });
  const handleSelect2Change = (selectedValue: string) => setState({ ...state, select2SelectedValue: selectedValue });
  const wholeState = useMemo(
    () => ({
      ...state,
      selectedRegion: regions.find((r) => r.slug === region),
    }),
    [state, region, regions],
  );

  const {
    data: rawData,
    isFetched,
    isFetching,
    isLoading,
  } = useQuery([`Fetch indicator ${section.title}`, wholeState], () => section.fetchData(wholeState));
  const { data, controls, ...widgetConfig } = useMemo(
    () => section.widget.fetchProps(rawData, wholeState),
    [rawData, wholeState],
  );

  return (
    <div className="mb-10 p-5 bg-white flex">
      <div className="w-2/6 pr-5 border-r-2">
        <div className="relative">
          <div
            className="absolute rounded-full bg-color2 text-blue9 text-2xl h-50 w-50 flex items-center justify-center"
            style={{ width: 50, height: 50 }}
          >
            {index}
          </div>
          <div className="flex flex-col justify-center" style={{ marginLeft: 70, minHeight: 50 }}>
            <h2 className="text-lg font-bold">{section.title}</h2>
            <div>{section.subTitle}</div>
          </div>
        </div>

        <p className="mt-10 leading-8">{section.description}</p>
      </div>

      <div className="w-4/6 pl-5 flex flex-col">
        {controls && (
          <div className="mb-3">
            {controls.switch && (
              <div className="float-left">
                <Switch selectedValue={switchSelectedValue} onChange={handleSwitchChange} {...controls.switch} />
              </div>
            )}
            {controls.select2 && controls.select2.options.length > 0 && (
              <div className="float-right">
                <Select
                  id={`select-section-${index}`}
                  theme="light"
                  size="base"
                  selected={select2SelectedValue}
                  onChange={handleSelect2Change}
                  {...controls.select2}
                />
              </div>
            )}
            {controls.select && controls.select.options.length > 0 && (
              <div className="float-right">
                <Select
                  id={`select-section-${index}`}
                  theme="light"
                  size="base"
                  selected={selectSelectedValue}
                  initialSelected={controls.select.options[0]?.value}
                  onChange={handleSelectChange}
                  {...controls.select}
                />
              </div>
            )}
          </div>
        )}
        <div className="flex justify-center items-center" style={{ minHeight: 400 }}>
          {(isLoading || isFetching) && <LoadingWidget />}
          {isFetched && data && data.length > 0 && <Widget data={data} {...widgetConfig} />}
          {isFetched && data && data.length === 0 && <span>No data available</span>}
        </div>
      </div>
    </div>
  );
};

export default ThemeSection;
