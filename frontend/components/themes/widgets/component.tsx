import React, { FC } from 'react';

import ThemeWidget from 'components/themes/widget';
import ErrorBoundary from 'components/error-boundary';

import { useRouterSelectedTheme } from 'hooks/themes';
import { useRouterSelectedRegion } from 'hooks/regions';
import { useWidgets } from 'hooks/widgets';

interface WidgetsProps {}

const Widgets: FC<WidgetsProps> = () => {
  const theme = useRouterSelectedTheme();
  const selectedRegion = useRouterSelectedRegion();
  const { data: widgets, isFetched, isSuccess } = useWidgets(theme.slug, selectedRegion);
  console.log({ widgets });
  return (
    <div className="flex flex-col gap-10 mb-10">
      {isFetched &&
        isSuccess &&
        widgets.map((widget, index) => (
          <ErrorBoundary
            className="py-20 px-10 bg-white flex font-bold align-center justify-center"
            key={`${theme.slug} - ${widget.title}`}
          >
            <ThemeWidget index={index + 1} widget={widget} />
          </ErrorBoundary>
        ))}
    </div>
  );
};

export default Widgets;
