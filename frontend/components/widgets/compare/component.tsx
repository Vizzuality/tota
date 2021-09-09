import React, { FC, useState } from 'react';
import cx from 'classnames';
import uniq from 'lodash/uniq';

import Button from 'components/button';
import Icon from 'components/icon';
import ArrowIcon from 'svgs/arrow-right.svg?sprite';

import type { CompareProps } from './types';
import type { IndicatorValue } from 'types';

import BarChart from 'components/widgets/charts/bar';
import { COLORS } from 'constants/charts';
import { mergeForChart } from 'utils/charts';

function changeValues(data: IndicatorValue[], changeData: IndicatorValue[], key: string): IndicatorValue[] {
  return data.map((d) => {
    const percentage = changeData.find((x) => x[key] === d[key])?.value;

    return {
      ...d,
      value: Number((d.value / (1 + percentage / 100)).toFixed(2)),
    };
  });
}

const Compare: FC<CompareProps> = ({ data, changeData, currentYear, mergeBy, labelKey, valueKey }: CompareProps) => {
  const [showCompare, setShowCompare] = useState(false);
  const theme = showCompare ? 'dark-gray-alt' : 'dark-gray';
  const year = showCompare ? currentYear - 1 : currentYear;
  const currentYearData = data;
  const previousYearData = changeValues(currentYearData, changeData, labelKey);
  const useData = showCompare ? previousYearData : currentYearData;

  const allDataValues = [...currentYearData, ...previousYearData].map((x) => x.value);
  const minValue = Math.min(...allDataValues);
  const maxValue = Math.max(...allDataValues);

  const chartData = mergeForChart({
    data: useData,
    mergeBy,
    labelKey,
    valueKey,
  });
  const labels = uniq(data.map((x) => x[labelKey]));
  const chartConfig = {
    bars: labels.map((x) => ({ dataKey: x })),
    yAxis: {
      domain: [Math.min(0, minValue), Math.round(maxValue * 1.1)],
    },
    xAxis: {
      dataKey: mergeBy,
      tickFormatter: (text: any) => `${text} ${year}`,
    },
  };
  const changeDataValues = labels.map((b) => changeData.find((x) => x[labelKey] === b)?.value);

  return (
    <div className="w-full flex">
      <div className="w-1/2">
        <BarChart data={chartData} {...chartConfig} />
      </div>
      <div className="w-1/2 p-20 flex justify-center items-center relative">
        <div className="w-auto relative flex justify-center items-center ">
          {(changeData || []).length > 0 !== null ? (
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
                {changeDataValues.map((value, index) => (
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
