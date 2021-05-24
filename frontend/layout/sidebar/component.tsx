import { FC } from 'react';

export interface SidebarLayoutProps {
  sidebar: JSX.Element;
  content: JSX.Element;
}

const SidebarLayout: FC<SidebarLayoutProps> = ({ sidebar, content }: SidebarLayoutProps) => (
  <div className="flex mb-20">
    <div className="hidden lg:block h-sidebar sticky top-40 bottom-20 pr-20 w-72">{sidebar}</div>
    <div className="lg:pl-20 lg:border-l-2">{content}</div>
  </div>
);

export default SidebarLayout;
