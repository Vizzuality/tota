import React, { FC, useState } from 'react';
import cx from 'classnames';
import uniq from 'lodash/uniq';

import Button from 'components/button';
import Icon from 'components/icon';
import ArrowIcon from 'svgs/arrow-right.svg?sprite';

import type { CompareProps } from './types';

import BarChart from 'components/widgets/charts/bar';
import { COLORS } from 'constants/charts';
import { mergeForChart } from 'utils/charts';

const Compare: FC<CompareProps> = ({
  data,
  changeMap,
  currentYear,
  unit,
  colors,
  mergeBy,
  labelKey,
  valueKey,
}: CompareProps) => {
  const [showCompare, setShowCompare] = useState(false);
  const theme = showCompare ? 'dark-gray-alt' : 'dark-gray';
  const year = showCompare ? currentYear - 1 : currentYear;
  const changeKeys = Object.keys(changeMap);
  const currentYearData = data.filter((x) => !changeKeys.includes(x[mergeBy]));
  const changeData = data.filter((x) => changeKeys.includes(x[mergeBy]));
  const previousYearData = currentYearData
    .map((d) => {
      const percentage = changeData.find(
        (x) => x[labelKey] === d[labelKey] && changeMap[x[mergeBy]] === d[mergeBy],
      )?.value;

      if (!percentage) return null;

      return {
        ...d,
        value: Number((d.value / (1 + percentage / 100)).toFixed(2)),
      };
    })
    .filter((x) => x);
  const useData = showCompare ? previousYearData : currentYearData;

  const allDataValues = [...currentYearData, ...previousYearData].map((x) => x.value).filter((x) => !isNaN(x));
  const minValue = Math.min(...allDataValues);
  const maxValue = Math.max(...allDataValues);

  const chartData = mergeForChart({
    data: useData,
    mergeBy,
    labelKey,
    valueKey,
  });
  const labels = uniq(data.map((x) => x[labelKey]));
  const bars = labels.map((x) => ({ dataKey: x }));
  const colorsByLabelKey = colors || labels.reduce((acc, l, i) => ({ ...acc, [l]: COLORS[i] }), {});
  bars.forEach((b) => {
    b['color'] = colorsByLabelKey[b.dataKey];
  });
  const chartProps = {
    bars,
    yAxis: {
      domain: [Math.min(0, minValue), Math.round(maxValue * 1.1)],
      tickFormatter: (val) => `${val}${unit ?? ''}`,
    },
    xAxis: {
      dataKey: mergeBy,
      tickFormatter: (text: any) => `${text} ${year}`,
    },
    tooltip: {
      cursor: false,
      valueFormatter: (val) => `${val}${unit ?? ''}`,
    },
  };
  const changeDataSeries = uniq(changeData.map((x) => x[mergeBy]));
  const changeDataValueColor = (serie: string) =>
    labels.map((label) => {
      return {
        value: changeData.find((x) => x[mergeBy] === serie && x[labelKey] === label)?.value,
        color: colorsByLabelKey[label],
      };
    });

  return (
    <div className="w-full flex flex-col lg:flex-row">
      <div className="lg:w-1/2">
        <BarChart data={chartData} {...chartProps} />
      </div>
      <div className="lg:w-1/2 px-6 py-32 lg:p-6 flex justify-center items-center relative">
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
                  'text-blue-800 text-lg font-bold absolute transition duration-500 ease-in-out transform z-0 flex gap-2 items-center',
                  { '-translate-y-16 opacity-1': showCompare, 'opacity-1': !showCompare },
                )}
              >
                <span>{currentYear - 1}</span>
                <Icon className="w-3 h-3 text-blue-800" icon={ArrowIcon} />
                <span>{currentYear}</span>
              </div>
              <div
                className={cx('absolute transition duration-300 ease-in-out transform', {
                  'opacity-1': showCompare,
                  'opacity-0': !showCompare,
                  'w-full': labels.length > 1,
                })}
                style={{
                  transform: showCompare && 'translate(0, 100px)',
                }}
              >
                {changeDataSeries.map((serie) => (
                  <div key={serie} className="flex flex-row justify-between gap-2 mt-2">
                    <div className="font-bold mt-4">{changeMap[serie]}</div>
                    {changeDataValueColor(serie).map(({ value, color }, index) => (
                      <div
                        key={index}
                        className="px-4 py-3 text-lg text-white text-center font-bold"
                        style={{ backgroundColor: color, minWidth: 90 }}
                      >
                        {value > 0 ? `+${value}` : value}%
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="font-bold">No data for previous year</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Compare;
