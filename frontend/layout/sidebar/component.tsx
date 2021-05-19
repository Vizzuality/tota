import { FC } from 'react';

export interface SidebarLayoutProps {
  sidebar: JSX.Element;
  content: JSX.Element;
}

const SidebarLayout: FC<StickySidebarLayoutProps> = ({ sidebar, content }: StickySidebarLayoutProps) => (
  <div className="flex">
    <div className="h-sidebar sticky top-40 bottom-20 pr-20 w-72">{sidebar}</div>
    <div className="pl-20 border-l-2">{content}</div>
  </div>
);

export default SidebarLayout;
