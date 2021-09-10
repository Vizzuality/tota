import React, { useState, useMemo, FC } from 'react';
import cx from 'classnames';
import dynamic from 'next/dynamic';
import type { ThemeSectionType } from 'types';
import Loading from 'components/loading';
import Controls from './controls';

import type { WidgetProps } from 'components/widgets/types';

import { useRouterSelectedRegion } from 'hooks/regions';
import { useIndicatorValues } from 'hooks/indicators';

export interface ThemeSectionProps {
  section: ThemeSectionType;
  index: number;
}

const ThemeSection: FC<ThemeSectionProps> = ({ section, index }: ThemeSectionProps) => {
  const [state, setState] = useState(section.initialState || {});
  const selectedRegion = useRouterSelectedRegion();
  const LoadingWidget = () => (
    <div style={{ height: 400 }} className="flex items-center justify-center">
      <Loading iconClassName="w-10 h-10" visible />
    </div>
  );
  const handleControlChange = (name: string, selectedValue: string) => setState({ ...state, [name]: selectedValue });
  const wholeState = useMemo(
    () => ({
      ...state,
      selectedRegion,
    }),
    [state, selectedRegion],
  );
  const { data: rawData, isFetched, isFetching, isLoading } = useIndicatorValues(section.fetchParams(wholeState));
  const {
    data,
    widgetTypeOverride,
    widgetWrapper: WidgetWrapper,
    type: widgetType,
    controls,
    ...widgetConfig
  } = useMemo(() => section.fetchWidgetProps(rawData, wholeState), [rawData, wholeState]);
  const Widget = dynamic<WidgetProps>(() => import(`components/widgets/${widgetType}`), {
    loading: LoadingWidget,
  });

  return (
    <div className="p-5 bg-white flex flex-col lg:flex-row">
      <div className="lg:w-2/6 lg:pr-5 lg:border-r-2">
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

        <p className="mt-4 lg:mt-10 leading-8">{section.description}</p>
      </div>

      <div className="mt-4 lg:mt-0 lg:w-4/6 lg:pl-5 flex flex-col relative">
        <Controls
          className={cx('mb-3', { 'w-full': widgetType !== 'map', 'absolute z-10 right-0': widgetType === 'map' })}
          controls={controls}
          state={state}
          onControlChange={handleControlChange}
        />
        <div className="flex justify-center items-center" style={{ minHeight: 300 }}>
          {(isLoading || isFetching) && <LoadingWidget />}
          {isFetched &&
            data &&
            ((Array.isArray(data) && data.length > 0) || !Array.isArray(data)) &&
            (WidgetWrapper ? (
              <WidgetWrapper>
                <Widget data={data} {...widgetConfig} />
              </WidgetWrapper>
            ) : (
              <Widget data={data} {...widgetConfig} />
            ))}
          {isFetched && data && data.length === 0 && <span>No data available</span>}
        </div>
      </div>
    </div>
  );
};

export default ThemeSection;
