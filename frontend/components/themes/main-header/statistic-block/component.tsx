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
    <div className="text-white py-16">
      {loading && <Loading iconClassName="w-10 h-10" visible />}
      {!loading && (
        <>
          <div className="font-bold text-lg uppercase">{title}</div>
          <div className="text-sm">{subtitle}</div>
          <div className="mt-4 font-bold text-2xl">
            {value && value}
            {!value && 'No data'}
          </div>
        </>
      )}
    </div>
  );
};

export default StatisticBlock;
