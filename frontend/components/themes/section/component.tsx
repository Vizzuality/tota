import React, { useState, FC } from 'react';
import { useQuery } from 'react-query';
import dynamic from 'next/dynamic';
import { ThemeSectionType } from 'constants/themes';
import Select from 'components/select';
import Switch from 'components/switch';

interface WidgetProps {
  data: any;
  config: any;
}

export interface ThemeSectionProps {
  section: ThemeSectionType;
  index: number;
}

const ThemeSection: FC<ThemeSectionProps> = ({ section, index }: ThemeSectionProps) => {
  const Loading = () => <div>Loading...</div>;
  const widgetType = section.widget?.type || 'charts/pie';
  const Widget = dynamic<WidgetProps>(() => import(`components/widgets/${widgetType}`), {
    loading: Loading,
  });
  const [state, setState] = useState(section.initialState);
  const { switchSelectedValue, selectSelectedValue } = state || {};
  const handleSwitchChange = (selectedValue: string) => setState({ ...state, switchSelectedValue: selectedValue });
  const handleSelectChange = (selectedValue: string) => setState({ ...state, selectSelectedValue: selectedValue });

  const { data } = useQuery([section.fetchDataKey || `Fetch indicator ${section.title}`, { ...state }], () =>
    section.fetchData(state),
  );
  let widgetData = data;

  if (typeof section.widget?.transformData === 'function') {
    widgetData = section.widget.transformData(data, state);
  }
  let config = section.widget?.config;
  if (typeof section.widget?.config === 'function') {
    config = section.widget.config(data);
  }
  const { selectors, ...widgetConfig } = config;

  return (
    <div className="mb-10 p-5 bg-white flex">
      <div className="w-2/5 pr-10 border-r-2">
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

      <div className="w-3/5">
        {selectors && (
          <div className="flex justify-between mb-5">
            {selectors.switch && (
              <Switch
                options={selectors.switch.options}
                selectedValue={switchSelectedValue}
                onChange={handleSwitchChange}
              />
            )}
            {selectors.select && (
              <Select
                options={selectors.select.options}
                selectedValue={selectSelectedValue}
                onChange={handleSelectChange}
              />
            )}
          </div>
        )}
        {widgetData && widgetConfig && <Widget data={widgetData} config={widgetConfig} />}
      </div>
    </div>
  );
};

export default ThemeSection;
