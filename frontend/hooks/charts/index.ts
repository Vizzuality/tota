import { useState, useRef, useCallback } from 'react';

import { useResize } from 'hooks/misc';

export function useChartWidth() {
  const [chartWidth, setChartWidth] = useState(null);
  const containerRef = useRef(null);
  const handleResize = useCallback(() => {
    if (containerRef.current) {
      setChartWidth(containerRef.current?.containerRef?.current?.clientWidth); // ?? not sure why containerRef twice
    }
  }, [containerRef]);
  useResize(handleResize);

  return {
    chartWidth,
    containerRef,
  };
}
