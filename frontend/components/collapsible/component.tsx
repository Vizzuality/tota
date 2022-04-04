import React, { FC, useState } from 'react';
import cx from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';

import type { CollapsibleProps } from './types';

import ARROW_DOWN_SVG from 'svgs/ui/arrow-down.svg';

import Icon from 'components/icon';

const Collapsible: FC<CollapsibleProps> = ({ title, children }: CollapsibleProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <div className="cursor-pointer flex items-center" onClick={() => setOpen(!open)}>
        <Icon
          icon={ARROW_DOWN_SVG}
          className={cx({
            'w-3 h-3 transition-transform transform': true,
            '-rotate-90': !open,
          })}
        />
        <span className="ml-2.5 font-bold text-lg text-blue-800">{title}</span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            key="loading"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { height: 'auto' },
              collapsed: { height: 0 },
            }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden py-3"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Collapsible;
