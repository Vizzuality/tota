import { FC, ReactNode } from 'react';
/* import cx from 'classnames'; */

export interface LegendItemProps {
  id: string;
  name: string;
  description?: string;
  children?: ReactNode;
}

export const LegendItem: FC<LegendItemProps> = ({ id, description, name, children }: LegendItemProps) => (
  <div key={id} className="bg-white">
    <div className="bg-color2 text-blue9 font-heading py-2.5 px-5">{name}</div>
    {description && <div className="mt-2.5 py-2.5 px-5">{description}</div>}
    {children && <div className="mt-2.5 py-2.5 px-5">{children}</div>}
  </div>
);

export default LegendItem;
