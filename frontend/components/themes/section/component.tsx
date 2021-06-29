import { FC } from 'react';
import dynamic from 'next/dynamic';

interface Section {
  name: string;
  description: string;
  data: any;
  widget: any;
}

interface ChartProps {
  data: any;
  config: any;
}

export interface ThemeSectionProps {
  section: Section;
}

const ThemeSection: FC<ThemeSectionProps> = ({ section }: ThemeSectionProps) => {
  const Loading = () => <div>Loading...</div>;
  const chartType = section.widget?.type || 'pie';
  const DynamicChart = dynamic<ChartProps>(() => import(`components/charts/${chartType}`), { loading: Loading });

  const chartData = section.widget?.data(section.data);

  return (
    <div className="mb-10 p-5 bg-white flex">
      <div className="w-2/5 pr-10 border-r-2">
        <div className="relative">
          <div
            className="absolute rounded-full bg-gray-300 text-gray-700 text-xl h-50 w-50 flex items-center justify-center"
            style={{ width: 50, height: 50 }}
          >
            1
          </div>
          <div className="" style={{ marginLeft: 70 }}>
            <h2 className="text-3xl">{section.name}</h2>
            <div>sub title</div>
          </div>
        </div>

        <p className="mt-10 leading-8">{section.description}</p>
      </div>
      <div className="w-3/5">{chartData && <DynamicChart data={chartData} config={section.widget.config} />}</div>
    </div>
  );
};

export default ThemeSection;
