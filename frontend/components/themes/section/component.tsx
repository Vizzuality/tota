import { FC } from 'react';

interface Section {
  name: string;
  description: string;
}

export interface ThemeSectionProps {
  section: Section;
}

const ThemeSection: FC<ThemeSectionProps> = ({ section }: ThemeSectionProps) => (
  <div className="mb-10">
    <h2 className="text-4xl">{section.name}</h2>

    <p className="mt-5">{section.description}</p>
  </div>
);

export default ThemeSection;
