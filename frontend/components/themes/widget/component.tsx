import React, { useState, useMemo, FC } from 'react';
import cx from 'classnames';
import dynamic from 'next/dynamic';
import type { Widget } from 'types';
import Loading from 'components/loading';
import Controls from './controls';

import type { WidgetProps } from 'components/widgets/types';

import { useRouterSelectedRegion } from 'hooks/regions';
import { useIndicatorValues } from 'hooks/indicators';
import LinkButton from 'components/button/component';

export interface ThemeWidgetProps {
  widget: Widget;
  index: number;
}

const ThemeWidget: FC<ThemeWidgetProps> = ({ widget, index }: ThemeWidgetProps) => {
  const [state, setState] = useState(widget.initialState || {});
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
  const {
    data: indicatorValues,
    isFetched,
    isFetching,
    isLoading,
  } = useIndicatorValues(widget.fetchParams(wholeState));
  const {
    data,
    widgetTypeOverride,
    widgetWrapper: WidgetWrapper,
    type: widgetType,
    controls,
    viewOnMap,
    ...widgetConfig
  } = useMemo(
    () => widget.fetchWidgetProps(indicatorValues, wholeState),
    [widget.fetchWidgetProps, indicatorValues, wholeState],
  );
  const WidgetComponent = dynamic<WidgetProps>(() => import(`components/widgets/${widgetType}`), {
    loading: LoadingWidget,
  });

  return (
    <div className="p-5 bg-white flex flex-col lg:flex-row">
      <div className="lg:w-2/6 lg:pr-5 lg:border-r-2 flex flex-col">
        <div className="relative">
          <div
            className="absolute rounded-full bg-yellow-50 text-blue-800 text-2xl h-50 w-50 flex items-center justify-center"
            style={{ width: 50, height: 50 }}
          >
            {index}
          </div>
          <div className="flex flex-col justify-center" style={{ marginLeft: 70, minHeight: 50 }}>
            <h2 className="text-lg font-bold">{widget.title}</h2>
            <div>{widget.sub_title}</div>
          </div>
        </div>
        <div className="widget-details flex-1">
          <p className="mt-4 lg:mt-10 leading-8" dangerouslySetInnerHTML={{ __html: widget.description }} />
          {(widget.note || widget.sources) && (
            <div className="mt-2 lg:mt-6">
              {widget.note && (
                <p className="leading-6 text-sm">
                  <strong>Note: </strong>
                  <span dangerouslySetInnerHTML={{ __html: widget.note }} />
                </p>
              )}
              {widget.sources && (
                <p className={cx('leading-6 text-sm', { 'mt-2': !!widget.note })}>
                  <strong>Source: </strong>
                  {widget.sources.map((source, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && ', '}
                      {source.link ? (
                        <a href={source.link} target="_blank" rel="noopener noreferrer">
                          {source.text}
                        </a>
                      ) : (
                        source.text
                      )}
                      {source.note && ` (${source.note})`}
                    </React.Fragment>
                  ))}
                </p>
              )}
            </div>
          )}
        </div>

        {viewOnMap && (
          <div className="mt-4 lg:mt-10">
            <LinkButton theme="primary" className="px-10" href={viewOnMap.link}>
              {viewOnMap.title}
            </LinkButton>
          </div>
        )}
      </div>

      <div className="mt-4 lg:mt-0 lg:w-4/6 lg:pl-5 flex flex-col relative">
        {isFetched && (
          <Controls
            className={cx('mb-3', { 'w-full': widgetType !== 'map', 'absolute z-10 right-0': widgetType === 'map' })}
            controls={controls}
            state={state}
            onControlChange={handleControlChange}
          />
        )}
        <div className="flex flex-1 justify-center items-center" style={{ minHeight: 300 }}>
          {(isLoading || isFetching) && <LoadingWidget />}
          {isFetched && data !== undefined && data !== null && (
            <>
              {((Array.isArray(data) && data.length > 0) || (!Array.isArray(data) && data !== '')) &&
                (WidgetWrapper ? (
                  <WidgetWrapper>
                    <WidgetComponent data={data} {...widgetConfig} />
                  </WidgetWrapper>
                ) : (
                  <WidgetComponent data={data} {...widgetConfig} />
                ))}
              {data.length === 0 && <span>No data available</span>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThemeWidget;
