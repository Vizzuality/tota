import { useState, useRef, useCallback } from 'react';

import { useResize } from 'hooks/misc';

export function useChartWidth() {
  const [chartWidth, setChartWidth] = useState(null);
  const containerRef = useRef(null);
  const handleResize = useCallback(() => {
    if (containerRef.current) {
      setChartWidth(containerRef.current?.current?.clientWidth); // ?? not sure why current twice TODO: figure this out
    }
  }, [containerRef]);
  useResize(handleResize);

  return {
    chartWidth,
    containerRef,
  };
}
