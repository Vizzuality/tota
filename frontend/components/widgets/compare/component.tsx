import React, { FC } from 'react';
import dynamic from 'next/dynamic';

import Loading from 'components/loading';

import type { CompareProps } from './types';
import type { WidgetProps } from 'components/widgets/types';

const Compare: FC<CompareProps> = ({ data, chartType, chartConfig }: CompareProps) => {
  const LoadingWidget = () => (
    <div style={{ height: 400 }} className="flex items-center justify-center">
      <Loading iconClassName="w-10 h-10" visible />
    </div>
  );

  const ChartWidget = dynamic<WidgetProps>(() => import(`components/widgets/charts/${chartType}`), {
    loading: LoadingWidget,
  });

  return (
    <div className="w-full flex">
      <div className="w-1/2">
        <ChartWidget data={data} {...chartConfig} />
      </div>
      <div className="w-1/2 p-20">Compare function</div>
    </div>
  );
};

export default Compare;
