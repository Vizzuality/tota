import React from 'react';

const ThemeMobileFooter: React.FC<void> = (): JSX.Element => {
  return (
    <dev className="h-20 w-full bg-gray-400 text-white fixed bottom-0 left-0 flex items-center justify-center lg:hidden">
      <p>Mobile footer content</p>
    </dev>
  );
};

export default ThemeMobileFooter;
