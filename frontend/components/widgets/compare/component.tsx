import React, { FC, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import cx from 'classnames';

import Loading from 'components/loading';
import Button from 'components/button';
import Icon from 'components/icon';
import ArrowIcon from 'svgs/arrow-right.svg?sprite';

import type { CompareProps } from './types';
import type { WidgetProps } from 'components/widgets/types';
import { COLORS } from 'constants/charts';

const Compare: FC<CompareProps> = ({
  data,
  previousYearData,
  currentYear,
  dataDifference,
  chartType,
  chartConfig,
}: CompareProps) => {
  const [showCompare, setShowCompare] = useState(false);

  const LoadingWidget = () => (
    <div style={{ height: 400 }} className="flex items-center justify-center">
      <Loading iconClassName="w-10 h-10" visible />
    </div>
  );

  const ChartWidget = useMemo(
    () =>
      dynamic<WidgetProps>(() => import(`components/widgets/charts/${chartType}`), {
        loading: LoadingWidget,
      }),
    [chartType, chartConfig, data],
  );
  const theme = showCompare ? 'gray' : 'primary-alt';

  return (
    <div className="w-full flex">
      <div className="w-1/2">
        <ChartWidget data={showCompare ? previousYearData : data} {...chartConfig} />
      </div>
      <div className="w-1/2 p-20 flex justify-center items-center relative">
        <div className="w-auto relative flex justify-center items-center ">
          {(previousYearData || []).length > 0 ? (
            <>
              <Button
                theme={theme}
                className="transition duration-500 ease-in-out z-20"
                onClick={() => setShowCompare(!showCompare)}
              >
                Compare with previous year
              </Button>
              <div
                className={cx(
                  'text-blue9 text-lg font-bold absolute transition duration-500 ease-in-out transform z-0 flex gap-2 items-center',
                  { '-translate-y-16 opacity-1': showCompare, 'opacity-1': !showCompare },
                )}
              >
                <span>{currentYear}</span>
                <Icon className="w-3 h-3 text-blue9" icon={ArrowIcon} />
                <span>{currentYear - 1}</span>
              </div>
              <div
                className={cx(
                  'absolute transition duration-500 ease-in-out transform flex flex-row justify-between w-full',
                  { 'translate-y-20 opacity-1': showCompare, 'opacity-0': !showCompare },
                )}
              >
                {dataDifference.map((value, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 text-lg text-white font-bold"
                    style={{ backgroundColor: COLORS[index] }}
                  >
                    {value}%
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>No data for previous year</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Compare;
