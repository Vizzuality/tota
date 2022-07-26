import { FC, ReactNode } from 'react';
/* import cx from 'classnames'; */
import Icon from 'components/icon';
import REMOVE_SVG from 'svgs/map/remove.svg';
import VISIBLE_SVG from 'svgs/map/visible.svg';
import INVISIBLE_SVG from 'svgs/map/invisible.svg';

interface Source {
  text: string;
  link?: string;
}

export interface LegendItemProps {
  id: string;
  name: string;
  source?: Source;
  removable?: boolean;
  visibility?: boolean;
  opacity?: number;
  description?: string;
  children?: ReactNode;
  onVisibilityChange?: (id, visible: boolean) => void;
  onRemove?: (id) => void;
}

export const LegendItem: FC<LegendItemProps> = ({
  id,
  description,
  name,
  source,
  removable = false,
  onRemove,
  visibility,
  onVisibilityChange,
  children,
}: LegendItemProps) => {
  const handleVisibleClick = () => {
    onVisibilityChange && onVisibilityChange(id, !visibility);
  };
  const handleRemoveClick = () => {
    onRemove && onRemove(id);
  };

  return (
    <div key={id} className="bg-white">
      <div className="flex justify-between items-center bg-yellow-50 text-blue-800 font-heading py-2.5 px-5">
        {name && <span className="mr-10">{name}</span>}
        <div className="flex gap-3">
          <button type="button" onClick={handleVisibleClick}>
            <Icon icon={visibility ? VISIBLE_SVG : INVISIBLE_SVG} className="w-4 h-4" />
          </button>
          {removable && (
            <>
              <div className="relative w-0 ">
                <div className="absolute -top-1.5 -bottom-1.5 border-r-2 border-gray-400"></div>
              </div>
              <button type="button" onClick={handleRemoveClick}>
                <Icon icon={REMOVE_SVG} className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
      {description && (
        <div className="py-2 px-5 text-sm text-blue-800 free-text" dangerouslySetInnerHTML={{ __html: description }} />
      )}
      {children && <div className="py-4 px-5">{children}</div>}
      {source && (
        <div className="py-2 px-5 text-right text-blue-800 text-xs free-text">
          Source:&nbsp;
          {source.link ? (
            <a href={source.link} target="_blank" rel="noopener noreferrer">
              {source.text}
            </a>
          ) : (
            source.text
          )}
        </div>
      )}
    </div>
  );
};

export default LegendItem;
