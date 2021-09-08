import React, { FC, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import cx from 'classnames';
import mapValues from 'lodash/mapValues';

import Loading from 'components/loading';
import Button from 'components/button';
import Icon from 'components/icon';
import ArrowIcon from 'svgs/arrow-right.svg?sprite';

import type { CompareProps } from './types';
import type { WidgetProps } from 'components/widgets/types';
import { COLORS } from 'constants/charts';

function changeValues(data, changeToPreviousYear) {
  return data.map((x: any) =>
    Object.entries(x).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: isNaN(value as any) ? value : ((value as any) / (1 + changeToPreviousYear[key] / 100)).toFixed(2),
      }),
      {},
    ),
  );
}

function appendYear(data, year) {
  return data.map((x: any) =>
    Object.entries(x).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: isNaN(value as any) ? `${value} ${year}` : value,
      }),
      {},
    ),
  );
}

const Compare: FC<CompareProps> = ({
  data,
  changeToPreviousYear,
  currentYear,
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
  const theme = showCompare ? 'gray' : 'primary';
  let chartData = appendYear(data, showCompare ? currentYear - 1 : currentYear);
  if (showCompare) {
    chartData = changeValues(chartData, changeToPreviousYear);
  }

  return (
    <div className="w-full flex">
      <div className="w-1/2">
        <ChartWidget data={chartData} {...chartConfig} />
      </div>
      <div className="w-1/2 p-20 flex justify-center items-center relative">
        <div className="w-auto relative flex justify-center items-center ">
          {changeToPreviousYear !== null ? (
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
                <span>{currentYear - 1}</span>
                <Icon className="w-3 h-3 text-blue9" icon={ArrowIcon} />
                <span>{currentYear}</span>
              </div>
              <div
                className={cx(
                  'absolute transition duration-300 ease-in-out transform flex flex-row justify-between w-full',
                  { 'translate-y-20 opacity-1': showCompare, 'opacity-0': !showCompare },
                )}
              >
                {Object.entries(changeToPreviousYear).map(([_key, value], index) => (
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
