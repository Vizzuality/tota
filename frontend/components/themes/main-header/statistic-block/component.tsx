import Loading from 'components/loading';
import React from 'react';

export interface StatisticBlock {
  loading?: boolean;
  title: string;
  subtitle?: string;
  value?: string;
}

const StatisticBlock: React.FC<StatisticBlock> = ({ loading = false, title, subtitle, value }: StatisticBlock) => {
  return (
    <div className="text-white p-4 md:p-8 lg:p-16">
      <div className="font-bold text-base md:text-lg uppercase">{title}</div>
      <div className="text-xs md:text-sm">{subtitle}</div>
      <div className="mt-4 font-bold text-xl md:text-2xl">
        {loading && <Loading iconClassName="w-10 h-10" visible />}
        {!loading && (
          <>
            {value && value}
            {!value && 'No data'}
          </>
        )}
      </div>
    </div>
  );
};

export default StatisticBlock;
