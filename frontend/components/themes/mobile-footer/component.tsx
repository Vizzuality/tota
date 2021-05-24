import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Drawer from 'components/drawer';
import Button from 'components/button';

import themes from 'constants/themes';
import Link from 'next/link';

const ThemeMobileFooter: React.FC<void> = (): JSX.Element => {
  const [isOpen, setOpen] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  const theme = themes.find((t) => t.slug === slug);

  return (
    <div className="lg:hidden">
      <div className="fixed z-20 h-20 w-full bg-gray-400 text-white bottom-0 left-0 flex items-center justify-center">
        <Button onClick={() => setOpen(!isOpen)}>{theme.name}</Button>
      </div>
      <Drawer placement="bottom" isOpen={isOpen}>
        <div className="mb-20 max-h-80 overflow-auto bg-gray-400 flex flex-col text-white">
          {themes.map((theme) => (
            <Link key={theme.slug} href={`/themes/${theme.slug}`}>
              <a className="p-5" onClick={() => setOpen(false)}>
                {theme.name}
              </a>
            </Link>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default ThemeMobileFooter;
