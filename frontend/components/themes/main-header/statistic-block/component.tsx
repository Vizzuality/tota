export interface StatisticBlock {
  title: string;
  value: number;
}

const StatisticBlock: React.FC<StatisticBlock> = ({ title, value }: StatisticBlock) => {
  return (
    <div className="text-white py-16">
      <div className="font-bold text-lg uppercase">{title}</div>
      <div className="mt-6 font-bold text-2xl">{value}</div>
    </div>
  );
};

export default StatisticBlock;
