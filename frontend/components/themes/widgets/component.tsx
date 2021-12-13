import React, { FC } from 'react';

import ThemeWidget from 'components/themes/widget';

import { useRouterSelectedTheme } from 'hooks/themes';
import { useRouterSelectedRegion } from 'hooks/regions';
import { useWidgets } from 'hooks/widgets';

interface WidgetsProps {}

const Widgets: FC<WidgetsProps> = () => {
  const theme = useRouterSelectedTheme();
  const selectedRegion = useRouterSelectedRegion();
  const { data: widgets, isFetched } = useWidgets(theme.slug, selectedRegion);

  return (
    <div className="flex flex-col gap-10 mb-10">
      {isFetched &&
        widgets.map((widget, index) => (
          <ThemeWidget key={`${theme.slug} - ${widget.title}`} index={index + 1} widget={widget} />
        ))}
    </div>
  );
};

export default Widgets;
