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
import { useIndicatorValues } from 'hooks/indicators';

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
  const [state, setState] = useState(section.initialState || {});
  const handleControlChange = (name: string, selectedValue: string) => setState({ ...state, [name]: selectedValue });
  const wholeState = useMemo(
    () => ({
      ...state,
      selectedRegion: regions.find((r) => r.slug === region),
    }),
    [state, region, regions],
  );

  const { data: rawData, isFetched, isFetching, isLoading } = useIndicatorValues(section.fetchParams(wholeState));

  const { data, controls, controls1, ...widgetConfig } = useMemo(
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
        {controls?.length > 0 && (
          <div className="mb-3">
            {controls
              .filter((c) => c.options && c.options.length > 0)
              .map(({ type, side, name, options, ...rest }) => (
                <div className={`float-${side}`} key={`${index} - ${name}`}>
                  {type === 'switch' && (
                    <Switch
                      selectedValue={state[name]}
                      onChange={(selectedValue) => handleControlChange(name, selectedValue)}
                      options={options}
                      {...rest}
                    />
                  )}
                  {type === 'select' && (
                    <Select
                      id={`select-section-${index}-${name}`}
                      theme="light"
                      size="base"
                      selected={state[name]}
                      initialSelected={state[name] || options[0].value}
                      onChange={(selectedValue) => handleControlChange(name, selectedValue as string)}
                      options={options}
                      {...rest}
                    />
                  )}
                </div>
              ))}
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
