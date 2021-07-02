import { FC } from 'react';
import dynamic from 'next/dynamic';

interface Section {
  title: string;
  subTitle?: string;
  description: string;
  data: any;
  widget: any;
}

interface WidgetProps {
  data: any;
  config: any;
}

export interface ThemeSectionProps {
  section: Section;
  index: number;
}

const ThemeSection: FC<ThemeSectionProps> = ({ section, index }: ThemeSectionProps) => {
  const Loading = () => <div>Loading...</div>;
  const widgetType = section.widget?.type || 'charts/pie';
  const Widget = dynamic<WidgetProps>(() => import(`components/widgets/${widgetType}`), {
    loading: Loading,
  });

  const widgetData = typeof section.widget?.data === 'function' ? section.widget.data(section.data) : section.data;

  return (
    <div className="mb-10 p-5 bg-white flex">
      <div className="w-2/5 pr-10 border-r-2">
        <div className="relative">
          <div
            className="absolute rounded-full bg-gray-300 text-gray-700 text-2xl h-50 w-50 flex items-center justify-center"
            style={{ width: 50, height: 50 }}
          >
            {index}
          </div>
          <div className="" style={{ marginLeft: 70 }}>
            <h2 className="text-3xl">{section.title}</h2>
            <div>{section.subTitle}</div>
          </div>
        </div>

        <p className="mt-10 leading-8">{section.description}</p>
      </div>
      <div className="w-3/5">{widgetData && <Widget data={widgetData} config={section.widget.config} />}</div>
    </div>
  );
};

export default ThemeSection;
