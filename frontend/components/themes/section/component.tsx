import { FC } from 'react';

interface Section {
  name: string;
  description: string;
}

export interface ThemeSectionProps {
  section: Section;
}

const ThemeSection: FC<ThemeSectionProps> = ({ section }: ThemeSectionProps) => (
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
    <div className="w-3/5">Here will be a chart</div>
  </div>
);

export default ThemeSection;
